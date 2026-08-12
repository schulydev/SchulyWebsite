import { Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'de' | 'fr' | 'it' | 'rm' | 'en';

export const LANGS: { code: Lang; label: string; flag: string; ogLocale: string }[] = [
  { code: 'de', label: 'Deutsch',   flag: 'DE', ogLocale: 'de_CH' },
  { code: 'fr', label: 'Français',  flag: 'FR', ogLocale: 'fr_CH' },
  { code: 'it', label: 'Italiano',  flag: 'IT', ogLocale: 'it_CH' },
  { code: 'rm', label: 'Rumantsch', flag: 'RM', ogLocale: 'rm_CH' },
  { code: 'en', label: 'English',   flag: 'EN', ogLocale: 'en_US' },
];

export const LANG_CODES = LANGS.map(l => l.code);

const STORAGE_KEY = 'schuly-lang';
export const DEFAULT_LANG: Lang = 'en';

export function isLang(value: string | null | undefined): value is Lang {
  return !!value && LANG_CODES.includes(value as Lang);
}

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  private router = inject(Router);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  current = signal<Lang>(DEFAULT_LANG);
  prefersDeForLegal = computed(() => this.current() !== 'en');

  constructor() {
    this.translate.addLangs(LANG_CODES);
    this.translate.setFallbackLang(DEFAULT_LANG);

    effect(() => {
      const lang = this.current();
      this.translate.use(lang);
      if (this.isBrowser) document.documentElement.lang = lang;
    });
  }

  applyFromRoute(lang: Lang) {
    if (this.current() !== lang) this.current.set(lang);
  }

  setLang(lang: Lang) {
    if (this.isBrowser) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
    }
    const rest = this.pathWithoutLang();
    this.router.navigateByUrl(`/${lang}${rest}`);
  }

  private pathWithoutLang(): string {
    if (!this.isBrowser) return '';
    const { pathname, search, hash } = window.location;
    const stripped = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');
    return `${stripped || ''}${search}${hash}`;
  }
}
