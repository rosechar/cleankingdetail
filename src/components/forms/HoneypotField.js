import { HONEYPOT_FIELD } from '@/lib/honeypot';

/**
 * Anti-spam decoy. `display:none` puts it out of reach of humans *and* browser
 * autofill — autofill only fills focusable fields, so unlike a visually-hidden
 * (clipped) input this one can never be populated by a real customer's saved
 * details. Plain HTTP bots that post every input in the form still set it; the
 * API routes drop those (see services/spam.js).
 */
export default function HoneypotField({ id, value, onChange }) {
  return (
    <input
      id={id}
      className="hidden"
      type="text"
      name={HONEYPOT_FIELD}
      tabIndex={-1}
      autoComplete="off"
      value={value}
      onChange={onChange}
    />
  );
}
