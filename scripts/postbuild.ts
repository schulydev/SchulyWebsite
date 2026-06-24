import { existsSync, mkdirSync, copyFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const browser = 'dist/SchulyWebsite/browser';

const ORIGIN = 'https://schuly.dev';
const LANGS = ['en', 'de', 'fr', 'it', 'rm'] as const;
const DEFAULT_LANG = 'en';

const PAGES: { path: string; changefreq: string; priority: string; images?: string[] }[] = [
  {
    path: '',
    changefreq: 'weekly',
    priority: '1.0',
    images: [
      'assets/app_icon.png',
      'assets/schuly-start-page.png',
      'assets/schuly-agenda-page.png',
      'assets/schuly-grades-page.png',
      'assets/schuly-absences-page.png',
    ],
  },
  { path: '/impressum', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacy', changefreq: 'monthly', priority: '0.5' },
  { path: '/terms', changefreq: 'monthly', priority: '0.4' },
];

// 1. Render the /404 route output to 404.html so Cloudflare Pages serves it for
//    any unknown URL with a real HTTP 404 status.
function writeNotFound() {
  const src = join(browser, '404', 'index.html');
  const dest = join(browser, '404.html');
  if (!existsSync(src)) {
    console.warn(`[postbuild] 404 skipped: ${src} not found.`);
    return;
  }
  mkdirSync(browser, { recursive: true });
  copyFileSync(src, dest);
  console.log(`[postbuild] wrote ${dest}`);
}

// 2. The root '' route only redirects to /<default-lang>. Drop any prerendered
//    root index.html so Cloudflare's `/ -> /en` edge redirect in _redirects
//    applies instead of serving a static shell.
function dropRootIndex() {
  const root = join(browser, 'index.html');
  if (existsSync(root)) {
    rmSync(root);
    console.log(`[postbuild] removed ${root} (root handled by _redirects)`);
  }
}

// 3. Generate a multilingual sitemap with hreflang alternates for every page.
function writeSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = LANGS.flatMap(lang =>
    PAGES.map(page => {
      const loc = `${ORIGIN}/${lang}${page.path}`;
      const alternates = [
        ...LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${l}" href="${ORIGIN}/${l}${page.path}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}/${DEFAULT_LANG}${page.path}"/>`,
      ].join('\n');
      const images = (page.images ?? [])
        .map(img => `    <image:image>\n      <image:loc>${ORIGIN}/${img}</image:loc>\n    </image:image>`)
        .join('\n');
      return [
        '  <url>',
        `    <loc>${loc}</loc>`,
        alternates,
        `    <lastmod>${lastmod}</lastmod>`,
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${page.priority}</priority>`,
        images,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    }),
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

  writeFileSync(join(browser, 'sitemap.xml'), xml);
  console.log(`[postbuild] wrote ${join(browser, 'sitemap.xml')} (${LANGS.length * PAGES.length} urls)`);
}

if (!existsSync(browser)) {
  console.warn(`[postbuild] skipped: ${browser} not found.`);
  process.exit(0);
}

writeNotFound();
dropRootIndex();
writeSitemap();
