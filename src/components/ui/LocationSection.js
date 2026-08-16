import MapEmbed from '@/components/garage/MapEmbed';
import Chip from './Chip';
import Eyebrow from './Eyebrow';
import { cn } from './cn';

/**
 * Two-pane "find us" block: copy + address/phone facts on the left, map on
 * the right. `description` is a paragraph or an array of paragraphs. `info`
 * rows are { label, value }; `chips` (optional) renders a labelled row of
 * service-area tags — each a plain string or { label, href } to link it.
 */
export default function LocationSection({
  id,
  eyebrow,
  title,
  description,
  info = [],
  chipsLabel,
  chips,
}) {
  return (
    <section id={id} className="px-page py-section">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
        <div className="bg-surface px-7 py-8.5 md:px-9 md:py-11 lg:px-11.5 lg:py-13">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-3.5 font-display text-display-lg uppercase">
            {title}
          </h2>
          {(Array.isArray(description) ? description : [description]).map(
            (para, i) => (
              <p
                key={i}
                className={cn(
                  'text-base leading-relaxed text-fg-2',
                  i === 0 ? 'mt-4.5' : 'mt-3.5'
                )}
              >
                {para}
              </p>
            )
          )}
          <div className="mt-7.5 flex flex-col gap-4.5">
            {info.map(({ label, value }) => (
              <div key={label}>
                <div className="font-mono text-xs tracking-label text-fg-3 uppercase">
                  {label}
                </div>
                <div className="mt-1 text-base">{value}</div>
              </div>
            ))}
            {chips && (
              <div>
                <div className="font-mono text-xs tracking-label text-fg-3 uppercase">
                  {chipsLabel}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {chips.map((c) => {
                    const { label, href } =
                      typeof c === 'string' ? { label: c } : c;
                    return (
                      <Chip key={label} href={href} hover>
                        {label}
                      </Chip>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="relative min-h-70 bg-surface-2 md:min-h-95">
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
