'use client';

import { useEffect, useState } from 'react';

// The home hero owns the whole first screen on phones: the site header and the
// sticky CTA bar both stay off-screen until roughly the hero has scrolled away,
// then slide in together. Both read this one threshold so they can never drift.
const REVEAL_RATIO = 0.6;

/** True once the page is scrolled past the hero's reveal point. */
export const isPastHero = () =>
  window.scrollY > window.innerHeight * REVEAL_RATIO;

/** Subscribes to that threshold; pass `false` to opt out (pages with no hero). */
export function useHeroReveal(enabled) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;
    const update = () => setRevealed(isPastHero());
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [enabled]);

  return revealed;
}
