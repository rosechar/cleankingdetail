import { site } from '@/data/site';

export default function Strip() {
  return (
    <div className="hidden items-center justify-between gap-4 border-b border-line px-page py-2.75 font-mono text-xs tracking-label text-fg-3 uppercase md:flex">
      <span>
        <span className="text-accent">●</span> {site.city}, {site.region}
      </span>
      <span>Hand-detailed · Family owned · Details from $35</span>
    </div>
  );
}
