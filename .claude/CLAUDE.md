# Notes for Claude (and humans) - SchulyWebsite

Angular 20 marketing site for [schuly.dev](https://schuly.dev). **Bun is the package manager** (no npm, no `package-lock.json`).

## Workflow rules (enforced)

- Never work on `main`. Create an issue (labeled) → branch `feature/<issue#>_PascalCase`
  or `fix/<issue#>_PascalCase` → PR (labeled) with `Closes #<issue>` → squash-merge +
  delete branch.
- Use **bun** as the package manager / task runner - never npm, npx, or node directly.
- Use CLI tooling whenever one exists (`gh issue create`, `gh pr create`, generators, etc.).
- No AI / Claude attribution in commits or PRs. Ever.
- No test plans in PRs. PR body is **Summary** + `Closes #<issue>` only.
- Commit subject: short imperative.
- PR labels: `bug`, `enhancement`, `feature`, `refactor`, `CI/CD`, `dependencies`, `documentation`.

## Run / build

```sh
bun install
bun start            # ng serve on http://localhost:4200
bun run build        # production build → dist/SchulyWebsite/browser
bun run watch        # dev build with file watching
```

Required bun version: `1.2.21+` (text `bun.lock` format isn't readable by 1.1.x). Pinned via `packageManager` in `package.json` and `cli.packageManager` in `angular.json`.

## Build output

Angular 20 uses `@angular/build:application` builder → output at `dist/SchulyWebsite/browser`. **Cloudflare Pages is configured for that path** - verify if you change `angular.json`.

## Deploy

Cloudflare Pages deploys `main` automatically via the GitHub integration (Cloudflare dashboard, not a workflow).

Cloudflare build settings:
- Build command: `bun run build`
- Output: `dist/SchulyWebsite/browser`
- Env: `BUN_VERSION=1.2.21`

The `.github/workflows/build.yml` CI is independent - it only verifies the build passes on PRs so broken code is caught before Cloudflare attempts a preview deploy.

## Add a feature

Stack is plain Angular standalone components. Look in `src/app/`. SCSS, no Tailwind. FontAwesome via `@fortawesome/angular-fontawesome`.

## Release

Driven by `application.properties`. `sync-version-on-release.yml` updates both `application.properties` and the top-level `version` in `package.json` when a release is published.

---

## Coding conventions (Angular 20)

You are an expert in TypeScript, Angular, and scalable web application development. Write maintainable, performant, and accessible code following Angular and TypeScript best practices.

### TypeScript

- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

### Angular

- Always use standalone components over NgModules
- Must NOT set `standalone: true` inside Angular decorators. It's the default.
- Use signals for state management
- Implement lazy loading for feature routes
- Do NOT use the `@HostBinding` and `@HostListener` decorators. Put host bindings inside the `host` object of the `@Component` or `@Directive` decorator instead
- Use `NgOptimizedImage` for all static images.
  - `NgOptimizedImage` does not work for inline base64 images.

### Components

- Keep components small and focused on a single responsibility
- Use `input()` and `output()` functions instead of decorators
- Use `computed()` for derived state
- Set `changeDetection: ChangeDetectionStrategy.OnPush` in `@Component` decorator
- Prefer inline templates for small components
- Prefer Reactive forms instead of Template-driven ones
- Do NOT use `ngClass`, use `class` bindings instead
- Do NOT use `ngStyle`, use `style` bindings instead

### State management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals, use `update` or `set` instead

### Templates

- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`) instead of `*ngIf`, `*ngFor`, `*ngSwitch`
- Use the async pipe to handle observables

### Services

- Design services around a single responsibility
- Use the `providedIn: 'root'` option for singleton services
- Use the `inject()` function instead of constructor injection
