import Eyebrow from './Eyebrow';
import { cn } from './cn';

/**
 * Full-width closing call-to-action band. Children are the buttons — shown
 * from md up only; on phones the sticky bottom bar already carries Call/Book.
 */
export default function CtaBand({ eyebrow, title, className, children }) {
  return (
    <section
      className={cn(
        'border-t border-line px-page py-12 text-center md:py-14 lg:py-20',
        className
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-4 font-display text-display-3xl uppercase">{title}</h2>
      <div className="mt-8.5 hidden flex-wrap justify-center gap-3.5 md:flex">
        {children}
      </div>
    </section>
  );
}
