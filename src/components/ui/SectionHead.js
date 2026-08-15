import Eyebrow from './Eyebrow';
import { cn } from './cn';

/**
 * Section heading row: eyebrow + big display title on the left, optional
 * supporting paragraph (children) on the right. Stacks below lg.
 */
export default function SectionHead({
  eyebrow,
  title,
  tight = false,
  className,
  children,
}) {
  return (
    <div
      className={cn(
        'mx-auto flex max-w-7xl flex-col items-stretch gap-3.5 lg:flex-row lg:items-end lg:justify-between lg:gap-7.5',
        tight ? 'mb-7.5' : 'mb-11.5',
        className
      )}
    >
      <div className="w-full lg:w-auto">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-3.5 font-display text-display-xl uppercase">
          {title}
        </h2>
      </div>
      {children && (
        <p className="w-full max-w-130 text-base text-fg-2 lg:w-auto lg:max-w-85 lg:text-right">
          {children}
        </p>
      )}
    </div>
  );
}
