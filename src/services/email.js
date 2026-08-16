import { Resend } from 'resend';
import { isEmail } from '@/lib/validation';
import { site, SITE_URL } from '@/data/site';

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Renders { Label: value } pairs into a simple HTML table for the emails.
// Empty values are skipped so optional fields never show as blank rows.
export function renderRows(rows) {
  return Object.entries(rows)
    .filter(([, v]) => v != null && String(v).trim() !== '')
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6e6e72;font:12px/1.4 monospace;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap;">${escapeHtml(
          k
        )}</td><td style="padding:6px 0;color:#16140f;font:15px/1.5 system-ui,sans-serif;">${escapeHtml(
          v
        ).replace(/\n/g, '<br/>')}</td></tr>`
    )
    .join('');
}

const SITE_HOST = SITE_URL.replace(/^https?:\/\/(www\.)?/, '');

/** Standard internal alert layout: heading, "via <site>" line, detail table. */
export function renderOwnerAlert({ heading, rows }) {
  return `
    <div style="max-width:560px;margin:0 auto;font-family:system-ui,sans-serif;">
      <h2 style="font:600 20px/1.2 system-ui,sans-serif;color:#16140f;margin:0 0 4px;">${escapeHtml(
        heading
      )}</h2>
      <p style="color:#6e6e72;font-size:13px;margin:0 0 18px;">via ${SITE_HOST}</p>
      <table style="border-collapse:collapse;width:100%;">${renderRows(rows)}</table>
    </div>`;
}

/** Customer-facing layout: logo, caller-supplied body, contact footer. */
export function renderCustomerEmail({ body }) {
  return `
    <div style="max-width:560px;margin:0 auto;font-family:system-ui,sans-serif;color:#16140f;">
      <div style="text-align:center;margin:0 0 24px;">
        <img src="${SITE_URL}/cleanking.png" alt="${escapeHtml(site.name)}" width="96" height="96" style="display:inline-block;border:0;" />
      </div>
      ${body}
      <p style="font-size:14px;line-height:1.55;margin:0 0 18px;">
        Questions? Call us at <b>${escapeHtml(site.phone)}</b> or just reply to this email.
      </p>
      <p style="color:#6e6e72;font-size:12.5px;line-height:1.5;border-top:1px solid #e6e4dd;padding-top:14px;margin:0;">
        ${escapeHtml(site.name)} · ${escapeHtml(site.address1)}, ${escapeHtml(site.address2)} · ${escapeHtml(site.phone)}
      </p>
    </div>`;
}

export function getOwnerEmails() {
  return (process.env.OWNER_ALERT_EMAILS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

// Low-level send via Resend. `to` may be a string or array. `replyTo` is
// dropped unless it's a well-formed address — Resend rejects the whole send
// otherwise, and a customer typo must never cost the shop the lead.
async function sendEmail({ to, subject, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;
  if (!apiKey || !from) {
    console.error('Email not configured: set RESEND_API_KEY and RESEND_FROM.');
    return { ok: false, status: 500, message: 'Email service not configured.' };
  }
  const toList = (Array.isArray(to) ? to : [to]).filter(Boolean);
  if (toList.length === 0) {
    return { ok: false, status: 400, message: 'No recipient.' };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: toList,
      subject,
      html,
      ...(isEmail(replyTo) ? { replyTo: String(replyTo).trim() } : {}),
    });
    if (error) {
      console.error('Resend send error:', error);
      return { ok: false, status: 502, message: 'Failed to send email.' };
    }
    return { ok: true };
  } catch (err) {
    console.error('Resend send threw:', err);
    return { ok: false, status: 502, message: 'Failed to send email.' };
  }
}

/** Internal alert to the shop owner(s) (OWNER_ALERT_EMAILS). */
export async function sendOwnerEmail({ subject, html, replyTo }) {
  const to = getOwnerEmails();
  if (to.length === 0) {
    console.error('Email not configured: set OWNER_ALERT_EMAILS.');
    return { ok: false, status: 500, message: 'Email service not configured.' };
  }
  return sendEmail({ to, subject, html, replyTo });
}

/** Confirmation to a customer-provided address. Requires a verified domain. */
export async function sendCustomerEmail({ to, subject, html, replyTo }) {
  return sendEmail({ to, subject, html, replyTo });
}

/**
 * Adds an opted-in contact to the Resend segment (RESEND_SEGMENT_ID) for
 * future promos. Best-effort: failures are logged, never surfaced.
 */
export async function addToSegment({ email, name, phone }) {
  const apiKey = process.env.RESEND_API_KEY;
  const segmentId = process.env.RESEND_SEGMENT_ID;
  const address = String(email || '').trim();
  if (!apiKey || !segmentId || !isEmail(address)) return;

  try {
    const [firstName, ...rest] = String(name || '')
      .trim()
      .split(/\s+/);
    const phoneNumber = String(phone || '').trim();
    const resend = new Resend(apiKey);
    const { error } = await resend.contacts.create({
      email: address,
      firstName: firstName || undefined,
      lastName: rest.join(' ') || undefined,
      unsubscribed: false,
      segments: [{ id: segmentId }],
      // `phone` is a custom contact property defined in Resend.
      ...(phoneNumber ? { properties: { phone: phoneNumber } } : {}),
    });
    if (error) console.error('Segment add failed:', error);
  } catch (err) {
    console.error('Segment add failed:', err);
  }
}
