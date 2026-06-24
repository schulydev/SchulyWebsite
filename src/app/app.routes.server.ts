import { RenderMode, ServerRoute } from '@angular/ssr';
import { LANG_CODES } from './services/language';

const langParams = async () => LANG_CODES.map(lang => ({ lang }));

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: ':lang', renderMode: RenderMode.Prerender, getPrerenderParams: langParams },
  { path: ':lang/impressum', renderMode: RenderMode.Prerender, getPrerenderParams: langParams },
  { path: ':lang/privacy', renderMode: RenderMode.Prerender, getPrerenderParams: langParams },
  { path: ':lang/terms', renderMode: RenderMode.Prerender, getPrerenderParams: langParams },
  { path: '404', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Prerender },
];
