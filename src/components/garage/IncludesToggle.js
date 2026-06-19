'use client';

import { useState } from 'react';
import { GCheck } from './Icons';

// Collapsible "Includes <tier> detail services" list on the services page —
// keeps higher tiers honest about what they carry over without a wall of text.
export default function IncludesToggle({ text, items }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={'svc-inc' + (open ? ' open' : '')}>
      <button
        type="button"
        className="svc-inc-toggle"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span className="ico" aria-hidden="true" />
        {text}
      </button>
      <ul className="svc-inc-list">
        {items.map((it) => (
          <li key={it}>
            <GCheck /> {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
