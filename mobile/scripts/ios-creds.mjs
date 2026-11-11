// Creates the iOS signing certificate and App Store provisioning profile through the App Store Connect API
// and writes credentials.json for EAS (credentialsSource: local). Runs in CI; needs ASC_KEY_P8, ASC_KEY_ID, ASC_ISSUER_ID.
import crypto from 'node:crypto';
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const { ASC_KEY_P8, ASC_KEY_ID, ASC_ISSUER_ID } = process.env;
const BUNDLE = 'nu.fiskaren.knacka', PROFILE = 'Knacka AppStore CI', PASS = crypto.randomBytes(12).toString('hex');
const b64 = (o) => Buffer.from(typeof o === 'string' ? o : JSON.stringify(o)).toString('base64url');
function token() {
  const now = Math.floor(Date.now() / 1000);
  const head = b64({ alg: 'ES256', kid: ASC_KEY_ID, typ: 'JWT' }), body = b64({ iss: ASC_ISSUER_ID, iat: now, exp: now + 900, aud: 'appstoreconnect-v1' });
  const sig = crypto.sign('sha256', Buffer.from(`${head}.${body}`), { key: ASC_KEY_P8, dsaEncoding: 'ieee-p1363' }).toString('base64url');
  return `${head}.${body}.${sig}`;
}
async function api(method, path, data) {
  const r = await fetch('https://api.appstoreconnect.apple.com/v1' + path, { method, headers: { Authorization: 'Bearer ' + token(), 'Content-Type': 'application/json' }, body: data ? JSON.stringify({ data }) : undefined });
  if (r.status === 204) return null;
  const j = await r.json();
  if (!r.ok) throw new Error(`${method} ${path} -> ${r.status} ${JSON.stringify(j.errors?.map((e) => e.detail || e.title))}`);
  return j;
}

// 1) bundle id (+ push capability, which the notifications module's entitlement needs)
let bid = (await api('GET', `/bundleIds?filter[identifier]=${BUNDLE}`)).data.find((b) => b.attributes.identifier === BUNDLE);
if (!bid) bid = (await api('POST', '/bundleIds', { type: 'bundleIds', attributes: { identifier: BUNDLE, name: 'Knacka', platform: 'IOS' } })).data;
console.log('bundle id ok');
await api('POST', '/bundleIdCapabilities', { type: 'bundleIdCapabilities', attributes: { capabilityType: 'PUSH_NOTIFICATIONS' }, relationships: { bundleId: { data: { type: 'bundleIds', id: bid.id } } } }).catch((e) => console.log('push capability:', String(e.message).slice(0, 120)));

// 2) fresh distribution certificate (older ones made by this script are removed; shipped builds are not affected)
for (const c of (await api('GET', '/certificates?filter[certificateType]=DISTRIBUTION,IOS_DISTRIBUTION&limit=50')).data) { await api('DELETE', `/certificates/${c.id}`); console.log('removed old certificate'); }
execSync('openssl genrsa -out dist.key 2048 2>/dev/null && openssl req -new -key dist.key -out dist.csr -subj "/CN=Knacka CI/O=Fiskaren/C=SE"');
const cert = (await api('POST', '/certificates', { type: 'certificates', attributes: { certificateType: 'DISTRIBUTION', csrContent: fs.readFileSync('dist.csr', 'utf8') } })).data;
fs.writeFileSync('dist.cer', Buffer.from(cert.attributes.certificateContent, 'base64'));
execSync(`openssl x509 -inform DER -in dist.cer -out dist.pem && openssl pkcs12 -export -legacy -inkey dist.key -in dist.pem -out dist.p12 -passout pass:${PASS}`);
console.log('certificate ok');

// 3) App Store provisioning profile
for (const p of (await api('GET', `/profiles?filter[name]=${encodeURIComponent(PROFILE)}`)).data) await api('DELETE', `/profiles/${p.id}`);
const prof = (await api('POST', '/profiles', { type: 'profiles', attributes: { name: PROFILE, profileType: 'IOS_APP_STORE' }, relationships: { bundleId: { data: { type: 'bundleIds', id: bid.id } }, certificates: { data: [{ type: 'certificates', id: cert.id }] } } })).data;
fs.writeFileSync('knacka.mobileprovision', Buffer.from(prof.attributes.profileContent, 'base64'));
fs.writeFileSync('credentials.json', JSON.stringify({ ios: { provisioningProfilePath: 'knacka.mobileprovision', distributionCertificate: { path: 'dist.p12', password: PASS } } }, null, 2));
console.log('profile ok – credentials.json written');
