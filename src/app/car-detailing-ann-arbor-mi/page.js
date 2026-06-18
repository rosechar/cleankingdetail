import Link from 'next/link';
import { site, packages } from '@/data/site';
import { GArrow } from '@/components/garage/Icons';
import MapEmbed from '@/components/garage/MapEmbed';
import { locationSchema } from '@/data/locationSchema';

export const metadata = {
  title: 'Car Detailing near Ann Arbor, MI | Clean King Detailing',
  description:
    'Professional car detailing & window tinting for Ann Arbor, MI drivers from $35–$160. Hand wash, interior deep clean, clay bar, ceramic tint — detailed by hand. A straight shot down US-23. Call (517) 682-1919.',
  keywords:
    'car detailing Ann Arbor MI, car wash Ann Arbor Michigan, auto detailing Ann Arbor, window tinting Ann Arbor MI, interior detailing Ann Arbor, ceramic tint Ann Arbor, headlight restoration Ann Arbor, best car detailing near Ann Arbor, car detailing near University of Michigan, U-M student car detailing, car detailing Washtenaw County',
  openGraph: {
    title: 'Car Detailing near Ann Arbor, MI | Clean King Detailing',
    description:
      'Hand car wash, auto detailing & ceramic window tinting for Ann Arbor, MI drivers. Flat pricing from $35–$160.',
    url: 'https://www.cleankingdetail.com/car-detailing-ann-arbor-mi',
  },
  alternates: {
    canonical: 'https://www.cleankingdetail.com/car-detailing-ann-arbor-mi',
  },
};

const detailedServices = [
  {
    name: 'Hand Car Wash',
    desc: 'A careful two-bucket hand wash and foam bath that lifts road film and salt without swirling your paint — gentler than the automatic tunnels around town.',
  },
  {
    name: 'Interior Deep Clean',
    desc: 'Vacuum, shampoo and steam for seats, carpets and mats, clearing out the mud and salt that pile up over a Michigan winter.',
  },
  {
    name: 'Clay Bar & Decontamination',
    desc: 'Pulls bonded contaminants and rail dust out of the clear coat so wax and sealant actually grip — the step most quick washes skip.',
  },
  {
    name: 'Hand Wax & Paint Sealant',
    desc: 'A hand-applied wax or sealant that stands up to Michigan sun, rain and winter road brine, locking in a deep gloss for months.',
  },
  {
    name: 'Ceramic Window Tint',
    desc: 'Professional ceramic film that cuts heat, glare and 99% of UV — a real difference on open US-23 drives and bright winter mornings.',
  },
  {
    name: 'Headlight Restoration',
    desc: 'Sand, polish and seal foggy, yellowed headlights back to clear for safer night driving and a fresher-looking front end.',
  },
];

const whyUs = [
  {
    name: 'A Straight Shot Down US-23',
    desc: 'Family-owned in Blissfield, an easy drive south of Ann Arbor. Drop the car off, run your errands, pick it up looking new.',
  },
  {
    name: 'One Flat Price',
    desc: '$35 to $160, posted up front. No upsells and no "while we had it open" surprises when you come back.',
  },
  {
    name: 'Detailed By Hand',
    desc: "Every car is finished by hand, never run through a tunnel. It's the difference that makes the drive from Ann Arbor worth it.",
  },
];

const locationLd = locationSchema({
  areaType: 'City',
  areaName: 'Ann Arbor',
  slug: 'car-detailing-ann-arbor-mi',
  description: metadata.description,
});

