import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/site';

// "Our Work" gallery — driven by site.gallery. Renders nothing when empty so
// the home page never ships a blank section. Each tile shows a real photo, a
// before/after pair (reveals "before" on hover/focus), or a labelled
// placeholder using the design system's striped .ck-ph pattern.
export default function Gallery() {
  const items = site.gallery || [];
  if (items.length === 0) return null;

  // Shared across tiles: each tile fills ~a third of a 1240px max grid.
  const sizes = '(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 400px';

  return (
    <section className="garage-work" id="work">
      <div className="garage-sh">
        <div>
          <div className="ck-eyebrow">Our Work</div>
          <h2>
            See the
            <br />
            difference
          </h2>
        </div>
        <p>
          Real results, detailed by hand in Blissfield.
          <br />
          <Link href="/appointment">Book your detail →</Link>
        </p>
      </div>

      <div className="garage-gallery">
        {items.map((g) => {
          const isPair = Boolean(g.before && g.after);
          const photo = g.after || g.src;
          return (
            <figure
              className={'gwork' + (isPair ? ' pair' : '')}
              key={g.label}
              tabIndex={isPair ? 0 : undefined}
            >
              {photo ? (
                <Image
                  className="after"
                  src={photo}
                  alt={isPair ? `${g.label} — after detailing` : g.label}
                  fill
                  sizes={sizes}
                />
              ) : (
                <div className="ck-ph">
                  <span>Photo coming soon</span>
                </div>
              )}
              {isPair && (
                <Image
                  className="before"
                  src={g.before}
                  alt={`${g.label} — before detailing`}
                  fill
                  sizes={sizes}
                  aria-hidden="true"
                />
              )}
              <figcaption className="gtag">
                {isPair && <span className="ba" aria-hidden="true" />}
                {g.tag || g.label}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
