/**
 * Accent asterisk marking a required field. Decorative only — the control
 * itself carries `required` / `aria-required`, so screen readers announce it
 * once rather than reading a stray "star".
 */
export default function Req() {
  return (
    <span className="text-accent" aria-hidden="true">
      {' *'}
    </span>
  );
}
