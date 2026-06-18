import Link from 'next/link';
import { site, packages } from '@/data/site';
import { GArrow } from '@/components/garage/Icons';
import MapEmbed from '@/components/garage/MapEmbed';
import { locationSchema } from '@/data/locationSchema';

export const metadata = {
  title: 'Car Detailing in Lenawee County, MI | Clean King Detailing',
  description:
    'Auto detailing, hand car wash & window tinting across Lenawee County, MI from $35–$160. Serving Adrian, Tecumseh, Blissfield, Hudson, Morenci, Clinton and beyond — detailed by hand. Call (517) 682-1919.',
  keywords:
    'car detailing Lenawee County, auto detailing Lenawee County MI, car wash Lenawee County, window tinting Lenawee County, mobile detailing Lenawee, detailing Hudson MI, detailing Morenci MI, detailing Clinton MI, detailing Onsted MI',
  openGraph: {
    title: 'Car Detailing in Lenawee County, MI | Clean King Detailing',
    description:
      'Hand car wash, full detailing and ceramic window tinting across Lenawee County, MI. Flat pricing from $35–$160.',
    url: 'https://www.cleankingdetail.com/car-detailing-lenawee-county',
  },
  alternates: {
    canonical: 'https://www.cleankingdetail.com/car-detailing-lenawee-county',
  },
};

const detailedServices = [
  {
    name: 'Exterior Hand Wash',
    desc: 'Hand wash and foam bath that strips the gravel dust, farm-road grime and winter salt that coat vehicles all over rural Lenawee.',
  },
  {
    name: 'Full Interior Detail',
    desc: 'Deep vacuum, shampoo and conditioning for work trucks and family cars alike — built for boots, kids and county-road mud.',
  },
  {
    name: 'Paint Clay & Polish',
    desc: 'Clay decontamination and light polishing to pull embedded grit out of the finish and bring back depth a basic wash never can.',
  },
  {
    name: 'Wax & Paint Protection',
    desc: "Hand wax, sealant or ceramic protection to shield your paint through Lenawee's full range of weather — August sun to February brine.",
  },
  {
    name: 'Ceramic Window Tinting',
    desc: 'Heat- and UV-rejecting ceramic tint, professionally installed for comfort on long county and US-223 drives.',
  },
  {
    name: 'Engine Bay & Wheels',
    desc: 'Degrease the engine bay and deep-clean wheels, tires and barrels — the finishing details that protect resale value.',
  },
];

const whyUs = [
  {
    name: 'Central to the County',
    desc: "Based in Blissfield, we're an easy drive from Adrian, Tecumseh, Hudson, Morenci, Clinton, Onsted and everywhere between.",
  },
  {
    name: 'Honest, Flat Pricing',
    desc: '$35 to $160, the same for everyone and posted before we start. Small-town pricing without the runaround.',
  },
  {
    name: 'Hand-Detailed, Every Time',
    desc: 'No conveyor tunnels. Every vehicle is washed and detailed by hand — the standard that has earned us repeat customers countywide.',
  },
];

const locationLd = locationSchema({
  areaType: 'AdministrativeArea',
  areaName: 'Lenawee County',
  slug: 'car-detailing-lenawee-county',
  description: metadata.description,
});

export default function CarDetailingLenaweeCounty() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationLd) }}
      />
      <section className="gp-hero">
        <div className="inner">
          <div className="crumbs">
            <Link href="/">Home</Link> / Car Detailing Lenawee County
          </div>
          <div className="ck-eyebrow">Lenawee County, Michigan</div>
          <h1>
            Car detailing
            <br />
            across Lenawee County
          </h1>
          <p className="lead">
            Professional auto detailing, hand washing and window tinting from
            $35–$160, serving every corner of Lenawee County. Family-owned in
            Blissfield and detailed by hand — from Adrian and Tecumseh to
            Hudson, Morenci and Clinton.
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
            <div className="ck-eyebrow">Serving all of Lenawee</div>
            <h2>One shop for the whole county</h2>
            <p>
              Clean King Detailing is rooted in Blissfield, near the heart of
              Lenawee County. We detail cars, trucks and work vehicles for
              residents and businesses across the county — Adrian, Tecumseh,
              Hudson, Morenci, Clinton, Onsted, Britton, Deerfield and Sand
              Creek included. Rural roads, farm dust and Michigan winters are
              hard on a finish; we&apos;re the shop that does it by hand.
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
                <div className="k">Coverage</div>
                <div className="v">All of Lenawee County</div>
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
            The same flat pricing countywide.{' '}
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
              <h2>Built for Lenawee County roads</h2>
            </div>
            <p>
              From gravel-road dust to winter salt — everything your vehicle
              needs to look right and last longer.
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
              <h2>Why the county trusts us</h2>
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
          Adrian · Tecumseh · Blissfield · Hudson · Morenci · Clinton · Onsted
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
