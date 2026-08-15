import Eyebrow from './Eyebrow';

/** Sub-page hero band: eyebrow, display h1, lead paragraph, optional CTA row (children). */
export default function PageHero({ eyebrow, title, lead, children }) {
  return (
    <section className="relative border-b border-line px-page pt-6.5 pb-8.5 md:pt-9 md:pb-11 lg:pt-12 lg:pb-13.5">
      <div className="mx-auto max-w-7xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="mt-4 font-display text-display-3xl uppercase">
          {title}
        </h1>
        {lead && <p className="mt-5.5 max-w-2xl text-lead text-fg-2">{lead}</p>}
        {children && (
          <div className="mt-8.5 flex flex-wrap gap-3.25">{children}</div>
        )}
      </div>
    </section>
  );
}
