// Name of the hidden decoy input, shared by the component that renders it and
// the API routes that reject submissions where it's set. Deliberately NOT
// "company" / "organization" / anything else in browser autofill's vocabulary:
// a decoy that autofill recognises gets filled by real customers, and a filled
// decoy means their submission is silently dropped.
export const HONEYPOT_FIELD = 'ref_code';
