import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, TranslatePipe],
  styleUrl: './not-found.scss',
  template: `
    <section class="nf">
      <div class="nf-bg" aria-hidden="true"></div>
      <div class="nf-content">
        <div class="nf-code">{{ 'notFound.code' | translate }}</div>
        <h1 class="nf-title">{{ 'notFound.title' | translate }}</h1>
        <p class="nf-sub">
          {{ 'notFound.sub' | translate }}
        </p>
        <div class="nf-actions">
          <a routerLink="/" class="btn btn-primary">{{ 'notFound.back' | translate }}</a>
          <a href="https://github.com/schulydev/Schuly/issues" target="_blank" rel="noopener" class="btn btn-secondary">
            {{ 'notFound.report' | translate }}
          </a>
        </div>
      </div>
    </section>
  `,
})
export class NotFound {}
