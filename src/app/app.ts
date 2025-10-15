import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './components/navigation/navigation';
import { Hero } from './components/hero/hero';
import { Features } from './components/features/features';
import { Screenshots } from './components/screenshots/screenshots';
import { Download } from './components/download/download';
import { Footer } from './components/footer/footer';
import { ThemeService } from './services/theme';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navigation,
    Hero,
    Features,
    Screenshots,
    Download,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App{
  // Initialize theme service
  private themeService = inject(ThemeService);
}
