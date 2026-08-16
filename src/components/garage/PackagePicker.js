'use client';

import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { findPackage } from '@/data/site';
import { cn } from '@/components/ui/cn';

// Services page package browser: a grid of full package cards (name, price,
// blurb, collapsible line items + inherited-services accordion), or a
// "Compare all" matrix grouped into accordion sections. Tapping a card or a
// table column heading goes straight to booking with that package selected.

// Card columns: Full + Interior on the left, Deluxe, Spiffy and À La Carte on
// the right (md+). Phones read left column then right, top to bottom.
const CARD_COLUMNS = [
  ['full-detail', 'interior-detail'],
  ['deluxe-detail', 'spiffy-detail', 'a-la-carte'],
];
const TABLE_ORDER = [
  'spiffy-detail',
  'interior-detail',
  'full-detail',
  'deluxe-detail',
  'a-la-carte',
];

const byIds = (ids) => ids.map((id) => findPackage(id)).filter(Boolean);
const cardColumns = CARD_COLUMNS.map(byIds);
const tablePkgs = byIds(TABLE_ORDER);

/** Everything a package delivers: its own line items + inherited ones. */
const allOf = (p) => [...(p.details || p.items), ...(p.includes || [])];

// Compare-all groupings. Matching is by keyword so new line items in
// data/site.js land in a sensible bucket without touching this file.
const SECTIONS = [
  {
    title: 'Trunk & engine bay',
    test: /^vacuum trunk$|trunk channels|engine/i,
  },
  { title: 'Glass', test: /glass/i },
  {
    title: 'Interior',
    test: /interior|upholster|carpet|dash|door panel|instrument|vent|seat/i,
  },
  { title: 'Exterior', test: /./ }, // everything else
];
const ORDER = ['Interior', 'Exterior', 'Glass', 'Trunk & engine bay'];

function buildRows() {
  const universe = [];
  tablePkgs.forEach((p) =>
    allOf(p).forEach((label) => {
      if (!universe.includes(label)) universe.push(label);
    })
  );
  const grouped = new Map(ORDER.map((t) => [t, []]));
  universe.forEach((label) => {
    const sec = SECTIONS.find((s) => s.test.test(label));
    grouped.get(sec.title).push(label);
  });
  return ORDER.map((title) => ({ title, rows: grouped.get(title) })).filter(
    (s) => s.rows.length
  );
}
const TABLE_SECTIONS = buildRows();

const MONO_LABEL = 'font-mono uppercase';
const bookHref = (p) => `/appointment?pkg=${p.id}`;

