import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { site, PRICE_BOUNDS } from '@/data/site';

// Social share card (og:image / twitter:image). Rendered once at build time
// and served as a static PNG for every route (pages don't override it).
export const alt = `${site.name} — Car Detailing & Window Tinting in ${site.city}, ${site.region}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/cleanking.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '72px 84px',
          background: '#0d0d0f',
          color: '#f4f4f5',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxWidth: 720,
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#d8352e',
              fontWeight: 700,
            }}
          >
            {`${site.city}, ${site.region} · Family-owned · Detailed by hand`}
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 84,
              lineHeight: 1,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: -2,
            }}
          >
            Car Detailing &amp; Window Tinting
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 30,
              color: '#b9b9c0',
              lineHeight: 1.35,
            }}
          >
            {`Hand-detailed packages from $${PRICE_BOUNDS[0]}. Serving Adrian, Tecumseh & Lenawee County.`}
          </div>
          <div
            style={{
              marginTop: 40,
              fontSize: 28,
              color: '#f4f4f5',
              fontWeight: 700,
            }}
          >
            {`${site.phone} · cleankingdetail.com`}
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={300}
          height={300}
          style={{ width: 300, height: 300 }}
        />
      </div>
    ),
    size
  );
}
