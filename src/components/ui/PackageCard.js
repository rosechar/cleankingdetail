import Link from 'next/link';
import { GArrow } from '@/components/garage/Icons';
import Eyebrow from './Eyebrow';
import { cn } from './cn';

/** 1px-gutter grid of package cards (1 / 2 / 3 columns). */
export function PackageGrid({ className, children }) {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
}

const CARD =
  'relative flex flex-col px-7.5 pt-8.5 pb-7.5 transition-colors duration-200';

/**
 * A single package tile: name + price row, blurb, then whatever the page
 * wants below (feature list, action links). `popular` adds the red outline
 * and "Most popular" tag.
 */
export function PackageCard({
  as: Tag = 'div',
  name,
  price,
  blurb,
  popular = false,
  className,
  children,
  ...rest
}) {
  return (
    <Tag
      className={cn(
        CARD,
        'bg-surface hover:bg-surface-2',
        popular && 'z-2 inset-ring-2 inset-ring-accent',
        className
      )}
      {...rest}
    >
      {popular && (
        <span className="absolute top-0 right-5 -translate-y-1/2 bg-accent px-3 py-1.25 font-mono text-xs font-semibold tracking-label text-on-accent uppercase">
          Most popular
        </span>
      )}
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-display text-2xl leading-none uppercase">
          {name}
        </span>
        <span className="font-display text-2xl leading-none whitespace-nowrap">
          {price}
        </span>
      </div>
      <p className="mt-4 text-base text-fg-2">{blurb}</p>
      {children}
    </Tag>
  );
}

/** Row of PackageLinks pinned to the bottom of a card. */
export function PackageActions({ children }) {
  return (
    <div className="mt-auto flex flex-wrap justify-between gap-x-5.5 gap-y-3 pt-5.5">
      {children}
    </div>
  );
}

/** Small mono "Book this →" link used inside package cards. */
export function PackageLink({ href, className, children }) {
  const Tag = href ? Link : 'span';
  return (
    <Tag
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 self-start font-mono text-sm tracking-label text-fg uppercase transition-colors hover:text-accent',
        className
      )}
    >
      {children}
      <GArrow className="size-3.5 shrink-0 fill-none stroke-accent stroke-2 transition-transform duration-200 group-hover:translate-x-1" />
    </Tag>
  );
}

/** The "Add-ons · Tint & Protect" tile that closes the package grid. */
export function AddOnCard({ as: Tag = 'div', ...rest }) {
  return (
    <Tag className={cn(CARD, 'justify-center bg-surface-2')} {...rest}>
      <Eyebrow>Add-ons</Eyebrow>
      <div className="mt-3.5 font-display text-2xl leading-none uppercase">
        Tint &amp; Protect
      </div>
      <p className="mt-4 text-base text-fg-2">
        Ceramic window tint and paint protection available with any detail. Ask
        for a quote.
      </p>
      <PackageLink
        className="mt-5.5"
        href={Tag === 'div' ? '/contact' : undefined}
      >
        Quote
      </PackageLink>
    </Tag>
  );
}
