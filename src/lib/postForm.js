/**
 * POSTs a form payload as JSON to one of the /api form routes. Resolves on
 * success; otherwise throws an Error whose message is safe to show the user.
 * That's the server's own wording for a rate-limit 429 (it tells people when
 * to retry), and `fallback` for everything else so internal failure details
 * never reach the page.
 */
export async function postForm(url, payload, fallback) {
  let res;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(fallback);
  }
  if (res.ok) return;
  if (res.status === 429) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || fallback);
  }
  throw new Error(fallback);
}
