# Hero images

Makes the two screenshots in the hero section:
- `public/assets/webapp-overview-dark.webp` (1424×890) shows the web app inside the laptop frame. It is also the screenshot in the [social image](../social-image).
- `public/assets/hero-phone-home.webp` (600×1333) shows the app's home screen on the phone beside it.

This script only crops and converts them. The screenshots themselves come from the other repos:
- **Web app:** `src/Schuly.Frontend/public/screens/overview-dark.png` in SchulyServer, made with its `tools/screenshots`.
- **Phone:** the unframed home screenshot (`home-dark.png`, 1080×2400) from `tools/store-screenshots` in the Schuly repo. The framed phone images in the screenshots section come from the same tool.

## Prerequisites

Bun, and `bun install` in the repo root (sharp is a dev dependency).

## Regenerate

```sh
bun tools/hero-images/hero.ts --web ../SchulyServer/src/Schuly.Frontend/public/screens/overview-dark.png --phone ../Schuly/tools/store-screenshots/out/raw/home-dark.png
```

Point `--web` and `--phone` at wherever those files are; either one can be left out. It writes to `public/assets/` by default, or to `--out <dir>`.

## Licences

Both screenshots show made-up data only (Mia Muster, Berufsfachschule Beispielstadt).
