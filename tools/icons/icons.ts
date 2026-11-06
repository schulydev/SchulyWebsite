// Builds the website's icon set from public/assets/app_icon.png.
// Usage: bun tools/icons/icons.ts [--src <png>] [--out <dir>] [--favicon <path>]
import { writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import sharp from 'sharp';

const root = resolve(import.meta.dir, '../..');
const arg = (name: string) => { const i = process.argv.indexOf(name); return i > 0 ? process.argv[i + 1] : undefined; };
const src = resolve(arg('--src') ?? join(root, 'public/assets/app_icon.png'));
const out = resolve(arg('--out') ?? join(root, 'public/assets'));
const favicon = resolve(arg('--favicon') ?? join(root, 'public/favicon.ico'));
const BG = '#07080a'; // the site's background and manifest theme_color
const png = (quality: number) => ({ palette: true, quality, compressionLevel: 9, effort: 10 }) as const;

// app_icon.png is 849x845, so the square sizes either pad it (contain) or crop the 2 px difference (cover, sharp's default).
await sharp(src).resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png(png(90)).toFile(join(out, 'app_icon_512.png'));
await sharp(src).resize(64).png().toFile(join(out, 'app_icon_64.png'));
await sharp(src).resize(180, 180).flatten({ background: BG }).png(png(95)).toFile(join(out, 'apple-touch-icon.png'));
await sharp(src).resize(192, 192).png(png(95)).toFile(join(out, 'icon-192.png'));

// Maskable: the icon at 384 px (75%) on a dark square, inside the 80% safe zone.
const inner = await sharp(src).resize(384, 384).toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: BG } }).composite([{ input: inner, gravity: 'center' }]).png(png(95)).toFile(join(out, 'icon-maskable-512.png'));

// favicon.ico: 48, 32 and 16 px as 32-bit BMP entries with an empty AND mask, the layout of the original file.
const sizes = [48, 32, 16];
const entries: Buffer[] = [];
for (const s of sizes) {
  const { data } = await sharp(src).resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const header = Buffer.alloc(40);
  header.writeUInt32LE(40, 0);
  header.writeInt32LE(s, 4);
  header.writeInt32LE(s * 2, 8); // XOR image + AND mask
  header.writeUInt16LE(1, 12);
  header.writeUInt16LE(32, 14);
  const pixels = Buffer.alloc(s * s * 4);
  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const i = (y * s + x) * 4;
      const o = ((s - 1 - y) * s + x) * 4; // bottom-up rows, BGRA
      pixels[o] = data[i + 2]; pixels[o + 1] = data[i + 1]; pixels[o + 2] = data[i]; pixels[o + 3] = data[i + 3];
    }
  }
  const mask = Buffer.alloc((Math.ceil(s / 32) * 4) * s);
  entries.push(Buffer.concat([header, pixels, mask]));
}
const dir = Buffer.alloc(6 + 16 * sizes.length);
dir.writeUInt16LE(1, 2);
dir.writeUInt16LE(sizes.length, 4);
let offset = dir.length;
sizes.forEach((s, i) => {
  const e = 6 + 16 * i;
  dir.writeUInt8(s, e);
  dir.writeUInt8(s, e + 1);
  dir.writeUInt16LE(1, e + 4);
  dir.writeUInt16LE(32, e + 6);
  dir.writeUInt32LE(entries[i].length, e + 8);
  dir.writeUInt32LE(offset, e + 12);
  offset += entries[i].length;
});
writeFileSync(favicon, Buffer.concat([dir, ...entries]));

console.log(`Wrote app_icon_512, app_icon_64, apple-touch-icon, icon-192, icon-maskable-512 to ${out} and ${favicon}`);
