'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { packages, findPackage } from '@/data/site';
import { cn } from '@/components/ui/cn';
import SectionHead from '@/components/ui/SectionHead';

// "What gets touched, where" — an interactive low-poly car. Tap a panel on
// the car (or a zone chip) to see the line items a package covers there,
// and watch that zone get soiled and washed. Pick a different package to
// compare. The three.js scene lives in ./carScene.js and is only fetched
// once the viewer scrolls near.

const ZONES = ['paint', 'wheels', 'glass', 'cabin', 'engine', 'trunk'];
const ZONE_LABEL = {
  paint: 'Paint & panels',
  wheels: 'Wheels & tires',
  glass: 'Glass',
  cabin: 'Cabin',
  engine: 'Engine bay',
  trunk: 'Trunk',
};
const ZONE_SHORT = {
  paint: 'Paint',
  wheels: 'Wheels',
  glass: 'Glass',
  cabin: 'Cabin',
  engine: 'Engine',
  trunk: 'Trunk',
};

// Package line item → car zone. Keyword matching (first hit wins) so new
// items in data/site.js land somewhere sensible without touching this file.
const ZONE_RULES = [
  ['trunk', /^vacuum trunk$|trunk channels/i],
  ['engine', /engine/i],
  ['glass', /glass|window/i],
  ['wheels', /tire|wheel/i],
  ['cabin', /interior|upholster|carpet|dash|door panel|instrument|vent|seat/i],
];
const zoneOf = (label) =>
  (ZONE_RULES.find(([, re]) => re.test(label)) || ['paint'])[0];

/** Every line item a package delivers (own + inherited), deduped, by zone. */
const itemsByZone = (pkg) => {
  const out = Object.fromEntries(ZONES.map((z) => [z, []]));
  const all = [
    ...(pkg.details || pkg.items || []),
    ...(pkg.includes || []),
  ].filter((label, i, arr) => arr.indexOf(label) === i);
  all.forEach((label) => {
    // "All Glass Cleaned (Interior Only)" is subsumed by the
    // "(Interior & Exterior)" line when a package has both.
    if (/\(interior only\)/i.test(label)) {
      const wider = label.replace(
        /\(interior only\)/i,
        '(Interior & Exterior)'
      );
      if (all.includes(wider)) return;
    }
    out[zoneOf(label)].push(label);
  });
  return out;
};
const COVERAGE = Object.fromEntries(
  packages.map((p) => [p.id, itemsByZone(p)])
);

// Order the package switcher cheapest → priciest, à la carte last.
const PKG_ORDER = [
  'spiffy-detail',
  'interior-detail',
  'full-detail',
  'deluxe-detail',
  'a-la-carte',
];
const PKGS = PKG_ORDER.map((id) => findPackage(id)).filter(Boolean);
const DEFAULT_PKG = 'deluxe-detail';

/** Other packages that do cover zone `z`. */
const alsoIn = (pkgId, z) =>
  PKGS.filter((p) => p.id !== pkgId && COVERAGE[p.id][z].length);

const MONO = 'font-mono text-[10px] tracking-[.12em] uppercase';

/* ------------------------------------------------------------------ */
/* 3D viewer                                                           */
/* ------------------------------------------------------------------ */

