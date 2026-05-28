import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Impressum } from './components/legal/impressum';
import { Privacy } from './components/legal/privacy';
import { Terms } from './components/legal/terms';

export const routes: Routes = [
  { path: '', component: Home, pathMatch: 'full' },
  { path: 'impressum', component: Impressum, title: 'Impressum · Schuly' },
  { path: 'privacy', component: Privacy, title: 'Privacy Policy · Schuly' },
  { path: 'terms', component: Terms, title: 'Terms of Use · Schuly' },
  { path: '**', redirectTo: '' },
];
