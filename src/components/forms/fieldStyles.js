// Text-field treatment shared by the site's forms. Each form adds its own
// size and background on top; keep the font at 16px or more so iOS Safari
// doesn't zoom the page when a field is focused.
export const INPUT_BASE =
  'w-full border border-line-2 text-fg transition-colors focus:border-accent';

/** Added to a field that has a validation error. */
export const INPUT_INVALID = 'border-accent!';
