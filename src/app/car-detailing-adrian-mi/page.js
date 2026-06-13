import Link from 'next/link';
import { site, packages } from '@/data/site';
import { GArrow } from '@/components/garage/Icons';

export const metadata = {
  title: 'Car Detailing in Adrian, MI | Clean King Detailing',
  description:
    'Professional car detailing in Adrian, MI from $35-$160. Interior/exterior detailing, clay bar, wax, buff, window tinting. Serving Adrian, Lenawee County. Call (517) 682-1919.',
  keywords:
    'car detailing Adrian MI, car wash Adrian Michigan, auto detailing Adrian, window tinting Adrian MI, clay bar Adrian, car wax Adrian, car buff Adrian, mobile car wash Adrian, best car detailing Adrian',
  openGraph: {
    title: 'Car Detailing in Adrian, MI | Clean King Detailing',
    description:
      'Professional car wash, detailing & window tinting in Adrian, MI. Clay bar, wax, buff services from $35-$160.',
    url: 'https://www.cleankingdetail.com/car-detailing-adrian-mi',
  },
  alternates: {
    canonical: 'https://www.cleankingdetail.com/car-detailing-adrian-mi',
  },
};

const detailedServices = [
  {
    name: 'Professional Car Wash',
    desc: "Hand wash and foam treatment to safely clean your vehicle's exterior, removing dirt, grime, and road salt common on Adrian area roads.",
  },
  {
    name: 'Clay Bar Treatment',
    desc: "Remove embedded contaminants from your paint surface that regular washing can't eliminate, leaving your car's paint smooth and ready for wax protection.",
  },
  {
    name: 'Wax & Buff Services',
    desc: "Professional waxing and buffing to protect your paint from Michigan's harsh weather conditions while restoring that showroom shine.",
  },
  {
    name: 'Interior Detailing',
    desc: 'Deep cleaning of seats, carpets, dashboard, and all interior surfaces. Perfect for removing winter salt stains and keeping your Adrian vehicle fresh.',
  },
  {
    name: 'Window Tinting',
    desc: "Professional ceramic window tint installation to reduce heat, glare, and UV rays. Especially beneficial for Adrian's sunny summer days and winter glare.",
  },
  {
    name: 'Engine Bay Cleaning',
    desc: "Thorough cleaning and degreasing of your engine bay, helping maintain your vehicle's performance and resale value.",
  },
];

const whyUs = [
  {
    name: 'Local Expertise',
    desc: 'Family-owned in Blissfield, just minutes from Adrian. We know what Michigan roads and winters do to your vehicle.',
  },
  {
    name: 'Transparent Pricing',
    desc: 'Flat, honest pricing from $35 to $160 — no surprises, no upsells. You know the cost before we start.',
  },
  {
    name: '5-Star Service',
    desc: 'Every vehicle detailed by hand with the care that earns repeat customers across Lenawee County.',
  },
];

export default function CarDetailingAdrianMI() {
  return (
    <>
      <section className="gp-hero">
        <div className="inner">
          <div className="crumbs">
            <Link href="/">Home</Link> / Car Detailing Adrian, MI
          </div>
          <div className="ck-eyebrow">Adrian, Michigan</div>
          <h1>
            Car detailing
            <br />
            in Adrian, MI
          </h1>
          <p className="lead">
            Expert auto wash, detailing & window tinting services from $35–$160.
            Clean King proudly serves Adrian, Tecumseh and the wider Lenawee
            County area — every vehicle detailed by hand.
          </p>
          <div
            className="cta"
            style={{
              display: 'flex',
              gap: 13,
              marginTop: 34,
              flexWrap: 'wrap',
            }}
          >
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
            <div className="ck-eyebrow">Serving Adrian & Lenawee</div>
            <h2>Adrian, Tecumseh, Lenawee &amp; surrounding areas</h2>
            <p>
              Clean King Detailing proudly serves Adrian, Michigan and the
              entire Lenawee County area. Located just minutes away in
              Blissfield, we bring professional car wash, auto detailing, and
              window tinting services to Adrian, Tecumseh, and Lenawee County
              residents and businesses.
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
                <div className="k">From Adrian</div>
                <div className="v">Just 15 minutes via US-223</div>
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
            <iframe
              src={site.mapEmbed}
              title="Map to Clean King Detailing, 610 W Adrian St, Blissfield MI"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
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
            Professional auto care tailored for Adrian vehicle owners.{' '}
            <Link href="/services" style={{ color: 'var(--accent)' }}>
              See full details →
            </Link>
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
              <Link className="cbook" href="/appointment">
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
              <h2>Comprehensive auto care in Adrian</h2>
            </div>
            <p>
              From hand washes to ceramic tint — everything your Adrian vehicle
              needs in one shop.
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
              <h2>Why Adrian drivers choose us</h2>
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
        <div className="ck-eyebrow" style={{ color: 'var(--accent)' }}>
          Serving Adrian · Blissfield · Tecumseh · Monroe · Lenawee County
        </div>
        <h2 style={{ marginTop: 16 }}>
          Ready to detail
          <br />
          your vehicle in Adrian?
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
