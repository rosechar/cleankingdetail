import Image from 'next/image';
import { site } from '@/data/site';

/**
 * Static "find us" map that links out to Google Maps for directions. The image
 * is a one-off 2x render of OpenStreetMap data centred on the shop
 * (scripts/build-map.mjs) — no API key, billing or runtime request — and
 * `object-cover` keeps its centre in the middle of the pane, so the pin drawn
 * there always sits on the shop. Fills its positioned parent.
 */
export default function MapEmbed() {
  return (
    <>
      <a
        className="group absolute inset-0 block size-full overflow-hidden bg-surface-2 -outline-offset-2"
        href={site.google}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          src="/shop-map.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          // Street labels go soft at the default q75.
          quality={90}
          className="object-cover filter-map"
        />
        {/* pin: its tip sits on the image centre, i.e. the shop */}
        <svg
          className="absolute top-1/2 left-1/2 z-1 h-10 w-8 -translate-x-1/2 -translate-y-full drop-shadow-[0_2px_3px_rgb(0_0_0/0.5)]"
          viewBox="0 0 32 40"
          aria-hidden="true"
        >
          <path
            className="fill-accent stroke-white stroke-2"
            d="M16 39S3 25.5 3 15.5a13 13 0 0 1 26 0C29 25.5 16 39 16 39z"
          />
          <circle className="fill-white" cx="16" cy="15.5" r="4.5" />
        </svg>
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
      {/* Required data credit (OpenFreeMap / OpenMapTiles / OSM); a sibling,
          since links can't nest. */}
      <a
        className="absolute top-3.5 left-3.5 z-2 bg-canvas/70 px-1.5 py-0.5 text-[10px] text-fg-3 transition-colors hover:text-fg"
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noopener noreferrer"
      >
        © OpenMapTiles © OpenStreetMap
      </a>
    </>
  );
}
