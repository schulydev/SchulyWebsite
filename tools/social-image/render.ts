// Renders og.html (1200x630) with the installed Chrome or Edge and writes public/assets/og-image.png and .webp.
// Usage: bun tools/social-image/render.ts [--out <dir>] [--browser <path>]
import { existsSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dir, '../..');
const arg = (name: string) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
const outDir = resolve(arg('--out') ?? join(root, 'public/assets'));

const candidates = [
  arg('--browser'),
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/microsoft-edge',
];
const browser = candidates.find((p) => p && existsSync(p));
if (!browser) throw new Error('No Chrome or Edge found. Pass --browser <path> or set CHROME_PATH.');

// og.html loads /fonts/... and /assets/... from public/, so serve public/ with the template on top.
const template = join(import.meta.dir, 'og.html');
const server = Bun.serve({
  port: 0,
  async fetch(req) {
    const path = decodeURIComponent(new URL(req.url).pathname);
    if (path === '/og.html') return new Response(Bun.file(template), { headers: { 'content-type': 'text/html; charset=utf-8' } });
    const file = Bun.file(join(root, 'public', path));
    return (await file.exists()) ? new Response(file) : new Response('not found', { status: 404 });
  },
});

const tmp = mkdtempSync(join(tmpdir(), 'schuly-og-'));
const raw = join(tmp, 'og-raw.png');
try {
  const proc = Bun.spawn([browser, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1200,630', '--virtual-time-budget=5000', `--user-data-dir=${join(tmp, 'profile')}`, `--screenshot=${raw}`, `http://localhost:${server.port}/og.html`], { stdout: 'ignore', stderr: 'ignore' });
  await proc.exited;
  if (!existsSync(raw)) throw new Error(`${browser} did not write a screenshot`);

  const meta = await sharp(raw).metadata();
  if (meta.width !== 1200 || meta.height !== 630) throw new Error(`Expected 1200x630, got ${meta.width}x${meta.height}`);
  await sharp(raw).png({ palette: true, quality: 90, compressionLevel: 9, effort: 10 }).toFile(join(outDir, 'og-image.png'));
  await sharp(raw).webp({ quality: 82 }).toFile(join(outDir, 'og-image.webp'));
  console.log(`Wrote ${join(outDir, 'og-image.png')} and og-image.webp`);
} finally {
  server.stop(true);
  rmSync(tmp, { recursive: true, force: true });
}
