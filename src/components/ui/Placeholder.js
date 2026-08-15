import { cn } from './cn';

/** Striped photo placeholder with a small mono caption. */
export default function Placeholder({ label, className }) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden bg-stripes',
        className
      )}
    >
      {label && (
        <span className="bg-canvas/70 px-2.5 py-1.5 font-mono text-xs tracking-label text-fg-3 uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
