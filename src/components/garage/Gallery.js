import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/site';
import Placeholder from '@/components/ui/Placeholder';
import SectionHead from '@/components/ui/SectionHead';
import { cn } from '@/components/ui/cn';

// "Our Work" gallery — driven by site.gallery. Renders nothing when empty so
// the home page never ships a blank section. Each tile shows a real photo, a
// before/after pair (reveals "before" on hover/focus), or a labelled striped
// placeholder.
export default function Gallery() {
  const items = site.gallery || [];
  if (items.length === 0) return null;

  // Shared across tiles: each tile fills ~a third of a 1240px max grid.
  const sizes = '(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 400px';

  return (
    <section className="border-t border-line px-page py-section" id="work">
      <SectionHead
        eyebrow="Our Work"
        title={
          <>
            See the
            <br />
            difference
          </>
        }
      >
        Real results, detailed by hand in Blissfield.
        <br />
        <Link href="/appointment" className="text-accent">
          Book your detail →
        </Link>
      </SectionHead>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => {
          const isPair = Boolean(g.before && g.after);
          const photo = g.after || g.src;
          return (
            <figure
              className="group relative aspect-4/3 overflow-hidden bg-surface -outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent"
              key={g.label}
              tabIndex={isPair ? 0 : undefined}
            >
              {photo ? (
                <Image
                  className="object-cover transition-transform duration-500 ease-snap group-hover:scale-105 group-focus-visible:scale-105"
                  src={photo}
                  alt={isPair ? `${g.label} — after detailing` : g.label}
                  fill
                  sizes={sizes}
                />
              ) : (
                <Placeholder
                  label="Photo coming soon"
                  className="absolute inset-0"
                />
              )}
              {isPair && (
                <Image
                  className={cn(
                    'object-cover opacity-0 transition-opacity duration-400 ease-in-out',
                    'group-hover:opacity-100 group-focus-visible:opacity-100'
                  )}
                  src={g.before}
                  alt={`${g.label} — before detailing`}
                  fill
                  sizes={sizes}
                  aria-hidden="true"
                />
              )}
              <figcaption className="absolute inset-x-0 bottom-0 z-2 flex w-full items-center gap-2 bg-linear-to-t from-canvas/78 to-transparent px-4 pt-8 pb-3.5 font-mono text-xs tracking-label text-white uppercase">
                {isPair && (
                  <span
                    className="size-1.75 shrink-0 rotate-45 bg-accent"
                    aria-hidden="true"
                  />
                )}
                {g.tag || g.label}
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}
