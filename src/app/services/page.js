import Link from 'next/link';
import { site, packages } from '@/data/site';
import { GCheck } from '@/components/garage/Icons';
import IncludesToggle from '@/components/garage/IncludesToggle';

export const metadata = {
  title: 'Car Detailing Services & Pricing | Clean King — Blissfield, MI',
  description:
    'Professional car wash and detailing services from $35-$160. Interior detail, exterior detail, full detail, window tinting. Serving Blissfield, Adrian, Tecumseh, and Lenawee County.',
  keywords:
    'car detailing services Blissfield MI, car wash pricing, interior detail, exterior detail, full detail, deluxe detail, window tinting services, auto detailing packages',
  openGraph: {
    title: 'Car Detailing Services & Pricing | Clean King — Blissfield, MI',
    description:
      'View our complete range of car wash, detailing, and window tinting services with transparent pricing from $35-$160.',
    url: 'https://www.cleankingdetail.com/services',
  },
  alternates: {
    canonical: 'https://www.cleankingdetail.com/services',
  },
};

export default function Services() {
  return (
    <>
      <section className="gp-hero">
        <div className="inner">
          <div className="crumbs">
            <Link href="/">Home</Link> / Services
          </div>
          <div className="ck-eyebrow">Services &amp; Pricing</div>
          <h1>
            Detailing,
            <br />
            done by hand
          </h1>
          <p className="lead">
            Five straightforward packages — plus à la carte work, ceramic tint
            and paint protection. Every job is done by hand in Blissfield, and
            prices are flat and honest.
          </p>
        </div>
      </section>

      <section className="svc" id="packages">
        <div className="svc-inner">
          {packages.map((s) => (
            <div
              className={'svc-pkg' + (s.popular ? ' pop' : '')}
              key={s.name}
              id={s.id}
            >
              <div className="left">
                <h3>
                  {s.name}
                  {s.popular && <span className="pop-badge">Most popular</span>}
                </h3>
                <p className="d">{s.blurb}</p>
                <ul>
                  {(s.details || s.items).map((it) => (
                    <li key={it}>
                      <GCheck /> {it}
                    </li>
                  ))}
                </ul>
                {s.includes && (
                  <IncludesToggle text={s.includesText} items={s.includes} />
                )}
              </div>
              <div className="right">
                <div className="price">{s.price}</div>
                <Link
                  className="ck-btn ck-btn-accent"
                  href={`/appointment?pkg=${s.id}`}
                >
                  Book this
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="svc-extra" id="addons">
        <div className="inner">
          <div className="garage-sh">
            <div>
              <div className="ck-eyebrow">More options</div>
              <h2>À la carte &amp; add-ons</h2>
            </div>
            <p>
              Need just one thing, or want to protect your finish? Add any of
              these to a detail or book them on their own.
            </p>
          </div>
          <div className="xgrid">
            <div className="xcard">
              <div className="tag">À la carte</div>
              <h4>Single Services</h4>
              <div className="price">{site.alacarte.price}</div>
              <p>
                Pick exactly what your car needs — no full package required.
              </p>
              <ul>
                {site.alacarte.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
            {site.addons.map((a) => (
              <div className="xcard" key={a.name}>
                <div className="tag">Add-on</div>
                <h4>{a.name}</h4>
                <div className="price">Quote</div>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
          <p className="note">
            Not sure what you need?{' '}
            <Link href="/contact">Ask us for a recommendation →</Link>
          </p>
        </div>
      </section>

      <section className="garage-cta">
        <div className="ck-eyebrow">Gift certificates available</div>
        <h2>
          Ready to book
          <br />
          your detail?
        </h2>
        <div className="row">
          <Link className="ck-btn ck-btn-accent" href="/appointment">
            Schedule Appointment
          </Link>
          <a className="ck-btn ck-btn-ghost" href={site.phoneHref}>
            {site.phone}
          </a>
        </div>
      </section>
    </>
  );
}
