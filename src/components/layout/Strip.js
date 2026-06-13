import { site } from '@/data/site';

export default function Strip() {
  return (
    <div className="garage-strip">
      <span>
        <span className="accent">●</span> Now booking ·{' '}
        {site.address2.split(',')[0]}, MI
      </span>
      <span>Hand-detailed · Family owned · Details from $35</span>
    </div>
  );
}
