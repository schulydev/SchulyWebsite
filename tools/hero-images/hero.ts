// Converts the two hero screenshots into the website's webp files.
// Usage: bun tools/hero-images/hero.ts --web <overview-dark.png> --phone <home-dark.png> [--out <dir>]
//   --web    SchulyServer's src/Schuly.Frontend/public/screens/overview-dark.png (1440x900)
//   --phone  an unframed 1080x2400 home screenshot from the Schuly repo's tools/store-screenshots
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dir, '../..');
const arg = (name: string) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
const out = resolve(arg('--out') ?? join(root, 'public/assets'));
const web = arg('--web');
const phone = arg('--phone');
if (!web && !phone) throw new Error('Pass --web <png>, --phone <png> or both.');

// Crop 16 px off the right edge (the page scrollbar) and 10 px off the bottom for a 16:10 laptop screen.
if (web) await sharp(web).extract({ left: 0, top: 0, width: 1424, height: 890 }).webp({ quality: 84 }).toFile(join(out, 'webapp-overview-dark.webp'));
if (phone) await sharp(phone).resize(600).webp({ quality: 84 }).toFile(join(out, 'hero-phone-home-v2.webp'));
console.log(`Wrote ${[web && 'webapp-overview-dark.webp', phone && 'hero-phone-home-v2.webp'].filter(Boolean).join(' and ')} to ${out}`);
