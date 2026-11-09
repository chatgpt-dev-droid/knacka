// SalesRabbit-style map/list filter: My Leads, Others' Leads, Areas, User Locations
export const DEFAULT_FILTER = { my: true, others: true, areas: true, team: false, statuses: null };
export function applyFilter(leads, f, uid) {
  return leads.filter((l) => {
    const mine = l.owner === uid;
    if (mine && !f.my) return false;
    if (!mine && !f.others) return false;
    if (f.statuses && f.statuses.length && !f.statuses.includes(l.status || 'ny')) return false;
    return true;
  });
}
