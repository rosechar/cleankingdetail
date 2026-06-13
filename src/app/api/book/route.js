import {
  escapeHtml,
  renderRows,
  sendOwnerEmail,
  sendCustomerEmail,
  getOwnerEmails,
  addToAudience,
} from '@/services/email';
import { site } from '@/data/site';
import { isLikelySpam } from '@/services/spam';

export const runtime = 'nodejs';

const isEmail = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim());

export async function POST(req) {
  let data;
  try {
    data = await req.json();
  } catch {
    return Response.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Silently accept bot submissions without sending anything.
  if (isLikelySpam(data)) {
    return Response.json({ ok: true });
  }

  const { pkg, vehicle, date, name, phone } = data || {};
  if (!pkg || !vehicle || !date || !name || !phone) {
    return Response.json(
      { error: 'Missing required fields.' },
      { status: 400 }
    );
  }

  const details = {
    Package: data.pkg,
    'Est. price': data.price,
    Vehicle: data.vehicle,
    Date: data.date,
    Name: data.name,
    Phone: data.phone,
    Email: data.email,
    'Make & model': data.makeModel,
    Notes: data.notes,
    'Promo opt-in': data.optIn ? 'Yes' : 'No',
  };

  // 1) Owner alert (authoritative — failure means the lead didn't land).
  const ownerHtml = `
    <div style="max-width:560px;margin:0 auto;font-family:system-ui,sans-serif;">
      <h2 style="font:600 20px/1.2 system-ui,sans-serif;color:#16140f;margin:0 0 4px;">New booking request</h2>
      <p style="color:#6e6e72;font-size:13px;margin:0 0 18px;">via cleankingdetail.com</p>
      <table style="border-collapse:collapse;width:100%;">${renderRows(details)}</table>
    </div>`;

  const owner = await sendOwnerEmail({
    subject: `New booking — ${pkg} · ${name}`,
    html: ownerHtml,
    replyTo: data.email || undefined,
  });

  if (!owner.ok) {
    return Response.json({ error: owner.message }, { status: owner.status });
  }

  // Opted-in contacts join the Resend audience for future promos.
  if (data.optIn) {
    await addToAudience({ email: data.email, name: data.name });
  }

  // 2) Customer confirmation (best-effort; only if they gave a valid email).
  //    Requires a verified Resend domain to actually deliver to the customer.
  if (isEmail(data.email)) {
    const first = String(name).trim().split(' ')[0] || 'there';
    const customerHtml = `
      <div style="max-width:560px;margin:0 auto;font-family:system-ui,sans-serif;color:#16140f;">
        <h2 style="font:600 22px/1.2 system-ui,sans-serif;margin:0 0 10px;">Thanks, ${escapeHtml(first)} — we've got your request</h2>
        <p style="font-size:15px;line-height:1.55;margin:0 0 18px;">
          We've received your request for a <b>${escapeHtml(pkg)}</b> on <b>${escapeHtml(date)}</b>.
          No payment now — we'll call <b>${escapeHtml(phone)}</b> shortly to confirm your spot.
        </p>
        <table style="border-collapse:collapse;width:100%;margin-bottom:18px;">${renderRows(
          {
            Package: data.pkg,
            'Est. price': data.price,
            Vehicle: data.vehicle,
            Date: data.date,
            'Make & model': data.makeModel,
            Notes: data.notes,
          }
        )}</table>
        <p style="font-size:14px;line-height:1.55;color:#4c4c54;margin:0 0 18px;">
          Heads up: so we can give your vehicle the time it deserves, we ask for
          drop-offs between <b>9:30–10:00 AM</b> on your appointment day.
        </p>
        <p style="font-size:14px;line-height:1.55;margin:0 0 18px;">
          Questions? Call us at <b>${site.phone}</b> or just reply to this email.
        </p>
        <p style="color:#6e6e72;font-size:12.5px;line-height:1.5;border-top:1px solid #e6e4dd;padding-top:14px;margin:0;">
          Clean King Detailing · ${site.address1}, ${site.address2} · ${site.phone}
        </p>
      </div>`;

    const customer = await sendCustomerEmail({
      to: data.email,
      subject: 'Your Clean King booking request',
      html: customerHtml,
      replyTo: getOwnerEmails()[0] || undefined,
    });
    if (!customer.ok) {
      // Don't fail the request — the shop still got the lead.
      console.error('Customer confirmation not sent:', customer.message);
    }
  }

  return Response.json({ ok: true });
}
