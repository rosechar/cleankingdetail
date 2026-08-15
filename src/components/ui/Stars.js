import { GStar } from '@/components/garage/Icons';
import { cn } from './cn';

/** Five accent-red stars (decorative). */
export default function Stars({ className, starClassName = 'size-4.25' }) {
  return (
    <span
      className={cn('inline-flex gap-0.75 text-accent', className)}
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4].map((s) => (
        <GStar key={s} className={cn('fill-current', starClassName)} />
      ))}
    </span>
  );
}
