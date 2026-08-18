// Bot check for the public form endpoints (booking & contact). The hidden
// decoy field is the only signal: nothing a human or their browser does can
// set it, so anything that arrives with it filled is posting the raw form.
//
// There is deliberately no submit-timing check. A real customer autofilling
// their details can beat any threshold worth setting, and a bot can send
// whatever elapsed time it likes — it cost real leads without stopping anyone.
// Flood protection belongs in a rate limit, not here.
import { HONEYPOT_FIELD } from '@/lib/honeypot';

export function isLikelySpam(data) {
  return Boolean(data?.[HONEYPOT_FIELD]);
}
