import { cn } from './cn';

/**
 * Package line items with the accent square marker. `columns` splits the list
 * in two from md; pass e.g. `className="sm:grid-cols-2"` to split earlier.
 */
export default function ItemList({ items, columns = false, className }) {
  return (
    <ul
      className={cn(
        columns ? 'grid grid-cols-1 gap-x-6 md:grid-cols-2' : 'flex flex-col',
        className
      )}
    >
      {items.map((it) => (
        <li
          key={it}
          className="flex items-baseline gap-2.5 py-1.75 text-sm leading-[1.45] text-fg-2 sm:text-base"
        >
          <span
            className="flex-none text-[10px] text-accent"
            aria-hidden="true"
          >
            ■
          </span>
          <span className="flex-1">{it}</span>
        </li>
      ))}
    </ul>
  );
}
