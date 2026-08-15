'use client';

import { useState } from 'react';
import { cn } from '@/components/ui/cn';
import { GCheck } from './Icons';

// Collapsible "Includes <tier> detail services" list on the services page —
// keeps higher tiers honest about what they carry over without a wall of text.
export default function IncludesToggle({ text, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4.5 max-w-xl">
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-2.75 font-mono text-xs tracking-widest text-fg-2 uppercase transition-colors duration-150 hover:text-fg"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {/* plus / minus icon: horizontal bar (before) + vertical bar (after) that collapses when open */}
        <span
          className={cn(
            "relative size-3.5 shrink-0 before:absolute before:inset-x-0 before:top-1/2 before:h-0.5 before:-translate-y-1/2 before:bg-accent before:content-[''] after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 after:-translate-x-1/2 after:bg-accent after:transition-transform after:duration-250 after:content-['']",
            open && 'after:scale-y-0'
          )}
          aria-hidden="true"
        />
        {text}
      </button>
      <ul
        className={cn(
          'grid grid-cols-1 gap-x-6.5 gap-y-2.25 overflow-hidden transition-[max-height,opacity,margin-top] duration-300 ease-in-out sm:grid-cols-2',
          open ? 'mt-3.5 max-h-225 opacity-100' : 'mt-0 max-h-0 opacity-0'
        )}
      >
        {items.map((it) => (
          <li
            key={it}
            className="flex items-baseline gap-2.5 text-sm text-fg-2"
          >
            <GCheck
              className="size-3.75 shrink-0 translate-y-0.5 fill-none stroke-accent"
              strokeWidth={2.6}
            />{' '}
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
