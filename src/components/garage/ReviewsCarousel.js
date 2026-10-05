'use client';

import { useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { site } from '@/data/site';
import Eyebrow from '@/components/ui/Eyebrow';
import Stars from '@/components/ui/Stars';
import { cn } from '@/components/ui/cn';
import { GExternal } from './Icons';

const ROTATE_MS = 6000;

export default function ReviewsCarousel() {
  const reviews = site.reviews;
  const [index, setIndex] = useState(0);
  // Auto-advance is off for a single review and under reduced motion; decided
  // after mount since the media query only exists in the browser.
  const [autoplay, setAutoplay] = useState(false);
  // Pointer or keyboard focus inside the section holds the current review.
  const [held, setHeld] = useState(false);
  // The visible pause button (WCAG 2.2.2) — the only stop touch users have.
  const [stopped, setStopped] = useState(false);
  const rotating = autoplay && !held && !stopped;

  useEffect(() => {
    setAutoplay(
      reviews.length > 1 &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }, [reviews.length]);

  useEffect(() => {
    if (!rotating) return;
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % reviews.length),
      ROTATE_MS
    );
    return () => clearInterval(id);
  }, [rotating, reviews.length]);

  return (
    // Sits between the borderless services preview and the location
    // section, so it draws its own dividers (on phones the full-bleed
    // location block below brings its own top border).
    <section
      className="border-t border-line px-page py-section md:border-b"
      id="reviews"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <Eyebrow as="h2" className="mx-auto mb-7 max-w-5xl md:mb-9">
        Our customers love us, and you will too
      </Eyebrow>
      {/* Row 1: quote mark + quote text (vertically centered). Row 2: by-line
          and dots — full width under the mark on phones, under the quote text
          from md, where the mark spans both rows. */}
      <div className="mx-auto grid max-w-5xl grid-cols-[auto_1fr] items-center gap-x-5 gap-y-5.5 md:gap-x-10 lg:gap-x-14">
        <div
          className="font-display text-quote-mark text-accent md:row-span-2"
          aria-hidden="true"
        >
          &ldquo;
        </div>
        {/* all reviews stacked in one grid cell so the block stays as tall as
            the longest review (no layout shift); only the active one shows. */}
        {/* Announce review changes only when they're user-driven, not every
            auto-advance. */}
        <div className="grid" aria-live={rotating ? 'off' : 'polite'}>
          {reviews.map((rev, idx) => (
            <blockquote
              key={idx}
              className={cn(
                'col-start-1 row-start-1 font-display text-quote transition-opacity duration-450 motion-reduce:transition-none',
                idx === index ? 'opacity-100' : 'opacity-0'
              )}
              aria-hidden={idx !== index}
            >
              {rev.quote}
            </blockquote>
          ))}
        </div>
        <div className="col-span-2 md:col-span-1 md:col-start-2">
          <div className="grid">
            {reviews.map((rev, idx) => (
              <a
                key={idx}
                className={cn(
                  'group col-start-1 row-start-1 flex flex-wrap items-center gap-4 font-mono text-sm tracking-label text-fg-2 uppercase transition-opacity duration-450 motion-reduce:transition-none',
                  idx === index
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0'
                )}
                href={site.google}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={idx !== index}
                tabIndex={idx === index ? 0 : -1}
              >
                <Stars />{' '}
                <span className="inline-flex items-center gap-2 transition-colors group-hover:text-fg">
                  {rev.name}
                  {rev.car ? ` · ${rev.car}` : ''}
                  <GExternal
                    className="size-3.25 stroke-2 text-fg-3 transition-[color,transform] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-accent"
                    aria-hidden="true"
                  />
                </span>
              </a>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="mt-6.5 flex gap-2.25">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="group -my-3 cursor-pointer py-3"
                  aria-label={`Show review ${idx + 1}`}
                  aria-current={idx === index}
                  onClick={() => setIndex(idx)}
                >
                  <span
                    className={cn(
                      'block h-0.75 w-5.5 transition-colors duration-200',
                      idx === index
                        ? 'bg-accent'
                        : 'bg-line-2 group-hover:bg-fg-3'
                    )}
                  />
                </button>
              ))}
              {autoplay && (
                <button
                  type="button"
                  className="-my-3 ml-1 flex cursor-pointer items-center px-1.5 py-3 text-fg-3 transition-colors hover:text-fg"
                  aria-label={stopped ? 'Play reviews' : 'Pause reviews'}
                  onClick={() => setStopped((s) => !s)}
                >
                  {stopped ? (
                    <Play
                      className="size-3.5 fill-current"
                      aria-hidden="true"
                    />
                  ) : (
                    <Pause
                      className="size-3.5 fill-current"
                      aria-hidden="true"
                    />
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
