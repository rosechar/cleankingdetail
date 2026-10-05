// Builds public/shop-map.webp — the static "find us" map behind <MapEmbed>.
//
// Renders OpenFreeMap's vector "liberty" style with MapLibre in headless
// Chrome at 2x pixel density, so roads and labels stay sharp on retina
// screens (OSM's raster tiles only come at 1x). The map is centred exactly on
// the shop, so the pin <MapEmbed> draws at the pane's centre lands on the
// building however the pane crops it (object-cover keeps the centre). The
// site's `filter-map` utility turns the light style dark. No API key, billing
// or runtime request; <MapEmbed> shows the required data credit.
//
// Only re-run if the shop moves or the framing needs changing. Needs Chrome
// installed; puppeteer-core is deliberately not a project dependency:
//   npm i --no-save puppeteer-core && node scripts/build-map.mjs

import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// Keep in sync with site.geo in src/data/site.js.
const CENTER = { lat: 41.836244, lng: -83.876009 };
// MapLibre zoom (512px tiles), ~one level closer than the same raster zoom.
const ZOOM = 15.75;
// CSS pixels; the image is twice this. Wider/taller than any pane it fills.
const WIDTH = 1400;
const HEIGHT = 900;
const CHROME =
  process.env.CHROME_PATH ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = fileURLToPath(new URL('../public/shop-map.webp', import.meta.url));

const { default: puppeteer } = await import('puppeteer-core').catch(() => {
  throw new Error('Run `npm i --no-save puppeteer-core` first.');
});

const profile = mkdtempSync(join(tmpdir(), 'build-map-'));
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  userDataDir: profile,
  // Software WebGL so it renders without a GPU.
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
try {
  const page = await browser.newPage();
  await page.setViewport({
    width: WIDTH,
    height: HEIGHT,
    deviceScaleFactor: 2,
  });
  await page.setContent(
    `<!doctype html><html><head>
<script src="https://unpkg.com/maplibre-gl@5/dist/maplibre-gl.js"></script>
<style>html,body,#m{margin:0;width:${WIDTH}px;height:${HEIGHT}px}</style>
</head><body><div id="m"></div><script>
const map = new maplibregl.Map({
  container: 'm',
  style: 'https://tiles.openfreemap.org/styles/liberty',
  center: [${CENTER.lng}, ${CENTER.lat}],
  zoom: ${ZOOM},
  attributionControl: false,
  interactive: false,
  fadeDuration: 0,
  canvasContextAttributes: { preserveDrawingBuffer: true },
});
map.once('idle', () => { window.mapReady = true; });
</script></body></html>`,
    { waitUntil: 'load' }
  );
  // 'idle' fires once every visible tile, label and icon has rendered.
  await page.waitForFunction('window.mapReady === true', { timeout: 60_000 });
  const png = await page.screenshot({ type: 'png' });
  await sharp(png).webp({ quality: 82 }).toFile(OUT);
  console.log(`Wrote ${OUT} (${WIDTH * 2}×${HEIGHT * 2}, zoom ${ZOOM})`);
} finally {
  await browser.close();
  rmSync(profile, { recursive: true, force: true });
}
