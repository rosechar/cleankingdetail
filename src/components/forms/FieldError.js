/**
 * ARIA wiring for a field and its <FieldError>: marks the control invalid and
 * points it at the message. Spread onto the input (or radiogroup) whose `id`
 * is passed; the error renders with id `${id}-err`.
 */
export const fieldErrorProps = (id, error) => ({
  'aria-invalid': error ? true : undefined,
  'aria-describedby': error ? `${id}-err` : undefined,
});

/**
 * Inline validation message under a field (renders nothing when empty).
 * Deliberately not a live region: on a failed submit focus moves to the first
 * invalid field, which reads this out via aria-describedby. Announcing every
 * message as well would fire several alerts at once and re-announce each one
 * as it toggles while the user types.
 */
export default function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={`${id}-err`} className="mt-1.5 text-sm font-medium text-accent">
      {children}
    </p>
  );
}
