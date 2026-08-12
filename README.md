# <p align="center">SchulyWebsite</p>
<p align="center">
  <img src="./assets/app_icon.png" width="160" alt="Schuly Logo">
</p>
<p align="center">
  <strong>Landing site for the Schuly project - <a href="https://schuly.dev">schuly.dev</a></strong>
</p>
<p align="center">
  <a href="https://github.com/schulydev/SchulyWebsite/stargazers"><img src="https://img.shields.io/github/stars/schulydev/SchulyWebsite?style=flat&color=3da8ff" alt="GitHub stars"/></a>
  <a href="https://angular.dev/"><img src="https://img.shields.io/badge/Angular-20-3da8ff" alt="Angular"/></a>
  <a href="https://docs.schuly.dev/SchulyWebsite/"><img src="https://img.shields.io/badge/docs-docs.schuly.dev-3da8ff" alt="Documentation"/></a>
  <a href="https://schuly.dev"><img src="https://img.shields.io/badge/site-schuly.dev-3da8ff" alt="Website"/></a>
</p>

Angular marketing site for Schuly. Hosts the public landing page and app downloads, in five languages with per-language prerendered URLs.

Project documentation lives at [docs.schuly.dev](https://docs.schuly.dev), not on this site.

## Quick start

```sh
bun install
bun start        # ng serve on http://localhost:4200
bun run build    # production build
```

## Documentation

Full documentation lives at **[docs.schuly.dev/SchulyWebsite](https://docs.schuly.dev/SchulyWebsite/)**.

| Guide | What it covers |
|---|---|
| [Development setup](https://docs.schuly.dev/SchulyWebsite/setup/development) | Prerequisites, install, run, watch, and tests. |
| [Deployment](https://docs.schuly.dev/SchulyWebsite/setup/deployment) | How the site is built and published. |
| [Release](https://docs.schuly.dev/SchulyWebsite/setup/release) | Cutting a release. |
| [Architecture](https://docs.schuly.dev/SchulyWebsite/architecture) | App structure, i18n, and prerendering. |
| [Contributing](https://docs.schuly.dev/SchulyWebsite/contributing) | Workflow, branch and PR conventions. |

## The Schuly ecosystem

| Repo | Purpose |
|---|---|
| [**Schuly**](https://github.com/schulydev/Schuly) | Flutter mobile app |
| [**SchulyBackend**](https://github.com/schulydev/SchulyBackend) | ASP.NET Core API backend |
| [**SchulyKeycloak**](https://github.com/schulydev/SchulyKeycloak) | Keycloak image + the `schuly` realm |
| [**SchulyPluginAbstractions**](https://github.com/schulydev/SchulyPluginAbstractions) | Plugin contract (NuGet) |
| [**SchulyPlugins**](https://github.com/schulydev/SchulyPlugins) | Official plugins monorepo |
| [**SchulyWebsite**](https://github.com/schulydev/SchulyWebsite) | Landing site ([schuly.dev](https://schuly.dev)) *(this repo)* |
| [**SchulyDocs**](https://github.com/schulydev/SchulyDocs) | Documentation site ([docs.schuly.dev](https://docs.schuly.dev)) |
