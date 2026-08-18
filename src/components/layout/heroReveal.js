'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

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
  const revealedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return undefined;
    const update = () => setRevealed(isPastHero());
    update();
    // Tab reveals it too: the hidden header can't take focus, so keyboard
    // users would otherwise have no way to reach the nav from the top.
    const onKey = (e) => {
      if (e.key !== 'Tab' || revealedRef.current) return;
      // Flush the reveal *during* the keydown: the browser moves focus after
      // the event, so the header has to be visible (i.e. focusable) by then or
      // the very first Tab skips straight past the nav into the hero.
      revealedRef.current = true;
      flushSync(() => setRevealed(true));
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('keydown', onKey);
    };
  }, [enabled]);

  return revealed;
}
