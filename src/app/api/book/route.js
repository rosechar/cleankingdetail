import {
  escapeHtml,
  renderRows,
  renderOwnerAlert,
  renderCustomerEmail,
  sendOwnerEmail,
  sendCustomerEmail,
  getOwnerEmails,
  addToSegment,
} from '@/services/email';
import { jsonError, jsonOk, readFormBody } from '@/services/forms';
import { cleanString, isEmail, isPhone, LIMITS } from '@/lib/validation';
import { findPackage } from '@/data/site';
import { DROP_OFF_WINDOW, VEHICLES } from '@/data/booking';

export const runtime = 'nodejs';

export async function POST(req) {
  const { data, response } = await readFormBody(req);
  if (response) return response;

  // The client sends the package *name*; price and id are resolved here so a
  // tampered payload can't put an invented price in front of the shop.
  const pkg = findPackage(data.pkg);
  const vehicle = VEHICLES.includes(data.vehicle) ? data.vehicle : '';
  const date = cleanString(data.date, LIMITS.date);
  const name = cleanString(data.name, LIMITS.name);
  const phone = cleanString(data.phone, LIMITS.phone);
  const email = cleanString(data.email, LIMITS.email);
  const makeModel = cleanString(data.makeModel, LIMITS.makeModel);
  const notes = cleanString(data.notes, LIMITS.notes);
  const optIn = Boolean(data.optIn);

  if (!pkg || !vehicle || !date || !name || !phone) {
    return jsonError('Missing required fields.', 400);
  }
  if (!isPhone(phone)) return jsonError('Enter a valid phone number.', 400);
  if (email && !isEmail(email)) {
    return jsonError('Enter a valid email address or leave it blank.', 400);
  }

  const details = {
    Package: pkg.name,
    'Est. price': pkg.price,
    Vehicle: vehicle,
    Date: date,
    Name: name,
    Phone: phone,
    Email: email,
    'Make & model': makeModel,
    Notes: notes,
    'Promo opt-in': optIn ? 'Yes' : 'No',
  };

  // 1) Owner alert (authoritative — failure means the lead didn't land).
  const owner = await sendOwnerEmail({
    subject: `New booking — ${pkg.name} · ${name}`,
    html: renderOwnerAlert({ heading: 'New booking request', rows: details }),
    replyTo: email,
  });
  if (!owner.ok) return jsonError(owner.message, owner.status);

  // Opted-in contacts join the Resend segment for future promos.
  if (optIn && email) await addToSegment({ email, name, phone });

  // 2) Customer confirmation (best-effort; only if they gave an email).
  //    Requires a verified Resend domain to actually deliver.
  if (email) {
    const first = name.split(/\s+/)[0] || 'there';
    const body = `
      <h2 style="font:600 22px/1.2 system-ui,sans-serif;margin:0 0 10px;">Thanks, ${escapeHtml(first)} — we've got your request</h2>
      <p style="font-size:15px;line-height:1.55;margin:0 0 18px;">
        We've received your request for a <b>${escapeHtml(pkg.name)}</b> on <b>${escapeHtml(date)}</b>.
        We'll call <b>${escapeHtml(phone)}</b> shortly to confirm your spot.
      </p>
      <table style="border-collapse:collapse;width:100%;margin-bottom:18px;">${renderRows(
        {
          Package: pkg.name,
          'Est. price': pkg.price,
          Vehicle: vehicle,
          Date: date,
          'Make & model': makeModel,
          Notes: notes,
        }
      )}</table>
      <p style="font-size:14px;line-height:1.55;color:#4c4c54;margin:0 0 18px;">
        Heads up: so we can give your vehicle the time it deserves, we ask for
        drop-offs between <b>${DROP_OFF_WINDOW}</b> on your appointment day.
      </p>`;

    const customer = await sendCustomerEmail({
      to: email,
      subject: 'Your Clean King booking request',
      html: renderCustomerEmail({ body }),
      replyTo: getOwnerEmails()[0],
    });
    if (!customer.ok) {
      // Don't fail the request — the shop still got the lead.
      console.error('Customer confirmation not sent:', customer.message);
    }
  }

  return jsonOk();
}
