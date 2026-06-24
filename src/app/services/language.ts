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

  /** Active language signal. The router resolver drives this from the URL. */
  current = signal<Lang>(DEFAULT_LANG);
  /** Convenience: true if the global lang is anything other than English. Used by legal pages to pick a sensible fallback body. */
  prefersDeForLegal = computed(() => this.current() !== 'en');

  constructor() {
    this.translate.addLangs(LANG_CODES);
    this.translate.setFallbackLang(DEFAULT_LANG);

    // Keep TranslateService and the <html lang> attribute in sync with the
    // signal. The signal is set by the route resolver, so by the time this runs
    // the language always matches the URL.
    effect(() => {
      const lang = this.current();
      this.translate.use(lang);
      if (this.isBrowser) document.documentElement.lang = lang;
    });
  }

  /** Called by the route resolver to align the active language with the URL. Does not persist. */
  applyFromRoute(lang: Lang) {
    if (this.current() !== lang) this.current.set(lang);
  }

  /**
   * Called when the user picks a language from the switcher. Persists the
   * choice and navigates to the same page under the new language prefix so the
   * URL always reflects the active language.
   */
  setLang(lang: Lang) {
    if (this.isBrowser) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
    }
    const rest = this.pathWithoutLang();
    this.router.navigateByUrl(`/${lang}${rest}`);
  }

  /** The current path (with hash) stripped of its leading language segment. */
  private pathWithoutLang(): string {
    if (!this.isBrowser) return '';
    const { pathname, search, hash } = window.location;
    const stripped = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');
    return `${stripped || ''}${search}${hash}`;
  }
}
