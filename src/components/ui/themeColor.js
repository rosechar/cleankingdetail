/**
 * Reads a colour token from the @theme block in globals.css at runtime, for
 * code that can't take a class name (three.js materials, Static Maps URLs), so
 * a palette change there reaches it too. Browser-only: call it from effects
 * or client-side render paths, never during server rendering.
 */
export function themeColor(name) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${name}`)
    .trim();
}
