import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/data/site';

export default function Footer() {
  return (
    <footer className="garage-foot">
      <div className="l">
        <Image
          src="/cleanking-mark.png"
          alt=""
          width={40}
          height={40}
          aria-hidden="true"
        />
        <div>
          <div className="wm">Clean King Detailing</div>
          <div className="meta">
            {site.address1} · {site.address2}
          </div>
        </div>
      </div>

      <nav className="foot-nav">
        <div className="fn-row">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <Link href="/appointment">Book</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="fn-row">
          <Link href="/car-detailing-adrian-mi">Adrian</Link>
          <Link href="/car-detailing-tecumseh-mi">Tecumseh</Link>
          <Link href="/car-detailing-ann-arbor-mi">Ann Arbor</Link>
          <Link href="/car-detailing-lenawee-county">Lenawee County</Link>
        </div>
      </nav>

      <div className="soc">
        <a href={site.facebook} target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a href={site.google} target="_blank" rel="noopener noreferrer">
          Google
        </a>
        <a href={site.phoneHref}>{site.phone}</a>
      </div>
    </footer>
  );
}
