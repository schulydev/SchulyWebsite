import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  styleUrl: './not-found.scss',
  template: `
    <section class="nf">
      <div class="nf-bg" aria-hidden="true"></div>
      <div class="nf-content">
        <div class="nf-code">404</div>
        <h1 class="nf-title">Page not found.</h1>
        <p class="nf-sub">
          The URL you followed does not exist on schuly.dev. It might have moved, been renamed,
          or never existed at all.
        </p>
        <div class="nf-actions">
          <a routerLink="/" class="btn btn-primary">Back home</a>
          <a href="https://github.com/schulydev/Schuly/issues" target="_blank" rel="noopener" class="btn btn-secondary">
            Report a broken link
          </a>
        </div>
      </div>
    </section>
  `,
})
export class NotFound {}
