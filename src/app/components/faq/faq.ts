import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-faq',
  imports: [FontAwesomeModule, TranslatePipe],
  styleUrl: './faq.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="faq" class="faq">
      <div class="container faq-layout">
        <div class="section-header section-header--left faq-head">
          <h2 class="section-title">{{ 'faq.title' | translate }}</h2>
          <p class="section-description">
            {{ 'faq.description' | translate }}
          </p>
        </div>

        <div class="faq-list">
          @for (i of indices; track i) {
            <div class="faq-item" [class.is-open]="open() === i">
              <h3 class="faq-h">
                <button
                  type="button"
                  class="faq-q"
                  [id]="'faq-q-' + i"
                  [attr.aria-expanded]="open() === i"
                  [attr.aria-controls]="'faq-a-' + i"
                  (click)="toggle(i)"
                >
                  <span>{{ 'faq.items.' + i + '.q' | translate }}</span>
                  <span class="faq-icon" aria-hidden="true"><fa-icon [icon]="faPlus" /></span>
                </button>
              </h3>
              <div class="faq-a-wrap" [id]="'faq-a-' + i" role="region" [attr.aria-labelledby]="'faq-q-' + i">
                <div class="faq-a-inner">
                  <div class="faq-a">{{ 'faq.items.' + i + '.a' | translate }}</div>
                </div>
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
  protected readonly faPlus = faPlus;
  protected readonly indices = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  toggle(index: number) {
    this.open.update(current => (current === index ? null : index));
  }
}
