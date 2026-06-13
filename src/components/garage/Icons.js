// Garage design icon set (ported from the handoff's inline SVGs).
// Stroke icons inherit stroke from CSS; fill icons inherit fill.

export function GArrow(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function GStar(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.73L18.18 21 12 17.27 5.82 21 7 14l-5-4.73 7.1-1.01z" />
    </svg>
  );
}

export function GCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M4 12.5l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GPhone(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24 11 11 0 0 0 3.4.55 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .55 3.4 1 1 0 0 1-.25 1z" />
    </svg>
  );
}

export function GPin(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}