function CarViewer({ zone, coverage, onPick, className }) {
  const hostRef = useRef(null);
  const sceneRef = useRef(null);
  const zoneRef = useRef(zone);
  const coverageRef = useRef(coverage);
  const onPickRef = useRef(onPick);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | error
  zoneRef.current = zone;
  coverageRef.current = coverage;
  onPickRef.current = onPick;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;
    let cancelled = false;
    let io;

    const boot = async () => {
      setStatus('loading');
      try {
        const { createCarScene } = await import('./carScene');
        if (cancelled) return;
        const reducedMotion =
          window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ??
          false;
        const ctl = createCarScene(host, {
          accent: '#d8352e',
          bg: '#141419',
          fx: 'scrub',
          reducedMotion,
          onPick: (z) => onPickRef.current?.(z),
        });
        sceneRef.current = ctl;
        ctl.setCoverage(coverageRef.current);
        ctl.setZone(zoneRef.current);
        setStatus('ready');
      } catch (err) {
        console.error('car explorer boot', err);
        if (!cancelled) setStatus('error');
      }
    };

    // Lazy boot: don't pull three.js until the viewer is near the viewport.
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            boot();
          }
        },
        { rootMargin: '400px' }
      );
      io.observe(host);
    } else {
      boot();
    }

    return () => {
      cancelled = true;
      io?.disconnect();
      sceneRef.current?.dispose();
      sceneRef.current = null;
    };
  }, []);

  useEffect(() => {
    sceneRef.current?.setCoverage(coverage);
  }, [coverage]);
  useEffect(() => {
    sceneRef.current?.setZone(zone);
  }, [zone]);

  return (
    <div
      className={cn(
        'relative overflow-hidden border border-line bg-[radial-gradient(120%_90%_at_50%_20%,#22232a_0%,#101014_70%)]',
        className
      )}
    >
      <div
        ref={hostRef}
        className="absolute inset-0"
        role="img"
        aria-label="Interactive 3D car. Drag to spin it; tap a panel to select that area of the car."
      />
      {status !== 'ready' && (
        <div
          className={cn(
            MONO,
            'pointer-events-none absolute inset-0 flex items-center justify-center text-fg-3'
          )}
          aria-hidden={status !== 'error'}
        >
          {status === 'error'
            ? '3D preview unavailable — use the buttons to browse.'
            : 'Loading 3D car…'}
        </div>
      )}
      <div
        className={cn(
          MONO,
          'pointer-events-none absolute bottom-3 left-3.5 text-fg-3'
        )}
        aria-hidden="true"
      >
        Drag · pinch to zoom · tap a panel
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

function ItemList({ items, className }) {
  return (
    <ul
      className={cn(
        'grid grid-cols-1 gap-x-[clamp(14px,3vw,30px)] sm:grid-cols-2',
        className
      )}
    >
      {items.map((it) => (
        <li
          key={it}
          className="flex items-baseline gap-2.5 py-1.75 text-[15px] leading-[1.45] text-fg-2 sm:text-base"
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

/** "Not in this package — but it is in: …" with one-tap package switches. */
function AlsoIn({ note, pkgs, onPick, className }) {
  return (
    <div
      className={cn(
        'border border-dashed border-line-2 p-3.5 text-[13px] leading-normal text-fg-2',
        className
      )}
    >
      <p className="m-0">{note}</p>
      {pkgs.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-2">
          {pkgs.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onPick(p.id)}
              className={cn(
                MONO,
                'cursor-pointer border border-line-2 px-2.5 py-1.5 text-fg transition-colors hover:border-accent hover:text-accent'
              )}
            >
              {p.name} · {p.price}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * @param {object} props
 * @param {string}  [props.id]        section id (default "explorer")
 * @param {boolean} [props.borderTop] draw the section's top rule
 * @param {'chips'|'rows'} [props.layout] right column: zone chips + steps
 *        panel (home) or a per-zone coverage list (services compare view)
 * @param {string}  [props.pkgId]     controlled package id
 * @param {(id: string) => void} [props.onPkgChange]
 */
export default function CarExplorer({
  id = 'explorer',
  borderTop = true,
  layout = 'chips',
  eyebrow = 'Interactive',
  title = (
    <>
      What gets
      <br />
      touched, where
    </>
  ),
  pkgId: controlledPkg,
  onPkgChange,
}) {
  const [ownPkg, setOwnPkg] = useState(DEFAULT_PKG);
  const pkgId = controlledPkg ?? ownPkg;
  const setPkgId = useCallback(
    (next) => {
      setOwnPkg(next);
      onPkgChange?.(next);
    },
    [onPkgChange]
  );
  const [zone, setZone] = useState('');
  const pkg = findPackage(pkgId) || PKGS[0];
  const coverage = COVERAGE[pkg.id];
  const coveredZones = useMemo(
    () => ZONES.filter((z) => coverage[z].length > 0),
    [coverage]
  );

  const toggleZone = useCallback(
    (z) => setZone((cur) => (cur === z ? '' : z)),
    []
  );
  // A tap on empty space clears; a tap on the selected zone clears too.
  const onPick = useCallback(
    (z) => setZone((cur) => (!z || cur === z ? '' : z)),
    []
  );

  const panel = useMemo(() => {
    if (!zone) {
      return {
        title: pkg.name,
        sub: `Tap a zone on the car — or a chip above — to see the work covered there. Ghosted parts aren't part of this package.`,
        items: [],
        note: 'Nothing selected yet. Pick an area of the car to watch it get detailed.',
        alsoIn: [],
      };
    }
    const items = coverage[zone];
    const others = items.length ? [] : alsoIn(pkg.id, zone);
    return {
      title: ZONE_LABEL[zone],
      sub: items.length
        ? `Included in ${pkg.name}`
        : `Not covered by ${pkg.name}.`,
      items,
      note: others.length
        ? 'Not in this package — but it is in:'
        : 'Ask us — we can quote this on its own.',
      alsoIn: others,
    };
  }, [zone, pkg, coverage]);

  const titleId = `${id}-title`;
  const rows = layout === 'rows';

  return (
    <section
      className={cn('px-page py-section', borderTop && 'border-t border-line')}
      id={id}
      aria-labelledby={titleId}
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead
          eyebrow={eyebrow}
          title={<span id={titleId}>{title}</span>}
          tight
        >
          {rows ? (
            <>
              Pick a package — the parts it covers turn red, the rest fade out.
              Tap an area on the car to zoom in.
            </>
          ) : (
            <>
              Drag to spin the car, pinch to zoom, and tap a panel — or a chip —
              to see the work covered in that area by{' '}
              <strong className="font-medium text-fg">{pkg.name}</strong>.
            </>
          )}
        </SectionHead>

        {/* package switcher */}
        <div
          className="mb-4.5 flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Package"
        >
          <span className={cn(MONO, 'mr-1 text-fg-3')}>Package</span>
          {PKGS.map((p) => {
            const active = p.id === pkg.id;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={active}
                onClick={() => setPkgId(p.id)}
                className={cn(
                  'cursor-pointer border px-3 py-2 font-mono text-[11px] tracking-[.12em] whitespace-nowrap uppercase transition-colors duration-[180ms]',
                  active
                    ? 'border-accent bg-accent text-on-accent'
                    : 'border-line text-fg-2 hover:border-line-2 hover:text-fg'
                )}
              >
                {p.short}
                <span className="ml-1.5 text-[10px] opacity-70">{p.price}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-stretch gap-4.5">
          <CarViewer
            zone={zone}
            coverage={coveredZones}
            onPick={onPick}
            className="min-h-[340px] sm:min-h-[400px] lg:min-h-[460px]"
          />

          {rows ? (
            /* simple included / not-included list: the comparison view */
            <div className="flex flex-col border border-line bg-surface-2">
              <div className="flex items-baseline justify-between gap-3 border-b border-line px-5 py-4">
                <h3 className="font-display text-[22px] leading-none uppercase">
                  {pkg.name}
                </h3>
                <span className="font-display text-[22px] leading-none text-accent">
                  {pkg.price}
                </span>
              </div>
              <ul className="flex flex-1 flex-col px-5 py-2">
                {ZONES.map((z) => {
                  const covered = coverage[z].length > 0;
                  const active = zone === z;
                  return (
                    <li key={z}>
                      <button
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleZone(z)}
                        className={cn(
                          'flex w-full cursor-pointer items-center gap-3 py-2.5 text-left transition-colors',
                          covered ? 'text-fg' : 'text-fg-3',
                          active && 'text-accent'
                        )}
                      >
                        <span
                          className={cn(
                            'flex-none text-[10px]',
                            covered ? 'text-accent' : 'text-fg-3'
                          )}
                          aria-hidden="true"
                        >
                          {covered ? '■' : '□'}
                        </span>
                        <span className="flex-1 text-base">
                          {ZONE_LABEL[z]}
                        </span>
                        {!covered && (
                          <span className={cn(MONO, 'text-fg-3')}>
                            Not included
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="border-t border-line px-5 py-4">
                <Link
                  href={`/appointment?pkg=${pkg.id}`}
                  className="font-display text-[15px] tracking-[.05em] text-accent uppercase transition-colors hover:text-fg"
                >
                  Book {pkg.short} →
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4.5">
              {/* zone chips */}
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-label="Area of the car"
              >
                {ZONES.map((z) => {
                  const active = zone === z;
                  const covered = coverage[z].length > 0;
                  return (
                    <button
                      key={z}
                      type="button"
                      aria-pressed={active}
                      onClick={() => toggleZone(z)}
                      className={cn(
                        MONO,
                        'cursor-pointer border px-3.25 py-2 transition-all duration-[180ms]',
                        active
                          ? 'border-accent bg-accent/16 text-fg'
                          : 'border-line text-fg-2 hover:border-line-2 hover:text-fg',
                        !covered && !active && 'text-fg-3'
                      )}
                      title={covered ? undefined : `Not covered by ${pkg.name}`}
                    >
                      {ZONE_SHORT[z]}
                      {covered && (
                        <span className="ml-1.5 text-accent" aria-hidden="true">
                          ■
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* steps panel */}
              <div
                className="flex-1 border border-line bg-surface-2 p-5.5"
                aria-live="polite"
              >
                <h3 className="font-display text-[22px] leading-none uppercase">
                  {panel.title}
                </h3>
                <p className="mt-2 mb-4 text-[13px] leading-normal text-fg-3">
                  {panel.sub}
                </p>
                {panel.items.length > 0 ? (
                  <ItemList items={panel.items} />
                ) : (
                  <AlsoIn
                    note={panel.note}
                    pkgs={panel.alsoIn}
                    onPick={setPkgId}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
