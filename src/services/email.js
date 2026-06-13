import { Resend } from 'resend';

export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Renders { Label: value } pairs into a simple HTML table for the emails.
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

export function getOwnerEmails() {
  return (process.env.OWNER_ALERT_EMAILS || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

// Low-level send via Resend. `to` may be a string or array.
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

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: toList,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  if (error) {
    console.error('Resend send error:', error);
    return { ok: false, status: 502, message: 'Failed to send email.' };
  }
  return { ok: true };
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
 * Adds an opted-in contact to the Resend audience (RESEND_AUDIENCE_ID) for
 * future promos. Best-effort: failures are logged, never surfaced.
 */
export async function addToAudience({ email, name }) {
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  const address = String(email || '').trim();
  if (!apiKey || !audienceId) return;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) return;

  try {
    const [firstName, ...rest] = String(name || '')
      .trim()
      .split(/\s+/);
    const resend = new Resend(apiKey);
    const { error } = await resend.contacts.create({
      audienceId,
      email: address,
      firstName: firstName || undefined,
      lastName: rest.join(' ') || undefined,
      unsubscribed: false,
    });
    if (error) console.error('Audience add failed:', error);
  } catch (err) {
    console.error('Audience add failed:', err);
  }
}
