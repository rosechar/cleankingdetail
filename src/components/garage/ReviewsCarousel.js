'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';
import { GArrow, GStar } from './Icons';

export default function ReviewsCarousel() {
  const reviews = site.reviews;
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reviews.length < 2 || paused) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;
    const id = setInterval(() => setI((p) => (p + 1) % reviews.length), 6000);
    return () => clearInterval(id);
  }, [paused, reviews.length]);

  return (
    <section
      className="garage-review"
      id="reviews"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="inner">
        <div className="big" aria-hidden="true">
          &ldquo;
        </div>
        <div>
          <div className="rv">
            {reviews.map((rev, idx) => (
              <div
                className={'rv-item' + (idx === i ? ' on' : '')}
                key={idx}
                aria-hidden={idx !== i}
              >
                <blockquote>{rev.quote}</blockquote>
                <div className="by">
                  <span className="ck-stars">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <GStar key={s} />
                    ))}
                  </span>{' '}
                  {rev.name}
                  {rev.car ? ` · ${rev.car}` : ''}
                </div>
              </div>
            ))}
          </div>
          <div className="links">
            <a href={site.google} target="_blank" rel="noopener noreferrer">
              Reviews on Google{' '}
              <GArrow style={{ width: 12, height: 12, strokeWidth: 2 }} />
            </a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer">
              Facebook{' '}
              <GArrow style={{ width: 12, height: 12, strokeWidth: 2 }} />
            </a>
          </div>
          {reviews.length > 1 && (
            <div className="rv-dots">
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={idx === i ? 'on' : ''}
                  aria-label={`Show review ${idx + 1}`}
                  aria-current={idx === i}
                  onClick={() => setI(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
