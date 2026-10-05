// Which area of the car each package line item belongs to. Shared by the 3D
// car explorer (zones) and the services-page compare table (sections) so the
// two always agree. Matching is by keyword, first hit wins, so new line items
// in site.js land somewhere sensible without touching either component.

export const ZONES = ['paint', 'wheels', 'glass', 'cabin', 'engine', 'trunk'];

const ZONE_RULES = [
  ['trunk', /^vacuum trunk$|trunk channels/i],
  ['engine', /engine/i],
  ['glass', /glass|window/i],
  ['wheels', /tire|wheel/i],
  ['cabin', /interior|upholster|carpet|dash|door panel|instrument|vent|seat/i],
];

/** Car zone for a line item; anything unmatched is bodywork ("paint"). */
export const zoneOf = (label) =>
  (ZONE_RULES.find(([, re]) => re.test(label)) || ['paint'])[0];

/** Every line item a package delivers: its own plus the tier it includes. */
export const lineItemsOf = (pkg) => [
  ...(pkg.details || pkg.items || []),
  ...(pkg.includes || []),
];
