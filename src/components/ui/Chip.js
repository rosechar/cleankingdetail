import { cn } from './cn';

/** Small outlined mono tag (service areas, quick facts). */
export default function Chip({ hover = false, className, children }) {
  return (
    <span
      className={cn(
        'border border-line-2 px-3 py-1.5 font-mono text-xs tracking-wider text-fg-2 uppercase',
        hover && 'transition-colors hover:border-accent hover:text-fg',
        className
      )}
    >
      {children}
    </span>
  );
}
