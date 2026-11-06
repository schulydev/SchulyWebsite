import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';
import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { LanguageService, LANGS, Lang } from '../../services/language';

// Flags from flag-icons (MIT); Rumantsch uses the flag of Graubünden (public domain). See CREDITS.txt.
const FLAGS: Record<Lang, string> = {
  de: '/assets/flags/de.svg',
  gsw: '/assets/flags/ch.svg',
  fr: '/assets/flags/fr.svg',
  it: '/assets/flags/it.svg',
  rm: '/assets/flags/rm-graubuenden.svg',
  en: '/assets/flags/gb.svg',
};

@Component({
  selector: 'app-language-switcher',
  imports: [FontAwesomeModule, TranslatePipe],
  styleUrl: './language-switcher.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:click)': 'onDocClick($event)',
    '(document:keydown.escape)': 'isOpen.set(false)',
  },
  template: `
    <div class="lang" #root>
      <button
        type="button"
        class="lang-btn"
        [attr.aria-label]="('nav.language' | translate) + ': ' + activeLang().label"
        [attr.aria-expanded]="isOpen()"
        (click)="toggle()"
      >
        <img class="flag" [src]="flags[active()]" width="20" height="15" alt="" aria-hidden="true" />
        <span class="lang-code" aria-hidden="true">{{ activeLang().flag }}</span>
        <fa-icon [icon]="faChevronDown" class="lang-caret" aria-hidden="true" />
      </button>

      @if (isOpen()) {
        <div class="lang-menu" role="menu">
          @for (l of langs; track l.code) {
            <button
              type="button"
              class="lang-item"
              role="menuitem"
              [attr.lang]="l.code"
              [class.active]="active() === l.code"
              (click)="pick(l.code)"
            >
              <img class="flag" [src]="flags[l.code]" width="20" height="15" alt="" aria-hidden="true" />
              <span class="lang-name">{{ l.label }}</span>
              @if (active() === l.code) {
                <fa-icon [icon]="faCheck" class="lang-check" aria-hidden="true" />
              }
            </button>
          }
        </div>
      }
    </div>
  `,
})
export class LanguageSwitcher {
  private langService = inject(LanguageService);
  private root = viewChild<ElementRef<HTMLElement>>('root');

  protected readonly faCheck = faCheck;
  protected readonly faChevronDown = faChevronDown;
  protected readonly langs = LANGS;
  protected readonly flags = FLAGS;
  protected readonly active = this.langService.current;
  protected readonly activeLang = computed(() => LANGS.find(l => l.code === this.active()) ?? LANGS[LANGS.length - 1]);
  protected isOpen = signal(false);

  toggle() {
    this.isOpen.update(v => !v);
  }

  pick(lang: Lang) {
    this.langService.setLang(lang);
    this.isOpen.set(false);
  }

  protected onDocClick(e: MouseEvent) {
    if (!this.isOpen()) return;
    const el = this.root()?.nativeElement;
    if (el && !el.contains(e.target as Node)) this.isOpen.set(false);
  }
}
