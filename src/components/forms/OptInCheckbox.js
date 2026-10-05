import { OPT_IN_LABEL } from '@/data/booking';
import { GTick } from '@/components/garage/Icons';
import { cn } from '@/components/ui/cn';

/**
 * Marketing opt-in shared by the booking and contact forms, so the consent
 * wording and its styling live in one place. A native checkbox (restyled with
 * `appearance-none`) keeps keyboard, form and screen-reader behaviour for free.
 */
export default function OptInCheckbox({ id, checked, onChange, className }) {
  return (
    <label
      htmlFor={id}
      className={cn('flex cursor-pointer items-center gap-3', className)}
    >
      <span className="relative flex size-6 shrink-0">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer size-full cursor-pointer appearance-none border-[1.5px] border-line-2 transition-colors checked:border-accent checked:bg-accent"
        />
        <GTick
          className="pointer-events-none absolute inset-0 m-auto size-3.5 text-on-accent opacity-0 peer-checked:opacity-100"
          aria-hidden="true"
        />
      </span>
      <span className="text-[15px] leading-snug text-fg-3">{OPT_IN_LABEL}</span>
    </label>
  );
}
