/**
 * ARIA wiring for a field and its <FieldError>: marks the control invalid and
 * points it at the message. Spread onto the input (or radiogroup) whose `id`
 * is passed; the error renders with id `${id}-err`.
 */
export const fieldErrorProps = (id, error) => ({
  'aria-invalid': error ? true : undefined,
  'aria-describedby': error ? `${id}-err` : undefined,
});

/** Inline validation message under a field (renders nothing when empty). */
export default function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p
      id={`${id}-err`}
      className="mt-1.5 text-sm font-medium text-accent"
      role="alert"
    >
      {children}
    </p>
  );
}
