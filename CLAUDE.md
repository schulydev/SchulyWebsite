# Notes for Claude (and humans) — SchulyWebsite

Angular 20 marketing site for [schuly.dev](https://schuly.dev). **Bun is the package manager** (no npm, no `package-lock.json`).

## Run / build

```sh
bun install
bun start            # ng serve on http://localhost:4200
bun run build        # production build → dist/SchulyWebsite/browser
bun run watch        # dev build with file watching
```

Required bun version: `1.2.21+` (text `bun.lock` format isn't readable by 1.1.x). Pinned via `packageManager` in `package.json` and `cli.packageManager` in `angular.json`.

## Build output

Angular 20 uses `@angular/build:application` builder → output at `dist/SchulyWebsite/browser`. **Cloudflare Pages is configured for that path** — verify if you change `angular.json`.

## Deploy

Cloudflare Pages deploys `main` automatically via the GitHub integration (Cloudflare dashboard, not a workflow).

Cloudflare build settings:
- Build command: `bun run build`
- Output: `dist/SchulyWebsite/browser`
- Env: `BUN_VERSION=1.2.21`

The `.github/workflows/build.yml` CI is independent — it only verifies the build passes on PRs so broken code is caught before Cloudflare attempts a preview deploy.

## Add a feature

Stack is plain Angular standalone components. Look in `src/app/`. SCSS, no Tailwind. FontAwesome via `@fortawesome/angular-fontawesome`.

## Release

Driven by `application.properties` like the other repos. `sync-version-on-release.yml` updates both `application.properties` **and** the top-level `version` in `package.json` when a release is published.
