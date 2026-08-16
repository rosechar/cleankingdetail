import { findPackage, site } from '@/data/site';
import { DROP_OFF_WINDOW } from '@/data/booking';

// GET /api/calendar?date=YYYY-MM-DD&pkg=<id>
// Serves a one-event .ics for the requested drop-off so the confirmation
// screen's "Add to calendar" works everywhere (a real URL, not a data: URI —
// iOS Safari hands those to Calendar, data: URIs it does not). Times are
// floating local time (no TZ), which is what a shop drop-off should be.

export const runtime = 'nodejs';

const ics = (s) =>
  String(s)
    .replace(/([,;\\])/g, '\\$1')
    .replace(/\n/g, '\\n');

export function GET(req) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date') || '';
  const pkg = findPackage(searchParams.get('pkg'));
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (!m || !pkg) return new Response('Bad request', { status: 400 });
  const ymd = `${m[1]}${m[2]}${m[3]}`;

  const summary = `Clean King drop-off — ${pkg.name}`;
  const description = [
    `${pkg.name} (${pkg.price}) at ${site.name}.`,
    `Please drop off between ${DROP_OFF_WINDOW} and remove personal belongings first.`,
    `Questions? Call ${site.phone}.`,
  ].join('\n');
  const location = `${site.name}, ${site.address1}, ${site.address2}`;
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d+/, '');

  const body = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Clean King Detailing//Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${ymd}-${pkg.id}@cleankingdetail.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${ymd}T093000`,
    `DTEND:${ymd}T100000`,
    `SUMMARY:${ics(summary)}`,
    `DESCRIPTION:${ics(description)}`,
    `LOCATION:${ics(location)}`,
    `GEO:${site.geo.latitude};${site.geo.longitude}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT12H',
    'ACTION:DISPLAY',
    `DESCRIPTION:${ics(summary)} tomorrow morning`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
    '',
  ].join('\r\n');

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="clean-king-${ymd}.ics"`,
      'Cache-Control': 'no-store',
    },
  });
}
