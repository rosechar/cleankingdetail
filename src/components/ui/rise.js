/**
 * Staggered "rise in" entrance used on page load (see --animate-rise in
 * globals.css). Pair `RISE` with `riseDelay(i)` on successive elements:
 *   <h1 className={RISE} style={riseDelay(1)}>
 * Only plays when the user allows motion.
 */
export const RISE = 'motion-safe:animate-rise';
export const riseDelay = (i) => ({ animationDelay: `${i * 60}ms` });
