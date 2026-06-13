import { renderRows, sendOwnerEmail, addToAudience } from '@/services/email';
import { isLikelySpam } from '@/services/spam';

export const runtime = 'nodejs';

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

  const { name, phone } = data || {};
  if (!name || !phone) {
    return Response.json(
      { error: 'Missing required fields.' },
      { status: 400 }
    );
  }

  const html = `
    <div style="max-width:560px;margin:0 auto;font-family:system-ui,sans-serif;">
      <h2 style="font:600 20px/1.2 system-ui,sans-serif;color:#16140f;margin:0 0 4px;">New contact message</h2>
      <p style="color:#6e6e72;font-size:13px;margin:0 0 18px;">via cleankingdetail.com</p>
      <table style="border-collapse:collapse;width:100%;">${renderRows({
        Name: data.name,
        Phone: data.phone,
        Email: data.email,
        Message: data.message,
        'Promo opt-in': data.optIn ? 'Yes' : 'No',
      })}</table>
    </div>`;

  const result = await sendOwnerEmail({
    subject: `New message — ${name}`,
    html,
    replyTo: data.email || undefined,
  });

  if (!result.ok) {
    return Response.json({ error: result.message }, { status: result.status });
  }

  // Opted-in contacts join the Resend audience for future promos.
  if (data.optIn) {
    await addToAudience({ email: data.email, name: data.name });
  }

  return Response.json({ ok: true });
}
