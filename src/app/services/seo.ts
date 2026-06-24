import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { DEFAULT_LANG, Lang, LANGS, LanguageService } from './language';

const ORIGIN = 'https://schuly.dev';

/** Page key carried in route data; maps to the `meta.<key>` i18n block. */
export type SeoPage = 'home' | 'privacy' | 'impressum' | 'terms' | 'notFound';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);
  private translate = inject(TranslateService);
  private language = inject(LanguageService);
  private doc = inject(DOCUMENT);

  /** Subscribe once (from the root component) to update head tags on every navigation. */
  init() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => this.update());
  }

  private update() {
    let r = this.route.snapshot;
    while (r.firstChild) r = r.firstChild;

    const page = (r.data['seo'] as SeoPage) ?? 'home';
    const lang = this.language.current();
    const subPath = (r.data['path'] as string) ?? '';

    const t = (key: string) => this.translate.instant(`meta.${page}.${key}`);
    const title = t('title');
    const description = t('description');

    // Set <html lang> here so it is correct in prerendered HTML too (the
    // LanguageService effect only runs in the browser).
    this.doc.documentElement.setAttribute('lang', lang);

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });

    const url = `${ORIGIN}/${lang}${subPath}`;
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:locale', content: this.ogLocale(lang) });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    this.setCanonical(url);
    this.setAlternates(subPath, lang);
  }

  private ogLocale(lang: Lang): string {
    return LANGS.find(l => l.code === lang)?.ogLocale ?? 'en_US';
  }

  private setCanonical(url: string) {
    this.upsertLink('canonical', 'canonical', { href: url });
  }

  /** Emit hreflang alternates for every language plus x-default (default language). */
  private setAlternates(subPath: string, _active: Lang) {
    for (const { code } of LANGS) {
      this.upsertLink(`alt-${code}`, 'alternate', {
        hreflang: code,
        href: `${ORIGIN}/${code}${subPath}`,
      });
    }
    this.upsertLink('alt-x-default', 'alternate', {
      hreflang: 'x-default',
      href: `${ORIGIN}/${DEFAULT_LANG}${subPath}`,
    });
  }

  /**
   * Create or update a <link> in <head>, keyed by a stable data attribute so we
   * reuse the same element across navigations instead of piling up duplicates.
   */
  private upsertLink(key: string, rel: string, attrs: Record<string, string>) {
    const head = this.doc.head;
    let el = head.querySelector<HTMLLinkElement>(`link[data-seo="${key}"]`);
    if (!el) {
      el = this.doc.createElement('link');
      el.setAttribute('data-seo', key);
      el.setAttribute('rel', rel);
      head.appendChild(el);
    }
    for (const [name, value] of Object.entries(attrs)) el.setAttribute(name, value);
  }
}
