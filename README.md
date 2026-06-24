# <p align="center">SchulyWebsite</p>
<p align="center">
  <img src="./assets/app_icon.png" width="160" alt="Schuly Logo">
</p>
<p align="center">
  <strong>Landing site for the Schuly project — <a href="https://schuly.dev">schuly.dev</a></strong>
</p>
<p align="center">
  <a href="https://github.com/schulydev/SchulyWebsite/stargazers"><img src="https://img.shields.io/github/stars/schulydev/SchulyWebsite?style=flat&color=3da8ff" alt="GitHub stars"/></a>
  <a href="https://angular.dev/"><img src="https://img.shields.io/badge/Angular-20-3da8ff" alt="Angular"/></a>
  <a href="https://schuly.dev"><img src="https://img.shields.io/badge/site-schuly.dev-3da8ff" alt="Website"/></a>
</p>

Angular-based marketing site for Schuly. Hosts the public landing page, app downloads, and project documentation.

## The Schuly ecosystem

| Repo | Purpose |
|---|---|
| [**Schuly**](https://github.com/schulydev/Schuly) | Flutter mobile app |
| [**SchulyBackend**](https://github.com/schulydev/SchulyBackend) | ASP.NET Core API backend |
| [**SchulyPluginAbstractions**](https://github.com/schulydev/SchulyPluginAbstractions) | Plugin contract (NuGet) |
| [**SchulyPlugins**](https://github.com/schulydev/SchulyPlugins) | Official plugins monorepo |
| [**SchulyWebsite**](https://github.com/schulydev/SchulyWebsite) | Landing site ([schuly.dev](https://schuly.dev)) *(this repo)* |

## Run

```sh
bun install
bun start    # ng serve on http://localhost:4200
```

## Build

```sh
bun run build
```
