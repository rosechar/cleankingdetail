import MapEmbed from '@/components/garage/MapEmbed';
import Button from './Button';
import Chip from './Chip';
import Eyebrow from './Eyebrow';

/**
 * Two-pane "find us" block: copy + address/phone facts on the left, map on
 * the right. `info` rows are { label, value }; `chips` (optional) renders a
 * labelled row of service-area tags.
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
          <p className="mt-4.5 text-base leading-relaxed text-fg-2">
            {description}
          </p>
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
                  {chips.map((c) => (
                    <Chip key={c} hover>
                      {c}
                    </Chip>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Button variant="ghost" href="/contact" className="mt-7">
            Contact &amp; directions
          </Button>
        </div>
        <div className="relative min-h-70 bg-surface-2 md:min-h-95">
          <MapEmbed />
        </div>
      </div>
    </section>
  );
}
