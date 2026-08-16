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

export function GCalendar(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <rect x="3" y="5" width="18" height="16" rx="1" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
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

export function GExternal(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M14 5h5v5M19 5l-7 7M12 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Brand marks (fill icons).
export function GFacebook(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.47H15.2c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.45 2.91h-2.33V22C18.34 21.24 22 17.08 22 12.06z" />
    </svg>
  );
}

export function GGoogle(props) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path d="M21.6 12.23c0-.68-.06-1.33-.17-1.96H12v3.7h5.38a4.6 4.6 0 0 1-2 3.02v2.5h3.24c1.9-1.74 2.98-4.31 2.98-7.26z" />
      <path d="M12 21.9c2.7 0 4.96-.9 6.62-2.41l-3.24-2.5c-.9.6-2.04.95-3.38.95-2.6 0-4.8-1.75-5.59-4.1H3.06v2.58A10 10 0 0 0 12 21.9z" />
      <path d="M6.41 13.84A6 6 0 0 1 6.1 11.9c0-.67.11-1.33.31-1.94V7.38H3.06A10 10 0 0 0 2 11.9c0 1.61.39 3.14 1.06 4.52l3.35-2.58z" />
      <path d="M12 5.86c1.47 0 2.79.5 3.82 1.5l2.87-2.87A9.98 9.98 0 0 0 12 1.9a10 10 0 0 0-8.94 5.48l3.35 2.58C7.2 7.61 9.4 5.86 12 5.86z" />
    </svg>
  );
}
