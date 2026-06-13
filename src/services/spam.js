// Shared bot check for the public form endpoints (booking & contact).
// `company` is a hidden honeypot field humans never see; `elapsedMs` is how
// long the form was open before submit. Direct API posts that omit the
// timing field are treated as bots.
export function isLikelySpam(data) {
  if (data?.company) return true;
  const elapsed = Number(data?.elapsedMs);
  return !Number.isFinite(elapsed) || elapsed < 3000;
}
