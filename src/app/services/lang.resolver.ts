import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { DEFAULT_LANG, Lang, LanguageService, isLang } from './language';

export const langResolver: ResolveFn<boolean> = (route) => {
  const raw = (route.data['lang'] ?? route.parent?.data['lang']) as string | undefined;
  const lang: Lang = isLang(raw) ? raw : DEFAULT_LANG;

  inject(LanguageService).applyFromRoute(lang);
  return inject(TranslateService).use(lang).pipe(map(() => true));
};
