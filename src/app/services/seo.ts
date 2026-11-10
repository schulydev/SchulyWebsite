import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { DEFAULT_LANG, Lang, LANGS, LanguageService } from './language';

const ORIGIN = 'https://schuly.dev';
// Mirrors the robots tag in src/index.html; the not-found page swaps it for noindex.
const ROBOTS_INDEX = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

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

    this.doc.documentElement.setAttribute('lang', lang);

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });

    const url = `${ORIGIN}/${lang}${subPath}`;
    const indexable = page !== 'notFound';
    this.meta.updateTag({ name: 'robots', content: indexable ? ROBOTS_INDEX : 'noindex' });
    this.meta.updateTag({ name: 'googlebot', content: indexable ? 'index, follow' : 'noindex' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    if (indexable) this.meta.updateTag({ property: 'og:url', content: url });
    else this.meta.removeTag('property="og:url"');
    this.meta.updateTag({ property: 'og:locale', content: this.ogLocale(lang) });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    // A 404 must not claim a canonical or alternates (it used to point at the home page).
    if (indexable) {
      this.setCanonical(url);
      this.setAlternates(subPath, lang);
    } else {
      this.doc.head.querySelectorAll('link[data-seo="canonical"], link[data-seo^="alt-"]').forEach(el => el.remove());
    }
    this.setJsonLd(page, lang, url, title);
  }

  /** Structured data for the current page and language: site graph everywhere, app + FAQ on home, breadcrumbs on subpages. */
  private setJsonLd(page: SeoPage, lang: Lang, url: string, title: string) {
    const t = (key: string): unknown => this.translate.instant(key);
    const inLanguage = LANGS.find(l => l.code === lang)?.hreflang ?? lang;
    const org = { '@id': `${ORIGIN}/#org` };
    const free = { '@type': 'Offer', price: '0', priceCurrency: 'CHF' };

    const graph: Record<string, unknown>[] = [
      {
        '@type': 'Organization',
        '@id': `${ORIGIN}/#org`,
        name: 'Schuly',
        url: `${ORIGIN}/${DEFAULT_LANG}`,
        logo: { '@type': 'ImageObject', url: `${ORIGIN}/assets/app_icon_512.png`, width: 512, height: 512 },
        email: 'hello@schuly.dev',
        areaServed: { '@type': 'Country', name: 'Switzerland' },
        sameAs: ['https://github.com/schulydev', 'https://github.com/schulydev/Schuly'],
      },
      {
        '@type': 'WebSite',
        '@id': `${ORIGIN}/#website`,
        name: 'Schuly',
        url: `${ORIGIN}/${DEFAULT_LANG}`,
        inLanguage: LANGS.map(l => l.hreflang),
        publisher: org,
      },
    ];

    if (page === 'home') {
      const features = ['grades', 'agenda', 'schulnetz', 'multi', 'fast', 'helply', 'microsoft'].map(k => t(`features.items.${k}.title`));
      graph.push(
        {
          '@type': 'MobileApplication',
          '@id': `${ORIGIN}/#app`,
          name: 'Schuly',
          url,
          inLanguage,
          description: t('meta.home.description'),
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'Android, iOS',
          image: `${ORIGIN}/assets/app_icon_512.png`,
          screenshot: ['start', 'grades', 'absences', 'agenda'].map(s => `${ORIGIN}/assets/schuly-${s}-page-v3.webp`),
          downloadUrl: 'https://github.com/schulydev/Schuly/releases',
          isAccessibleForFree: true,
          offers: free,
          featureList: features,
          publisher: org,
        },
        {
          '@type': 'WebApplication',
          '@id': `${ORIGIN}/#webapp`,
          name: 'Schuly Web',
          url: 'https://app.schuly.dev/',
          applicationCategory: 'EducationalApplication',
          operatingSystem: 'Web',
          browserRequirements: 'Requires JavaScript',
          isAccessibleForFree: true,
          offers: free,
          publisher: org,
        },
      );
      const faq = t('faq.items');
      if (Array.isArray(faq)) {
        graph.push({
          '@type': 'FAQPage',
          inLanguage,
          mainEntity: (faq as { q: string; a: string }[]).map(item => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        });
      }
    } else if (page !== 'notFound') {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Schuly', item: `${ORIGIN}/${lang}` },
          { '@type': 'ListItem', position: 2, name: title.split(' · ')[0], item: url },
        ],
      });
    }

    const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
    let el = this.doc.head.querySelector<HTMLScriptElement>('script[data-seo="ld"]');
    if (!el) {
      el = this.doc.createElement('script');
      el.setAttribute('type', 'application/ld+json');
      el.setAttribute('data-seo', 'ld');
      this.doc.head.appendChild(el);
    }
    el.textContent = json;
  }

  private ogLocale(lang: Lang): string {
    return LANGS.find(l => l.code === lang)?.ogLocale ?? 'en_US';
  }

  private setCanonical(url: string) {
    this.upsertLink('canonical', 'canonical', { href: url });
  }

  private setAlternates(subPath: string, _active: Lang) {
    for (const { code, hreflang } of LANGS) {
      this.upsertLink(`alt-${code}`, 'alternate', {
        hreflang,
        href: `${ORIGIN}/${code}${subPath}`,
      });
    }
    this.upsertLink('alt-x-default', 'alternate', {
      hreflang: 'x-default',
      href: `${ORIGIN}/${DEFAULT_LANG}${subPath}`,
    });
  }

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
