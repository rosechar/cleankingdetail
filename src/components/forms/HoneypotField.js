import { HONEYPOT_FIELD } from '@/lib/honeypot';

/**
 * Anti-spam decoy. Visually hidden rather than `display:none` on purpose: the
 * bots worth catching here drive a real browser (these forms POST JSON via
 * fetch, so there's no form `action` for a plain HTTP scraper to find), and
 * browser automation refuses to fill an element with no bounding box — a
 * `display:none` decoy would never be tripped. A clipped 1×1 input still gets
 * filled by anything walking the DOM.
 *
 * Autofill is kept off it by the field *name* (see lib/honeypot) rather than
 * by hiding: "company"/"organization" is in autofill's vocabulary, so a real
 * customer could fill the trap and have their booking silently dropped.
 * `aria-hidden` keeps it out of the screen reader's path.
 */
export default function HoneypotField({ id, value, onChange }) {
  return (
    <div className="sr-only" aria-hidden="true">
      <input
        id={id}
        type="text"
        name={HONEYPOT_FIELD}
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