/** Small square "+" that rotates to "×" when open. */
function PlusIcon({ open }) {
  return (
    <span
      className={cn(
        'inline-flex size-5 shrink-0 items-center justify-center border border-line-2 transition-transform duration-200',
        open && 'rotate-45'
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 12 12"
        className="size-2.5 fill-none stroke-current stroke-[1.5]"
      >
        <path d="M6 1v10M1 6h10" />
      </svg>
    </span>
  );
}

function ItemList({ items, className, columns = false }) {
  return (
    <ul
      className={cn(
        columns ? 'grid grid-cols-1 gap-x-6 md:grid-cols-2' : 'flex flex-col',
        className
      )}
    >
      {items.map((it) => (
        <li
          key={it}
          className="flex items-baseline gap-2.5 py-1.75 text-sm leading-[1.45] text-fg-2 sm:text-base"
        >
          <span
            className="flex-none text-[10px] text-accent"
            aria-hidden="true"
          >
            ■
          </span>
          <span className="flex-1">{it}</span>
        </li>
      ))}
    </ul>
  );
}

/** Collapsible item list ("What's included", "Includes <tier> services").
 *  `defaultOpen` is honoured on mount and whenever it flips to true (deep
 *  links from the home page open that package's lists). */
function Includes({ title, items, defaultOpen = false, columns = false }) {
  const [open, setOpen] = useState(defaultOpen);
  useEffect(() => {
    if (defaultOpen) setOpen(true);
  }, [defaultOpen]);
  // Stop clicks/keys reaching the card, which is itself a link to booking.
  const stop = (e) => e.stopPropagation();
  return (
    <div
      className="relative z-1 border-t border-line"
      onClick={stop}
      onKeyDown={stop}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full cursor-pointer items-center justify-between gap-3.5 px-4 py-3.5 text-left sm:px-5.5"
      >
        <span className="font-display text-[15px] tracking-[.05em] uppercase">
          {title}
        </span>
        <PlusIcon open={open} />
      </button>
      {open && (
        <ItemList
          items={items}
          columns={columns}
          className="px-4 pb-4 sm:px-5.5 sm:pb-5.5"
        />
      )}
    </div>
  );
}

/** One full package card. The whole card links to booking. On phones both
 *  item lists are closed accordions; from md the package's own line items are
 *  always shown (two columns) and only the inherited-services list folds. */
function PackageCard({ pkg, expanded }) {
  return (
    <article
      id={pkg.id}
      className={cn(
        'relative flex scroll-mt-28 flex-col border border-line bg-surface transition-colors duration-[180ms] focus-within:border-line-2 hover:border-line-2',
        pkg.popular && 'border-l-[3px] border-l-accent hover:border-l-accent'
      )}
    >
      {/* Stretched link: the whole card is one tap target for booking; the
          accordions sit above it (z-1) so they stay clickable. */}
      <Link
        href={bookHref(pkg)}
        className="absolute inset-0 z-0"
        aria-label={`Book ${pkg.name}`}
      />
      <div className="flex-1 p-4 sm:p-5.5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display text-[26px] leading-[.95] uppercase">
            {pkg.name}
          </h2>
          {pkg.badge && (
            <span
              className={cn(
                MONO_LABEL,
                'flex-none border border-accent px-1.75 py-1 text-center text-[9px] leading-[1.3] tracking-[.12em] text-accent'
              )}
            >
              {pkg.badge}
            </span>
          )}
        </div>
        <div className="mt-3 font-display text-[30px] leading-none whitespace-nowrap text-accent tabular-nums">
          {pkg.price}
        </div>
        <p className="mt-3 text-sm leading-normal text-fg-2">{pkg.blurb}</p>
      </div>
      {/* phones: line items behind an accordion; md+: always listed, 2 cols */}
      <div className="md:hidden">
        <Includes
          title="What's included"
          items={pkg.details || pkg.items}
          defaultOpen={expanded}
        />
      </div>
      <div className="hidden border-t border-line p-4 sm:p-5.5 md:block">
        <ItemList items={pkg.details || pkg.items} columns />
      </div>
      {pkg.includes && (
        <Includes
          title={pkg.includesText}
          items={pkg.includes}
          defaultOpen={expanded}
          columns
        />
      )}
    </article>
  );
}

/** Compare-all matrix: one accordion section per area of the car. */
function CompareTable() {
  const [openSections, setOpenSections] = useState(
    () => new Set([TABLE_SECTIONS[0]?.title])
  );
  const toggle = (title) =>
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });

  return (
    <div>
      <div className="overflow-auto border border-line bg-surface">
        <table className="w-full table-fixed border-collapse text-sm sm:min-w-[660px] sm:text-base">
          <thead>
            <tr>
              <th
                scope="col"
                className={cn(
                  MONO_LABEL,
                  'sticky left-0 z-3 w-[42%] border-b border-line-2 bg-surface-2 px-3 py-3.5 text-left text-[10px] font-normal tracking-label text-fg-3 sm:w-[34%] sm:px-5.5'
                )}
              >
                Service
              </th>
              {tablePkgs.map((p) => (
                <th
                  key={p.id}
                  scope="col"
                  className="border-b border-line-2 bg-surface-2 p-0 text-center align-bottom font-normal"
                >
                  <Link
                    href={bookHref(p)}
                    className="block w-full px-1 py-3 font-display text-[11px] leading-[1.15] tracking-[.04em] text-fg uppercase transition-colors hover:text-accent sm:px-2.5 sm:py-3.5 sm:text-sm"
                  >
                    <span className="sr-only">Book </span>
                    <span className="sm:hidden">{p.short || p.name}</span>
                    <span className="hidden sm:inline">{p.name}</span>
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_SECTIONS.map((sec) => {
              const open = openSections.has(sec.title);
              return (
                <Fragment key={sec.title}>
                  <tr>
                    <th
                      scope="rowgroup"
                      colSpan={tablePkgs.length + 1}
                      className="border-t border-line bg-surface-2 p-0 text-left font-normal"
                    >
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => toggle(sec.title)}
                        className={cn(
                          MONO_LABEL,
                          'flex w-full cursor-pointer items-center justify-between gap-3 px-3 py-3 text-left text-[10px] tracking-[.16em] text-accent sm:px-5.5'
                        )}
                      >
                        {sec.title}
                        <PlusIcon open={open} />
                      </button>
                    </th>
                  </tr>
                  {open &&
                    sec.rows.map((label) => (
                      <tr key={label}>
                        <th
                          scope="row"
                          className="sticky left-0 z-2 border-t border-line bg-surface px-3 py-2.5 text-left leading-[1.35] font-normal text-fg-2 sm:px-5.5 sm:py-2.75"
                        >
                          {label}
                        </th>
                        {tablePkgs.map((p) => {
                          const on = allOf(p).includes(label);
                          return (
                            <td
                              key={p.id}
                              className={cn(
                                'border-t border-line px-1 py-2.5 text-center sm:px-2.5 sm:py-2.75',
                                on ? 'text-accent' : 'text-fg-3'
                              )}
                              aria-label={on ? 'Included' : 'Not included'}
                            >
                              {on ? '✓' : '·'}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function PackagePicker() {
  const [layout, setLayout] = useState('packages');
  const [expanded, setExpanded] = useState('');

  // Deep links like /services#deluxe-detail (home page cards): open that
  // package's lists and scroll it into view.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id || !findPackage(id)) return;
    setExpanded(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, []);

  return (
    <div>
      {/* layout toggle */}
      <div className="mb-4.5 flex justify-center border-b border-line pb-4.5">
        <div
          className="flex gap-0.5 border border-line bg-surface p-0.5"
          role="group"
          aria-label="Package view"
        >
          {[
            ['packages', 'Packages'],
            ['table', 'Compare all'],
          ].map(([k, label]) => (
            <button
              key={k}
              type="button"
              aria-pressed={layout === k}
              onClick={() => setLayout(k)}
              className={cn(
                MONO_LABEL,
                'cursor-pointer px-5.5 py-3 text-xs tracking-[.14em] whitespace-nowrap transition-colors duration-[180ms] sm:px-7 sm:text-[13px]',
                layout === k
                  ? 'bg-accent text-on-accent'
                  : 'text-fg-3 hover:text-fg'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {layout === 'packages' ? (
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
          {cardColumns.map((col, i) => (
            <div key={i} className="flex flex-col gap-10">
              {col.map((p) => (
                <PackageCard key={p.id} pkg={p} expanded={expanded === p.id} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-6xl">
          <CompareTable />
        </div>
      )}
    </div>
  );
}
