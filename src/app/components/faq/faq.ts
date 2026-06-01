import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-faq',
  imports: [FontAwesomeModule, TranslatePipe],
  styleUrl: './faq.scss',
  template: `
    <section id="faq" class="faq">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">{{ 'faq.eyebrow' | translate }}</div>
          <h2 class="section-title">{{ 'faq.title' | translate }}</h2>
          <p class="section-description">
            {{ 'faq.description' | translate }}
          </p>
        </div>

        <div class="faq-list">
          @for (i of indices; track i) {
            <div class="faq-item" [class.is-open]="open() === i">
              <button
                type="button"
                class="faq-q"
                [attr.aria-expanded]="open() === i"
                [attr.aria-controls]="'faq-a-' + i"
                (click)="toggle(i)"
              >
                <span>{{ 'faq.items.' + i + '.q' | translate }}</span>
                <fa-icon [icon]="faChevronDown" class="faq-icon" aria-hidden="true" />
              </button>
              <div class="faq-a-wrap" [id]="'faq-a-' + i" role="region">
                <div class="faq-a">{{ 'faq.items.' + i + '.a' | translate }}</div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Faq {
  protected open = signal<number | null>(0);
  protected readonly faChevronDown = faChevronDown;
  protected readonly indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  toggle(index: number) {
    this.open.update(current => (current === index ? null : index));
  }
}
