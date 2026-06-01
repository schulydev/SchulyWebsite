import { Injectable, PLATFORM_ID, afterNextRender, computed, effect, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export type Lang = 'de' | 'fr' | 'it' | 'rm' | 'en';

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: 'de', label: 'Deutsch',   flag: 'DE' },
  { code: 'fr', label: 'Français',  flag: 'FR' },
  { code: 'it', label: 'Italiano',  flag: 'IT' },
  { code: 'rm', label: 'Rumantsch', flag: 'RM' },
  { code: 'en', label: 'English',   flag: 'EN' },
];

const STORAGE_KEY = 'schuly-lang';
const DEFAULT: Lang = 'en';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private translate = inject(TranslateService);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  /** Active language signal. Components read this for reactive language-dependent rendering. */
  current = signal<Lang>(DEFAULT);
  /** Convenience: true if the global lang is anything other than English. Used by legal pages to pick a sensible fallback body. */
  prefersDeForLegal = computed(() => this.current() !== 'en');

  constructor() {
    this.translate.addLangs(LANGS.map(l => l.code));
    this.translate.setFallbackLang(DEFAULT);
    this.translate.use(DEFAULT);

    // Detect on the client only, after hydration. The server pass and the first
    // hydration pass both render in English so no mismatch occurs; we switch
    // immediately afterwards if the user prefers another language.
    afterNextRender(() => {
      const detected = this.detect();
      if (detected !== DEFAULT) this.setLang(detected);
    });

    effect(() => {
      const lang = this.current();
      this.translate.use(lang);
      if (this.isBrowser) {
        try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
        document.documentElement.lang = lang;
      }
    });
  }

  setLang(lang: Lang) {
    this.current.set(lang);
  }

  private detect(): Lang {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored && LANGS.some(l => l.code === stored)) return stored;
    } catch {}

    const navLangs = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const raw of navLangs) {
      const code = raw.slice(0, 2).toLowerCase() as Lang;
      if (LANGS.some(l => l.code === code)) return code;
    }
    return DEFAULT;
  }
}
