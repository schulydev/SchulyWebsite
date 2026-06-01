import { Component, ElementRef, HostListener, inject, signal, viewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGlobe, faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { LanguageService, LANGS, Lang } from '../../services/language';

@Component({
  selector: 'app-language-switcher',
  imports: [FontAwesomeModule],
  styleUrl: './language-switcher.scss',
  template: `
    <div class="lang" #root>
      <button
        type="button"
        class="lang-btn"
        [attr.aria-label]="'Language'"
        [attr.aria-expanded]="isOpen()"
        (click)="toggle()"
      >
        <fa-icon [icon]="faGlobe" />
        <span class="lang-code">{{ activeFlag() }}</span>
        <fa-icon [icon]="faChevronDown" class="lang-caret" />
      </button>

      @if (isOpen()) {
        <div class="lang-menu" role="menu">
          @for (l of langs; track l.code) {
            <button
              type="button"
              class="lang-item"
              role="menuitem"
              [class.active]="active() === l.code"
              (click)="pick(l.code)"
            >
              <span class="lang-flag">{{ l.flag }}</span>
              <span class="lang-name">{{ l.label }}</span>
              @if (active() === l.code) {
                <fa-icon [icon]="faCheck" class="lang-check" />
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

  protected readonly faGlobe = faGlobe;
  protected readonly faCheck = faCheck;
  protected readonly faChevronDown = faChevronDown;
  protected readonly langs = LANGS;
  protected readonly active = this.langService.current;
  protected isOpen = signal(false);

  protected activeFlag() {
    return LANGS.find(l => l.code === this.active())?.flag ?? 'EN';
  }

  toggle() {
    this.isOpen.update(v => !v);
  }

  pick(lang: Lang) {
    this.langService.setLang(lang);
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocClick(e: MouseEvent) {
    if (!this.isOpen()) return;
    const el = this.root()?.nativeElement;
    if (el && !el.contains(e.target as Node)) {
      this.isOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.isOpen.set(false);
  }
}
