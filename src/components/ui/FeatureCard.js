import { cn } from './cn';

/** 1px-gutter grid of FeatureCards (1 column below md, 3 from md). */
export function FeatureGrid({ className, children }) {
  return (
    <div
      className={cn(
        'mt-10 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  );
}

/** Surface tile with mono tag, display title, optional price / copy / bullet list. */
export function FeatureCard({
  tag,
  title,
  price,
  description,
  items,
  children,
}) {
  return (
    <div className="bg-surface px-7.5 py-8.5">
      {tag && (
        <div className="font-mono text-xs tracking-label text-accent uppercase">
          {tag}
        </div>
      )}
      <h4 className="mt-3 font-display text-2xl uppercase">{title}</h4>
      {price && <div className="mt-2.5 font-display text-3xl">{price}</div>}
      {description && <p className="mt-3 text-sm text-fg-2">{description}</p>}
      {items && (
        <ul className="mt-3.5 flex flex-col gap-2">
          {items.map((it) => (
            <li
              key={it}
              className="flex items-baseline gap-2.25 text-sm text-fg-2 before:size-1.5 before:shrink-0 before:translate-y-px before:rotate-45 before:bg-accent before:content-['']"
            >
              {it}
            </li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}
