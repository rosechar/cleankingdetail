'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import { GStar, GExternal } from './Icons';

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
    <section
      className="garage-review"
      id="reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="inner">
        <div className="big" aria-hidden="true">
          &ldquo;
        </div>
        <div>
          <div className="rv">
            {reviews.map((rev, idx) => (
              <a
                className={'rv-item' + (idx === index ? ' on' : '')}
                key={idx}
                href={site.google}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={idx !== index}
                tabIndex={idx === index ? 0 : -1}
              >
                <blockquote>{rev.quote}</blockquote>
                <div className="by">
                  <span className="ck-stars" aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <GStar key={s} />
                    ))}
                  </span>{' '}
                  <span className="nm">
                    {rev.name}
                    {rev.car ? ` · ${rev.car}` : ''}
                    <GExternal className="ext" aria-hidden="true" />
                  </span>
                </div>
              </a>
            ))}
          </div>
          {reviews.length > 1 && (
            <div className="rv-dots">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={idx === index ? 'on' : ''}
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
