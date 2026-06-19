import Link from 'next/link';
import Image from 'next/image';
import { site, packages } from '@/data/site';
import { GArrow, GStar } from '@/components/garage/Icons';
import ReviewsCarousel from '@/components/garage/ReviewsCarousel';
import Gallery from '@/components/garage/Gallery';
import MapEmbed from '@/components/garage/MapEmbed';

const Home = () => {
  return (
    <>
      {/* hero */}
      <section className="garage-hero" id="top">
        <div className="htext">
          <div className="ck-eyebrow">Showroom-grade auto detailing</div>
          <h1>
            The King
            <br />
            <span className="o">of</span> Clean
          </h1>
          <p className="sub">
            Book online, detailed by hand, finished like new.
          </p>
          <div className="cta">
            <Link className="ck-btn ck-btn-accent" href="/appointment">
              Book Appointment
            </Link>
            <a className="ck-btn ck-btn-ghost" href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
          <a
            className="hrating"
            href={site.google}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Rated ${site.rating.score} out of 5${
              site.rating.count ? ` from ${site.rating.count} reviews` : ''
            } on Google — read our reviews`}
          >
            <span className="ck-stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((s) => (
                <GStar key={s} />
              ))}
            </span>
            <span className="ht" aria-hidden="true">
              <b>{site.rating.score}</b> on Google
              {site.rating.count ? ` · ${site.rating.count} reviews` : ''}
            </span>
          </a>
          <div className="hstats">
            <div>
              <div className="n">
                <span className="u">$</span>35
              </div>
              <div className="l">Starting price</div>
            </div>
            <div>
              <div className="n">5</div>
              <div className="l">Detail packages</div>
            </div>
            <div>
              <div className="n">
                100<span className="u">%</span>
              </div>
              <div className="l">Hand detailed</div>
            </div>
          </div>
        </div>
        <div className="himg">
          <Image
            src="/tire.webp"
            alt="Freshly detailed wheel and tire"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
          {/* mobile-only: CTA overlaid on the center of the image */}
          <div className="himg-cta">
            <Link className="ck-btn ck-btn-accent" href="/appointment">
              Book Appointment
            </Link>
            <a className="ck-btn ck-btn-ghost" href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
          <span className="badge">Deluxe Detail · Wheels &amp; Tires</span>
        </div>
      </section>

      {/* marquee */}
      <div className="garage-marq" aria-hidden="true">
        <div className="track">
          {[0, 1].map((k) => (
            <span key={k}>
              Spiffy Detail <i></i> Interior Detail <i></i> Full Detail <i></i>{' '}
              Deluxe Detail <i></i> Ceramic Tint <i></i> Paint Protection{' '}
              <i></i>
            </span>
          ))}
        </div>
      </div>

      {/* review — social proof before pricing */}
      <ReviewsCarousel />

      {/* services preview */}
      <section className="garage-services" id="services">
        <div className="garage-sh">
          <div>
            <div className="ck-eyebrow">Services &amp; Pricing</div>
            <h2>
              Pick your
              <br />
              package
            </h2>
          </div>
          <p>
            Every package detailed by hand in Blissfield.
            <br />
            <Link href="/services">
              See full details &amp; what&apos;s included →
            </Link>
          </p>
        </div>
        <div className="garage-grid">
          {packages.map((s) => (
            <article
              className={'garage-card' + (s.popular ? ' pop' : '')}
              key={s.name}
            >
              {s.popular && <span className="poptag">Most popular</span>}
              <div className="ci">
                <span className="cname">{s.name}</span>
                <span className="cprice">{s.price}</span>
              </div>
              <p className="cdesc">{s.blurb}</p>
              <div className="cactions">
                <Link className="cbook" href={`/appointment?pkg=${s.id}`}>
                  Book this <GArrow />
                </Link>
                <Link className="cbook" href={`/services#${s.id}`}>
                  View details <GArrow />
                </Link>
              </div>
            </article>
          ))}
          <Link
            className="garage-card"
            style={{ justifyContent: 'center', background: 'var(--surface-2)' }}
            href="/contact"
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
            <span className="cbook">
              Get a quote <GArrow />
            </span>
          </Link>
        </div>
      </section>

      {/* our work */}
      <Gallery />

      {/* location */}
      <section className="garage-loc" id="location">
        <div className="inner">
          <div className="pane">
            <div className="ck-eyebrow">Find us</div>
            <h2>Blissfield &amp; Lenawee County</h2>
            <p>
              Family-owned and rooted in Blissfield — bringing expert detailing
              to Adrian, Tecumseh, Monroe and the wider Lenawee County area.
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
                <div className="k">Proudly serving</div>
                <div className="chips">
                  {site.areas.map((a) => (
                    <span key={a}>{a}</span>
                  ))}
                </div>
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

      {/* cta */}
      <section className="garage-cta">
        <div className="ck-eyebrow">Gift certificates available</div>
        <h2>
          Ready to make
          <br />
          your car shine?
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
};

export default Home;
