import {
  renderOwnerAlert,
  sendOwnerEmail,
  addToSegment,
} from '@/services/email';
import { jsonError, jsonOk, readFormBody } from '@/services/forms';
import { cleanString, isEmail, isPhone, LIMITS } from '@/lib/validation';

export const runtime = 'nodejs';

export async function POST(req) {
  const { data, response } = await readFormBody(req);
  if (response) return response;

  const name = cleanString(data.name, LIMITS.name);
  const phone = cleanString(data.phone, LIMITS.phone);
  const email = cleanString(data.email, LIMITS.email);
  const message = cleanString(data.message, LIMITS.message);
  const optIn = Boolean(data.optIn);

  if (!name || !phone) return jsonError('Missing required fields.', 400);
  if (!isPhone(phone)) return jsonError('Enter a valid phone number.', 400);
  if (email && !isEmail(email)) {
    return jsonError('Enter a valid email address or leave it blank.', 400);
  }

  const result = await sendOwnerEmail({
    subject: `New message — ${name}`,
    html: renderOwnerAlert({
      heading: 'New contact message',
      rows: {
        Name: name,
        Phone: phone,
        Email: email,
        Message: message,
        'Promo opt-in': optIn ? 'Yes' : 'No',
      },
    }),
    replyTo: email,
  });
  if (!result.ok) return jsonError(result.message, result.status);

  // Opted-in contacts join the Resend segment for future promos.
  if (optIn && email) await addToSegment({ email, name, phone });

  return jsonOk();
}
