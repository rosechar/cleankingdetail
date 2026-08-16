'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import Stars from '@/components/ui/Stars';
import { cn } from '@/components/ui/cn';
import { GExternal } from './Icons';

export default function ReviewsCarousel() {
  const reviews = site.reviews;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reviews.length < 2 || paused) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % reviews.length),
      6000
    );
    return () => clearInterval(id);
  }, [paused, reviews.length]);

  return (
    // Sits directly under the home marquee, which already draws the divider,
    // so only a bottom border here.
    <section
      className="border-b border-line px-page py-section"
      id="reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-7 md:grid-cols-[auto_1fr] md:gap-10 lg:gap-14">
        <div
          className="hidden font-display text-quote-mark text-accent md:block"
          aria-hidden="true"
        >
          &ldquo;
        </div>
        <div>
          {/* all reviews stacked in one grid cell so the block stays as tall
              as the longest review (no layout shift); only the active shows.
              Each item is a full-height column so the by-line always sits at
              the bottom regardless of quote length. */}
          <div className="grid">
            {reviews.map((rev, idx) => (
              <a
                className={cn(
                  'group col-start-1 row-start-1 flex flex-col transition-opacity duration-450 motion-reduce:transition-none',
                  idx === index
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0'
                )}
                key={idx}
                href={site.google}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={idx !== index}
                tabIndex={idx === index ? 0 : -1}
              >
                <blockquote className="font-display text-quote">
                  &ldquo;{rev.quote}&rdquo;
                </blockquote>
                <div className="mt-auto flex flex-wrap items-center gap-4 pt-5.5 font-mono text-sm tracking-label text-fg-2 uppercase">
                  <Stars />{' '}
                  <span className="inline-flex items-center gap-2 transition-colors group-hover:text-fg">
                    {rev.name}
                    {rev.car ? ` · ${rev.car}` : ''}
                    <GExternal
                      className="size-3.25 stroke-2 text-fg-3 transition-[color,transform] group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </a>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="mt-6.5 flex gap-2.25">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={cn(
                    'h-0.75 w-5.5 cursor-pointer transition-colors duration-200',
                    idx === index ? 'bg-accent' : 'bg-line-2 hover:bg-fg-3'
                  )}
                  aria-label={`Show review ${idx + 1}`}
                  aria-current={idx === index}
                  onClick={() => setIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
