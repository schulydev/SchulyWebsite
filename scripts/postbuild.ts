import { existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';

// Renders the /404 route output to dist/.../browser/404.html so Cloudflare
// Pages serves it for any unknown URL with a real HTTP 404 status.

const browser = 'dist/SchulyWebsite/browser';
const src = join(browser, '404', 'index.html');
const dest = join(browser, '404.html');

if (!existsSync(src)) {
  console.warn(`[postbuild] skipped: ${src} not found.`);
  process.exit(0);
}

mkdirSync(browser, { recursive: true });
copyFileSync(src, dest);
console.log(`[postbuild] wrote ${dest}`);
