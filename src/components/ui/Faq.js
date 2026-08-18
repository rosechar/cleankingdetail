'use client';

import { useState } from 'react';
import SectionHead from './SectionHead';
import { cn } from './cn';

/**
 * Accordion FAQ list. `items` are `{ id, question, answer }`. Pass `eyebrow` /
 * `title` to render the section heading; omit them to render the list only.
 * Pair with `faqJsonLd(items)` from data/faqs for the FAQPage structured data.
 */
export default function Faq({
  items,
  eyebrow = 'Good to know',
  title = 'FAQ',
  children,
  className,
}) {
  const [openId, setOpenId] = useState(null);
  return (
    <div className={cn('mx-auto max-w-6xl', className)}>
      {title && (
        <SectionHead eyebrow={eyebrow} title={title} tight>
          {children}
        </SectionHead>
      )}
      <div className="border-t border-line">
        {items.map(({ id, question, answer }) => {
          const open = openId === id;
          return (
            <div key={id} className="border-b border-line">
              <button
                type="button"
                className="flex w-full cursor-pointer items-center justify-between gap-5 py-5.5 text-left font-display text-display-xs text-fg uppercase"
                aria-expanded={open}
                onClick={() => setOpenId(open ? null : id)}
              >
                {question}
                <span
                  className={cn(
                    'relative size-5.5 shrink-0 before:absolute before:top-1/2 before:left-1/2 before:h-0.5 before:w-3.25 before:-translate-x-1/2 before:-translate-y-1/2 before:bg-accent before:content-[""] after:absolute after:top-1/2 after:left-1/2 after:h-0.5 after:w-3.25 after:-translate-x-1/2 after:-translate-y-1/2 after:bg-accent after:transition-transform after:duration-250 after:content-[""]',
                    open ? 'after:rotate-0' : 'after:rotate-90'
                  )}
                  aria-hidden="true"
                />
              </button>
              {/* 0fr -> 1fr animates to the answer's real height, so long
                  answers can't be clipped the way a fixed max-height clips
                  them on narrow screens or at larger font sizes. */}
              <div
                className={cn(
                  'grid transition-[grid-template-rows] duration-300 ease-in-out',
                  open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="max-w-190 pr-10 pb-6 text-base leading-relaxed text-fg-2">
                    {answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
