// Small input helpers shared by the forms (client) and the API routes (server).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Loose RFC-ish email check — good enough to gate sending, not to verify. */
export function isEmail(value) {
  return EMAIL_RE.test(String(value ?? '').trim());
}

/** A phone number needs at least 7 digits once formatting is stripped. */
export function isPhone(value) {
  return String(value ?? '').replace(/\D/g, '').length >= 7;
}

/**
 * Coerces an untrusted value to a trimmed string capped at `max` characters.
 * Non-strings become '' so a malformed payload can never reach the email
 * templates as `[object Object]`.
 */
export function cleanString(value, max = 200) {
  return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

// Field caps used by both API routes.
export const LIMITS = {
  name: 100,
  phone: 40,
  email: 254,
  date: 40,
  makeModel: 120,
  notes: 2000,
  message: 5000,
};
