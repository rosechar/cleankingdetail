import Link from 'next/link';
import { GArrow, GCheck } from '@/components/garage/Icons';
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
  'relative flex flex-col px-7.5 pt-7 pb-6 transition-colors duration-200';

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
        'group bg-surface hover:bg-surface-2',
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
      <p className="mt-3 text-base text-fg-2">{blurb}</p>
      {children}
    </Tag>
  );
}

/** Check-marked feature list inside a card (the package's headline items). */
export function PackageFeatures({ items, className }) {
  return (
    <ul className={cn('mt-4.5 flex flex-col gap-2', className)}>
      {items.map((it) => (
        <li key={it} className="flex items-baseline gap-2.5 text-sm text-fg-2">
          <GCheck
            className="size-3.75 shrink-0 translate-y-0.5 fill-none stroke-accent"
            strokeWidth={2.6}
            aria-hidden="true"
          />
          {it}
        </li>
      ))}
    </ul>
  );
}

/** Row of PackageLinks pinned to the bottom of a card. */
export function PackageActions({ className, children }) {
  return (
    <div
      className={cn(
        'mt-auto flex flex-wrap justify-between gap-x-5.5 gap-y-3 pt-4',
        className
      )}
    >
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

/** The "Add-ons · Tint & Protect" tile that closes the package grid. Built on
 *  PackageCard so it lines up with its siblings; "Quote" sits where the price
 *  does. As a link (home) it gets the arrow row, otherwise a "Get a quote"
 *  link (location pages). */
export function AddOnCard({ as: Tag = 'div', ...rest }) {
  const isLink = Tag !== 'div';
  return (
    <PackageCard
      as={Tag}
      name={<>Tint &amp; Protect</>}
      price="Quote"
      blurb="Ceramic window tint and paint protection available with any detail. Ask for a quote."
      {...rest}
    >
      <PackageActions className={isLink ? 'justify-end' : undefined}>
        {isLink ? (
          <GArrow
            className="size-4 shrink-0 fill-none stroke-accent stroke-2 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden="true"
          />
        ) : (
          <PackageLink href="/contact">Get a quote</PackageLink>
        )}
      </PackageActions>
    </PackageCard>
  );
}
