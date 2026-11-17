// Reads app.json and adds secrets that must not sit in the public repo.
// GOOGLE_MAPS_KEY comes from an EAS environment variable (set by the CI workflow from a GitHub secret).
module.exports = ({ config }) => ({
  ...config,
  android: {
    ...config.android,
    config: { ...(config.android && config.android.config), googleMaps: { apiKey: process.env.GOOGLE_MAPS_KEY || '' } },
  },
});
