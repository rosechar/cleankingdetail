// Shared plumbing for the public form endpoints (booking & contact).
import { site } from '@/data/site';
import { clientIp, rateLimit } from './rateLimit';
import { isLikelySpam } from './spam';

export const jsonError = (message, status) =>
  Response.json({ error: message }, { status });

export const jsonOk = () => Response.json({ ok: true });

/**
 * Parses the JSON body of a form POST. Returns `{ data }` for a genuine
 * submission, or `{ response }` with the reply to send straight back —
 * a 429 once this client has hit the endpoint too often, a 400 for
 * malformed input, or a silent 200 for anything the spam heuristics flag
 * (bots get no signal that they were caught).
 */
export async function readFormBody(req) {
  const { pathname } = new URL(req.url);
  const limit = rateLimit(`${pathname}:${clientIp(req)}`);
  if (!limit.ok) {
    return {
      response: Response.json(
        {
          error: `Too many submissions — please try again in a few minutes, or call us at ${site.phone}.`,
        },
        { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } }
      ),
    };
  }

  let data;
  try {
    data = await req.json();
  } catch {
    return { response: jsonError('Invalid request.', 400) };
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return { response: jsonError('Invalid request.', 400) };
  }
  if (isLikelySpam(data)) return { response: jsonOk() };
  return { data };
}
