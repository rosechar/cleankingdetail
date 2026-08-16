import Image from 'next/image';
import Button from '@/components/ui/Button';
import Eyebrow from '@/components/ui/Eyebrow';
import { RISE, riseDelay } from '@/components/ui/rise';

export const metadata = {
  title: 'Page Not Found | Clean King Detailing',
};

export default function NotFound() {
  return (
    <section className="flex min-h-160 items-center justify-center px-page py-15 text-center md:py-22.5 lg:py-30">
      <div className="max-w-xl">
        <Image
          className="mx-auto mb-7 block"
          src="/cleanking-mark.png"
          alt="Clean King Detailing"
          width={84}
          height={84}
          priority
        />
        <Eyebrow className={RISE} style={riseDelay(0)}>
          Error 404
        </Eyebrow>
        <h1
          className={`mt-3.5 font-display text-display-2xl uppercase ${RISE}`}
          style={riseDelay(1)}
        >
          Page not found
        </h1>
        <p
          className={`mx-auto mt-4.5 max-w-105 text-base leading-relaxed text-fg-2 ${RISE}`}
          style={riseDelay(2)}
        >
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
          Let&apos;s get you back on the road.
        </p>
        <div
          className={`mt-8 flex flex-wrap justify-center gap-3.25 ${RISE}`}
          style={riseDelay(3)}
        >
          <Button variant="accent" href="/">
            Back to home
          </Button>
          <Button variant="ghost" href="/services">
            View services
          </Button>
        </div>
      </div>
    </section>
  );
}
