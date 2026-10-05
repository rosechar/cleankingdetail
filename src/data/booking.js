// Booking-flow content and helpers shared by the /appointment steps.

export const DEFAULT_PACKAGE_ID = 'full-detail';

// Vehicle type never changes the price. Required, no default.
export const VEHICLES = ['Car', 'SUV', 'Truck', 'Van'];

export const STEP_TITLES = ['Package', 'Vehicle', 'Details'];

/**
 * Morning drop-off window, 24-hour "HH:MM". The booking flow, confirmation
 * email, FAQs and the .ics calendar event all derive from these two values.
 */
export const DROP_OFF = { start: '09:30', end: '10:00' };

/** "09:30" → { time: "9:30", period: "AM" } */
function to12h(hhmm) {
  const [h, m] = hhmm.split(':').map(Number);
  return {
    time: `${h % 12 || 12}:${String(m).padStart(2, '0')}`,
    period: h < 12 ? 'AM' : 'PM',
  };
}
const dropStart = to12h(DROP_OFF.start);
const dropEnd = to12h(DROP_OFF.end);

/** e.g. "9:30 AM" */
export const DROP_OFF_START = `${dropStart.time} ${dropStart.period}`;
/** e.g. "9:30–10:00 AM" (or "11:30 AM–12:30 PM" across noon) */
export const DROP_OFF_WINDOW =
  dropStart.period === dropEnd.period
    ? `${dropStart.time}–${dropEnd.time} ${dropEnd.period}`
    : `${DROP_OFF_START}–${dropEnd.time} ${dropEnd.period}`;

/** Turnaround varies by package, but it's almost always same-day. */
export const PICKUP_NOTE =
  'Pickup time varies by vehicle and package. To give the best detail, we give every car the time it deserves.';

/** Marketing opt-in wording, shared by the booking and contact forms. */
export const OPT_IN_LABEL =
  'Send me occasional offers and detailing tips from Clean King.';

/** "$70–$110" style prices are a range, not a fixed total. */
export const isPriceRange = (price) => /[–-]/.test(String(price));

/**
 * Holidays the shop is closed. Fixed dates use `date: [month, day]`; floating
 * ones use `nth: [month, weekday, n]`, where weekday is 0 = Sun … 6 = Sat and
 * n = -1 means the last one in the month. Months are 1–12. A fixed holiday
 * that lands on a weekend isn't moved to a weekday — the shop is shut then
 * anyway.
 */
export const SHOP_HOLIDAYS = [
  { name: "New Year's Day", date: [1, 1] },
  { name: 'Memorial Day', nth: [5, 1, -1] },
  { name: 'Independence Day', date: [7, 4] },
  { name: 'Labor Day', nth: [9, 1, 1] },
  { name: 'Thanksgiving', nth: [11, 4, 4] },
  { name: 'Christmas Day', date: [12, 25] },
];

function isHoliday(d) {
  const month = d.getMonth() + 1;
  const day = d.getDate();
  return SHOP_HOLIDAYS.some(({ date, nth }) => {
    if (date) return date[0] === month && date[1] === day;
    const [m, weekday, n] = nth;
    if (m !== month || d.getDay() !== weekday) return false;
    if (n > 0) return Math.ceil(day / 7) === n;
    const daysInMonth = new Date(d.getFullYear(), month, 0).getDate();
    return day + 7 > daysInMonth;
  });
}

/**
 * The next `count` bookable days: weekdays only (the shop is closed Sat/Sun)
 * minus SHOP_HOLIDAYS, starting tomorrow so a same-day morning drop-off is
 * never offered. Each entry carries the chip labels plus a Date/ISO for the
 * submit payload.
 */
export function nextOpenDays(count = 20, from = new Date()) {
  const out = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1);
  while (out.length < count) {
    const wd = d.getDay();
    if (wd >= 1 && wd <= 5 && !isHoliday(d)) {
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
