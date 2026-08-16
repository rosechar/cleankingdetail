import Link from 'next/link';
import { cn } from './cn';

const VARIANTS = {
  solid: 'bg-fg text-canvas',
  ghost: 'text-fg inset-ring-2 inset-ring-line-2 hover:inset-ring-fg',
  accent: 'bg-accent text-on-accent',
};

const SIZES = {
  xs: 'px-3 py-3.75 text-sm',
  sm: 'px-4.5 py-3.5 text-base',
  md: 'px-6.5 py-3.75 text-base',
  lg: 'px-6 py-4.25 text-base',
};

/**
 * Primary CTA button (variants: solid | ghost | accent; sizes: xs | sm | md | lg). Renders a Next <Link> for internal hrefs, an <a> for
 * external/tel/mailto hrefs (and /api/ routes, which are downloads rather
 * than pages), and a <button> when no href is given.
 */
export default function Button({
  variant = 'solid',
  size = 'md',
  href,
  className,
  children,
  type,
  ...rest
}) {
  const classes = cn(
    'inline-flex cursor-pointer items-center justify-center gap-2 font-body font-semibold whitespace-nowrap transition-all duration-200 ease-snap hover:-translate-y-0.5',
    VARIANTS[variant],
    SIZES[size],
    className
  );

  if (href && href.startsWith('/') && !href.startsWith('/api/')) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type={type || 'button'} className={classes} {...rest}>
      {children}
    </button>
  );
}
