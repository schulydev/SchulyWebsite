import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Impressum } from './components/legal/impressum';
import { Privacy } from './components/legal/privacy';
import { Terms } from './components/legal/terms';
import { NotFound } from './pages/not-found/not-found';
import { DEFAULT_LANG, LANG_CODES } from './services/language';
import { langResolver } from './services/lang.resolver';

/** Pages that exist under every language prefix. `path` is the sub-path after `/<lang>`. */
const pageRoutes: Routes = [
  { path: '', component: Home, data: { seo: 'home', path: '' } },
  { path: 'impressum', component: Impressum, data: { seo: 'impressum', path: '/impressum' } },
  { path: 'privacy', component: Privacy, data: { seo: 'privacy', path: '/privacy' } },
  { path: 'terms', component: Terms, data: { seo: 'terms', path: '/terms' } },
];

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: `/${DEFAULT_LANG}` },
  ...LANG_CODES.map(lang => ({
    path: lang,
    data: { lang },
    resolve: { lang: langResolver },
    children: pageRoutes,
  })),
  { path: '404', component: NotFound, data: { lang: DEFAULT_LANG, seo: 'notFound', path: '' }, resolve: { lang: langResolver } },
  { path: '**', component: NotFound, data: { lang: DEFAULT_LANG, seo: 'notFound', path: '' }, resolve: { lang: langResolver } },
];
