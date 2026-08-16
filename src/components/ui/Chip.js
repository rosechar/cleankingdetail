import Link from 'next/link';
import { cn } from './cn';

/**
 * Small outlined mono tag (service areas, quick facts). Pass `href` to render
 * it as a link (internal routes use next/link).
 */
export default function Chip({ href, hover = false, className, children }) {
  const classes = cn(
    'border border-line-2 px-3 py-1.5 font-mono text-xs tracking-wider text-fg-2 uppercase',
    (hover || href) && 'transition-colors hover:border-accent hover:text-fg',
    className
  );
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return <span className={classes}>{children}</span>;
}
