import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { DEFAULT_LANG, LANG_CODES } from './services/language';
import { langResolver } from './services/lang.resolver';

const pageRoutes: Routes = [
  { path: '', component: Home, data: { seo: 'home', path: '' } },
  { path: 'impressum', loadComponent: () => import('./components/legal/impressum').then(m => m.Impressum), data: { seo: 'impressum', path: '/impressum' } },
  { path: 'privacy', loadComponent: () => import('./components/legal/privacy').then(m => m.Privacy), data: { seo: 'privacy', path: '/privacy' } },
  { path: 'terms', loadComponent: () => import('./components/legal/terms').then(m => m.Terms), data: { seo: 'terms', path: '/terms' } },
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
