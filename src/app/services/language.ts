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

    // Auto-detect on the client only, after hydration. The server pass and the
    // first hydration pass both render in English so no mismatch occurs; if the
    // visitor's browser asks for another supported language, we switch
    // immediately afterwards. We set the signal directly (no localStorage
    // write) so we don't trample an explicit prior choice on the next visit.
    afterNextRender(() => {
      const detected = this.detect();
      if (detected !== this.current()) this.current.set(detected);
    });

    // Keep TranslateService and the <html lang> attribute in sync with the
    // signal. This effect does NOT persist — only explicit user actions via
    // setLang() write to localStorage.
    effect(() => {
      const lang = this.current();
      this.translate.use(lang);
      if (this.isBrowser) document.documentElement.lang = lang;
    });
  }

  /** Called when the user picks a language from the switcher. Persists the choice. */
  setLang(lang: Lang) {
    this.current.set(lang);
    if (this.isBrowser) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
    }
  }

  private detect(): Lang {
    if (!this.isBrowser) return DEFAULT;

    // 1. Explicit prior user choice.
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored && LANGS.some(l => l.code === stored)) return stored;
    } catch {}

    // 2. navigator.languages — covers de-CH, de-DE, de, fr-CH, fr, etc.
    //    Any variation maps to its base code; falls through to English if none match.
    const navLangs = navigator.languages?.length ? Array.from(navigator.languages) : [navigator.language];
    for (const raw of navLangs) {
      if (!raw) continue;
      const code = raw.slice(0, 2).toLowerCase() as Lang;
      if (LANGS.some(l => l.code === code)) return code;
    }

    return DEFAULT;
  }
}
