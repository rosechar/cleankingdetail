import Eyebrow from './Eyebrow';

/** Full-width closing call-to-action band. Children are the buttons. */
export default function CtaBand({ eyebrow, title, children }) {
  return (
    <section className="border-t border-line px-page py-12 text-center md:py-14 lg:py-20">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 font-display text-display-3xl uppercase">{title}</h2>
      <div className="mt-8.5 flex flex-wrap justify-center gap-3.5">
        {children}
      </div>
    </section>
  );
}
