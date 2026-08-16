// Booking-flow content and helpers shared by the /appointment steps.
import { packages } from './site';

// Step 1 order (matches the design handoff): cheapest first, À La Carte last.
const PACKAGE_ORDER = [
  'spiffy-detail',
  'interior-detail',
  'full-detail',
  'deluxe-detail',
  'a-la-carte',
];
export const bookingPackages = PACKAGE_ORDER.map((id) =>
  packages.find((p) => p.id === id)
).filter(Boolean);

export const DEFAULT_PACKAGE_ID = 'full-detail';

// Vehicle type never changes the price. Required, no default.
export const VEHICLES = ['Car', 'SUV', 'Truck', 'Van'];

export const STEP_TITLES = ['Package', 'Your vehicle', 'Details'];

/** Morning drop-off window — quoted in the booking flow and the confirmation email. */
export const DROP_OFF_WINDOW = '9:30–10:00 AM';
export const DROP_OFF_NOTE = `To ensure we can deliver the highest quality detail, we ask that you drop off your vehicle between ${DROP_OFF_WINDOW}.`;
export const OPT_IN_LABEL =
  'Send me occasional offers and detailing tips from Clean King.';

/** "$70–$110" style prices are a range, not a fixed total. */
export const isPriceRange = (price) => /[–-]/.test(String(price));

/**
 * The next `count` bookable days: weekdays only (the shop is closed Sat/Sun),
 * starting tomorrow so a same-day 9:30 AM drop-off is never offered.
 * Each entry carries the chip labels plus a Date/ISO for the submit payload.
 */
export function nextWeekdays(count = 20, from = new Date()) {
  const out = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1);
  while (out.length < count) {
    const wd = d.getDay();
    if (wd >= 1 && wd <= 5) {
      out.push({
        date: new Date(d),
        iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
        dow: d.toLocaleDateString('en-US', { weekday: 'short' }),
        day: String(d.getDate()),
        month: d.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

/** Long label sent to the shop, e.g. "Wed, Aug 19, 2026". */
export const formatDayLong = (day) =>
  day.date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
