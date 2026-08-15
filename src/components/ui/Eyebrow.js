import { cn } from './cn';

/** Small mono uppercase label that introduces a heading. Accent red by default. */
export default function Eyebrow({
  as: Tag = 'div',
  muted = false,
  className,
  children,
  ...rest
}) {
  return (
    <Tag
      className={cn(
        'font-mono text-sm font-medium tracking-eyebrow uppercase',
        muted ? 'text-fg-3' : 'text-accent',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
