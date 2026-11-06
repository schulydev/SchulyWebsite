import { existsSync, mkdirSync, copyFileSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const browser = 'dist/SchulyWebsite/browser';

const ORIGIN = 'https://schuly.dev';
const LANGS = ['en', 'de', 'gsw', 'fr', 'it', 'rm'] as const;
// hreflang per route prefix; keep in sync with LANGS in src/app/services/language.ts.
const HREFLANG: Record<(typeof LANGS)[number], string> = { en: 'en', de: 'de-CH', gsw: 'gsw-CH', fr: 'fr', it: 'it', rm: 'rm' };
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

// Cloudflare Pages serves a top-level 404.html for unmatched routes; copy the
// prerendered /404 route output there.
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

// The root '' route only redirects to /<default-lang>; drop the prerendered
// index.html so the "/" -> "/<lang>" rule in _redirects handles it instead.
function dropRootIndex() {
  const root = join(browser, 'index.html');
  if (existsSync(root)) {
    rmSync(root);
    console.log(`[postbuild] removed ${root} (root handled by _redirects)`);
  }
}

function writeSitemap() {
  const lastmod = new Date().toISOString().slice(0, 10);

  const urls = LANGS.flatMap(lang =>
    PAGES.map(page => {
      const loc = `${ORIGIN}/${lang}${page.path}`;
      const alternates = [
        ...LANGS.map(l => `    <xhtml:link rel="alternate" hreflang="${HREFLANG[l]}" href="${ORIGIN}/${l}${page.path}"/>`),
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

// Every language file must have exactly the same keys as de.json.
function checkKeyParity() {
  const flatten = (o: Record<string, unknown>, p = ''): string[] =>
    Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' && !Array.isArray(v) ? flatten(v as Record<string, unknown>, `${p}${k}.`) : [`${p}${k}`]));
  const keys = (lang: string) => new Set(flatten(JSON.parse(readFileSync(`public/i18n/${lang}.json`, 'utf8'))));
  const ref = keys('de');
  let ok = true;
  for (const lang of LANGS) {
    const own = keys(lang);
    const missing = [...ref].filter(k => !own.has(k));
    const extra = [...own].filter(k => !ref.has(k));
    if (missing.length || extra.length) {
      ok = false;
      console.error(`[postbuild] ${lang}.json: missing ${missing.join(', ') || '-'}; extra ${extra.join(', ') || '-'}`);
    }
  }
  if (!ok) process.exit(1);
  console.log(`[postbuild] i18n keys match in ${LANGS.length} languages (${ref.size} keys)`);
}

checkKeyParity();
writeNotFound();
dropRootIndex();
writeSitemap();
