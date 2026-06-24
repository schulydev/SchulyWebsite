import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { DEFAULT_LANG, Lang, LanguageService, isLang } from './language';

/**
 * Aligns the active language with the URL and waits for that language's
 * translation file to load before the route activates. Returning the
 * TranslateService observable makes the router (and therefore the prerenderer)
 * block until the strings are available, so every prerendered page ships with
 * its language's content baked into the HTML rather than swapping in after
 * hydration.
 */
export const langResolver: ResolveFn<boolean> = (route) => {
  const raw = (route.data['lang'] ?? route.parent?.data['lang']) as string | undefined;
  const lang: Lang = isLang(raw) ? raw : DEFAULT_LANG;

  inject(LanguageService).applyFromRoute(lang);
  return inject(TranslateService).use(lang).pipe(map(() => true));
};
