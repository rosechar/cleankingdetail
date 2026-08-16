'use client';

import { useEffect, useRef, useState } from 'react';
import { site } from '@/data/site';

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_STATIC_KEY;
const WHERE = `${site.address1}, ${site.address2}`;

// Static Maps thumbnail for the shop, sized to the pane it's shown in so the
// image is never cropped: the longer side is the API's 640px maximum and the
// other side follows the pane's aspect ratio (scale 2 for retina). Wide strips
// get one more zoom level so they don't read as a zoomed-out sliver; phones
// use a slightly closer zoom and the default (larger) pin. Returns null with
// no key so the component degrades to a dark pane + address.
function thumbUrl({ mobile, aspect }) {
  if (!KEY) return null;
  const w = aspect >= 1 ? 640 : Math.round(640 * aspect);
  const h = aspect >= 1 ? Math.round(640 / aspect) : 640;
  const zoom = mobile ? 16 : aspect > 1.8 ? 15 : 14;
  const params = new URLSearchParams({
    center: WHERE,
    zoom: String(zoom),
    size: `${w}x${h}`,
    scale: '2',
    markers: `${mobile ? '' : 'size:mid|'}color:0xed2f38|${WHERE}`,
    key: KEY,
  });
  return `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}`;
}

/**
 * Lightweight static map (~20 KB) that links out to Google Maps for directions.
 * We don't load the interactive Maps embed at all (~400 KB) — opening the map
 * app is the more useful "find us" action and keeps the page fast.
 */
export default function MapEmbed() {
  const [imgFailed, setImgFailed] = useState(false);
  const [mobile, setMobile] = useState(false);
  // Pane aspect ratio (w/h), rounded to 2dp so resize jitter doesn't refetch.
  const [aspect, setAspect] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width && height) setAspect(Math.round((width / height) * 100) / 100);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const thumb = aspect ? thumbUrl({ mobile, aspect }) : null;
  const showThumb = thumb && !imgFailed;

  return (
    <a
      ref={ref}
      className="group absolute inset-0 block size-full overflow-hidden bg-surface-2"
      href={site.google}
      target="_blank"
      rel="noopener noreferrer"
    >
      {showThumb && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          className="absolute inset-0 size-full object-cover filter-map"
          src={thumb}
          alt=""
          aria-hidden="true"
          loading="lazy"
          onError={() => setImgFailed(true)}
        />
      )}
      <span className="absolute top-3.5 right-3.5 z-2 inline-flex items-center gap-2 border border-white/16 bg-canvas/78 px-3.5 py-2.25 font-mono text-xs tracking-widest text-fg uppercase transition-colors group-hover:bg-canvas/94">
        <svg
          className="size-3.5 fill-none stroke-accent stroke-2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M14 4h6v6M20 4l-9 9M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
        </svg>
        Open in Maps
      </span>
      <span className="absolute inset-x-0 bottom-0 z-1 flex items-center gap-2.25 bg-linear-to-b from-transparent to-canvas/92 px-4.5 pt-8 pb-4 text-sm text-fg">
        <svg
          className="size-4.25 shrink-0 fill-none stroke-accent stroke-2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        <span>
          {site.address1}, {site.address2}
        </span>
      </span>
    </a>
  );
}
