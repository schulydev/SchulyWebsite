# Icons

Builds the website's icon set from `public/assets/app_icon.png` (849×845, the same artwork as the app icon in the Schuly repo).

| Output | Size | How |
|---|---|---|
| `public/assets/app_icon_512.png` | 512×512 | padded to a square on transparent (the source isn't square), palette PNG |
| `public/assets/app_icon_64.png` | 64×64 | header, footer and download card |
| `public/assets/apple-touch-icon.png` | 180×180 | flattened on the site background `#07080a`, because iOS doesn't show transparency |
| `public/assets/icon-192.png` | 192×192 | manifest `any` |
| `public/assets/icon-maskable-512.png` | 512×512 | icon at 384 px on `#07080a`, inside the 80% safe zone, for the manifest `maskable` purpose |
| `public/favicon.ico` | 48, 32, 16 | 32-bit BMP entries |

## Prerequisites

Bun, and `bun install` in the repo root (sharp is a dev dependency).

## Regenerate

```sh
bun tools/icons/icons.ts
```

The options are `--src <png>` for another source image, `--out <dir>` for the PNGs and `--favicon <path>` for the `.ico`. After you change the icon, also run [`../social-image`](../social-image), because the social image shows `app_icon_512.png`.


## Licences

The icon is Schuly's own artwork; the repo's licence applies.
