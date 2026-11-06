# SchulyWebsite

The landing page at [schuly.dev](https://schuly.dev), in six languages: German, Swiss German, French, Italian, Romansh and English. Angular 20 on Cloudflare Pages.

`bun install`, then `bun start` for <http://localhost:4200> or `bun run build` for production. [Its docs](https://docs.schuly.dev/SchulyWebsite/) cover the rest.

## Regenerating images

- [`tools/icons`](tools/icons): favicon, touch and manifest icons.
- [`tools/social-image`](tools/social-image): the `og-image` link preview.
- [`tools/hero-images`](tools/hero-images): the two hero screenshots.
- The framed phone screenshots (`public/assets/schuly-*-page-v2.*`) come from [`tools/store-screenshots`](https://github.com/schulydev/Schuly/tree/main/tools/store-screenshots) in the Schuly app repo.

[PolyForm Noncommercial 1.0.0](LICENSE)
