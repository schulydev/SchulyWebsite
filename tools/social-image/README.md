# Social image

Makes the 1200×630 link preview `public/assets/og-image.png` and `og-image.webp`.

`og.html` is the template. `render.ts` serves it on top of `public/`, so it can load the Inter font and two assets from there:
- `public/assets/app_icon_512.png`, from [`../icons`](../icons);
- `public/assets/webapp-overview-dark.webp`, from [`../hero-images`](../hero-images).

It then screenshots the page with your installed Chrome or Edge in headless mode and compresses the result with sharp.

## Prerequisites

- Bun, and `bun install` in the repo root (sharp is a dev dependency).
- Google Chrome or Microsoft Edge. Nothing is downloaded. The script looks in the usual install folders; otherwise pass `--browser <path>` or set `CHROME_PATH`.

## Regenerate

```sh
bun tools/social-image/render.ts
```

It writes to `public/assets/` by default; `--out <dir>` writes somewhere else. To change the text or layout, edit `og.html`. Opening it straight from disk won't load the font or the images, so render it to check.

## Licences

- The font is Inter (SIL Open Font License 1.1), the same file the site uses.
- The screenshot inside shows made-up data only (Mia Muster).
