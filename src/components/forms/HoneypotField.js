// Anti-spam decoy: visually hidden so humans never fill it, but bots that
// auto-fill every input do — the API routes reject submissions where it's set
// (see services/spam.js).
export default function HoneypotField({ id, value, onChange }) {
  return (
    <div className="sr-only" aria-hidden="true">
      <label htmlFor={id}>Company</label>
      <input
        id={id}
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
