// Per-IP submission cap for the public form endpoints. The honeypot (see
// ./spam) catches bots that fill every field; this stops one client from
// sending lead/confirmation emails in a loop.
//
// State is this server instance's memory: on serverless each warm instance
// keeps its own counts and a cold start clears them. That's deliberate — it
// blunts scripted floods with no extra service or cost. If abuse ever outgrows
// it, swap the Map for a shared store (e.g. Upstash Redis) behind the same API.

const WINDOW_MS = 15 * 60 * 1000;
// Generous enough for a real customer who resubmits after a typo or a
// network error, tight enough that a script stalls after a handful.
const MAX_PER_WINDOW = 5;
// Above this many tracked clients, expired entries are swept so a spray of
// spoofed IPs can't grow memory without bound.
const SWEEP_THRESHOLD = 5000;

/** key → { count, resetAt } */
const hits = new Map();

function sweep(now) {
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key);
  }
  // Still full of live entries: drop the oldest (Map keeps insertion order).
  while (hits.size > SWEEP_THRESHOLD) {
    hits.delete(hits.keys().next().value);
  }
}

/**
 * The caller's IP as reported by the hosting proxy (Vercel sets
 * x-forwarded-for; the first entry is the client).
 */
export function clientIp(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  return (
    forwarded?.split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown'
  );
}

/**
 * Counts one hit against `key` (fixed window). Returns `{ ok: true }` while
 * under the cap, otherwise `{ ok: false, retryAfter }` in seconds.
 */
export function rateLimit(key, now = Date.now()) {
  if (hits.size > SWEEP_THRESHOLD) sweep(now);

  const entry = hits.get(key);
  if (!entry || entry.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true };
  }
  entry.count += 1;
  if (entry.count <= MAX_PER_WINDOW) return { ok: true };
  return { ok: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
}