export default function CarDetailingAnnArborMI() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationLd) }}
      />
      <section className="gp-hero">
        <div className="inner">
          <div className="crumbs">
            <Link href="/">Home</Link> / Car Detailing Ann Arbor, MI
          </div>
          <div className="ck-eyebrow">Ann Arbor, Michigan</div>
          <h1>
            Car detailing
            <br />
            near Ann Arbor, MI
          </h1>
          <p className="lead">
            Hand car wash, full auto detailing and ceramic window tinting from
            $35–$160. Clean King is family-owned in Blissfield — a straight shot
            south of Ann Arbor down US-23 — and every vehicle is detailed by
            hand.
          </p>
          <div className="cta">
            <Link className="ck-btn ck-btn-accent" href="/appointment">
              Book Appointment
            </Link>
            <a className="ck-btn ck-btn-ghost" href={site.phoneHref}>
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      {/* location */}
      <section className="garage-loc">
        <div className="inner">
          <div className="pane">
            <div className="ck-eyebrow">Serving Ann Arbor & Washtenaw</div>
            <h2>An easy drive from Ann Arbor</h2>
            <p>
              We&apos;re based in Blissfield, a straight shot south of Ann Arbor
              down US-23 — close enough to be your regular detailer, far enough
              from the automatic washes to do the job right. Ann Arbor drivers —
              from University of Michigan students prepping a car for an
              end-of-lease return or move-out to families across Washtenaw
              County — come to Clean King for hand washing, interior detailing
              and ceramic tint that&apos;s built for Michigan roads and weather.
            </p>
            <div className="info">
              <div>
                <div className="k">Shop</div>
                <div className="v">
                  {site.address1}, {site.address2}
                </div>
              </div>
              <div>
                <div className="k">Phone</div>
                <div className="v">{site.phone}</div>
              </div>
              <div>
                <div className="k">From Ann Arbor</div>
                <div className="v">About 45 minutes via US-23</div>
              </div>
            </div>
            <Link
              className="ck-btn ck-btn-ghost"
              href="/contact"
              style={{ marginTop: 28 }}
            >
              Contact &amp; directions
            </Link>
          </div>
          <div className="pane map">
            <MapEmbed />
          </div>
        </div>
      </section>

      {/* packages */}
      <section className="garage-services">
        <div className="garage-sh">
          <div>
            <div className="ck-eyebrow">Services &amp; Pricing</div>
            <h2>
              Detailing
              <br />
              packages
            </h2>
          </div>
          <p>
            Flat, honest packages for Ann Arbor vehicle owners.{' '}
            <Link href="/services">See full details →</Link>
          </p>
        </div>
        <div className="garage-grid">
          {packages.map((s) => (
            <div
              className={'garage-card' + (s.popular ? ' pop' : '')}
              key={s.name}
            >
              {s.popular && <span className="poptag">Most popular</span>}
              <div className="ci">
                <span className="cname">{s.name}</span>
                <span className="cprice">{s.price}</span>
              </div>
              <p className="cdesc">{s.blurb}</p>
              <ul>
                {s.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
              <Link className="cbook" href={`/appointment?pkg=${s.id}`}>
                Book this <GArrow />
              </Link>
            </div>
          ))}
          <div
            className="garage-card"
            style={{ justifyContent: 'center', background: 'var(--surface-2)' }}
          >
            <div className="ck-eyebrow" style={{ color: 'var(--accent)' }}>
              Add-ons
            </div>
            <div className="cname" style={{ marginTop: 14 }}>
              Tint &amp; Protect
            </div>
            <p className="cdesc">
              Ceramic window tint and paint protection available with any
              detail. Ask for a quote.
            </p>
            <Link className="cbook" href="/contact">
              Get a quote <GArrow />
            </Link>
          </div>
        </div>
      </section>

      {/* comprehensive services */}
      <section className="svc-extra">
        <div className="inner">
          <div className="garage-sh">
            <div>
              <div className="ck-eyebrow">Full service list</div>
              <h2>What we do for Ann Arbor drivers</h2>
            </div>
            <p>
              From a careful hand wash to ceramic tint — the work that keeps a
              vehicle looking and lasting better.
            </p>
          </div>
          <div className="xgrid">
            {detailedServices.map((s) => (
              <div className="xcard" key={s.name}>
                <div className="tag">Service</div>
                <h4>{s.name}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* why us */}
      <section className="svc-extra" style={{ borderTop: 'none' }}>
        <div className="inner">
          <div className="garage-sh">
            <div>
              <div className="ck-eyebrow">Why Clean King</div>
              <h2>Why Ann Arbor drivers make the trip</h2>
            </div>
            <p>Local, honest, and detailed by hand — the way it should be.</p>
          </div>
          <div className="xgrid">
            {whyUs.map((s) => (
              <div className="xcard" key={s.name}>
                <div className="tag">Clean King</div>
                <h4>{s.name}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="garage-cta">
        <div className="ck-eyebrow">
          Serving Ann Arbor · Saline · Tecumseh · Blissfield
        </div>
        <h2>
          Ready to detail
          <br />
          your vehicle?
        </h2>
        <div className="row">
          <Link className="ck-btn ck-btn-accent" href="/appointment">
            Schedule Online
          </Link>
          <a className="ck-btn ck-btn-ghost" href={site.phoneHref}>
            {site.phone}
          </a>
        </div>
      </section>
    </>
  );
}
