import Link from 'next/link';
import { site, packages } from '@/data/site';
import { GArrow } from '@/components/garage/Icons';
import MapEmbed from '@/components/garage/MapEmbed';

export const metadata = {
  title: 'Car Detailing in Tecumseh, MI | Clean King Detailing',
  description:
    'Professional car detailing & window tinting near Tecumseh, MI from $35–$160. Hand wash, interior deep clean, clay bar, ceramic tint — detailed by hand. A short drive south. Call (517) 682-1919.',
  keywords:
    'car detailing Tecumseh MI, car wash Tecumseh Michigan, auto detailing Tecumseh, window tinting Tecumseh MI, interior detailing Tecumseh, ceramic tint Tecumseh, headlight restoration Tecumseh, best car detailing near Tecumseh',
  openGraph: {
    title: 'Car Detailing in Tecumseh, MI | Clean King Detailing',
    description:
      'Hand car wash, auto detailing & ceramic window tinting for Tecumseh, MI drivers. Flat pricing from $35–$160.',
    url: 'https://www.cleankingdetail.com/car-detailing-tecumseh-mi',
  },
  alternates: {
    canonical: 'https://www.cleankingdetail.com/car-detailing-tecumseh-mi',
  },
};

const detailedServices = [
  {
    name: 'Hand Car Wash',
    desc: 'A careful two-bucket hand wash and foam bath that lifts road film and salt without swirling your paint — gentler than the automatic tunnels around town.',
  },
  {
    name: 'Interior Deep Clean',
    desc: 'Vacuum, shampoo and steam for seats, carpets and mats, clearing out the mud and salt that pile up over a Lenawee County winter.',
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
    desc: 'Professional ceramic film that cuts heat, glare and 99% of UV — a real difference on open M-50 drives and bright winter mornings.',
  },
  {
    name: 'Headlight Restoration',
    desc: 'Sand, polish and seal foggy, yellowed headlights back to clear for safer night driving and a fresher-looking front end.',
  },
];

const whyUs = [
  {
    name: 'Minutes Down US-223',
    desc: 'Family-owned in Blissfield, a short drive south of Tecumseh. Drop the car off, run your errands, pick it up looking new.',
  },
  {
    name: 'One Flat Price',
    desc: '$35 to $160, posted up front. No upsells and no "while we had it open" surprises when you come back.',
  },
  {
    name: 'Detailed By Hand',
    desc: "Every car is finished by hand, never run through a tunnel. It's the difference our Tecumseh repeat customers keep coming back for.",
  },
];

export default function CarDetailingTecumsehMI() {
  return (
    <>
      <section className="gp-hero">
        <div className="inner">
          <div className="crumbs">
            <Link href="/">Home</Link> / Car Detailing Tecumseh, MI
          </div>
          <div className="ck-eyebrow">Tecumseh, Michigan</div>
          <h1>
            Car detailing
            <br />
            in Tecumseh, MI
          </h1>
          <p className="lead">
            Hand car wash, full auto detailing and ceramic window tinting from
            $35–$160. Clean King is family-owned in Blissfield — a short drive
            south of Tecumseh — and every vehicle is detailed by hand.
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
            <div className="ck-eyebrow">Serving Tecumseh & Lenawee</div>
            <h2>An easy drive from Tecumseh</h2>
            <p>
              We&apos;re based in Blissfield, just south of Tecumseh down US-223
              — close enough to be your regular detailer, far enough from the
              automatic washes to do the job right. Tecumseh drivers come to
              Clean King for hand washing, interior detailing and ceramic tint
              that&apos;s built for Michigan roads and weather.
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
                <div className="k">From Tecumseh</div>
                <div className="v">About 30 minutes via US-223</div>
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
            Flat, honest packages for Tecumseh vehicle owners.{' '}
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
              <h2>What we do for Tecumseh drivers</h2>
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
              <h2>Why Tecumseh drivers make the trip</h2>
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
          Serving Tecumseh · Adrian · Blissfield · Lenawee County
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
