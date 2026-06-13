import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Page Not Found | Clean King Detailing',
};

export default function NotFound() {
  return (
    <section className="nf">
      <div className="nf-inner">
        <Image
          className="nf-logo"
          src="/cleanking.svg"
          alt="Clean King Detailing"
          width={84}
          height={84}
          priority
        />
        <div className="ck-eyebrow">Error 404</div>
        <h1>Page not found</h1>
        <p>
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back on the road.
        </p>
        <div className="nf-cta">
          <Link className="ck-btn ck-btn-accent" href="/">
            Back to home
          </Link>
          <Link className="ck-btn ck-btn-ghost" href="/services">
            View services
          </Link>
        </div>
      </div>
    </section>
  );
}
