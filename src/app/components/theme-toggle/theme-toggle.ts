import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../services/theme';

@Component({
  selector: 'app-theme-toggle',
  imports: [FontAwesomeModule],
  templateUrl: './theme-toggle.html',
  styleUrl: './theme-toggle.scss'
})
export class ThemeToggle {
  private themeService = inject(ThemeService);

  protected readonly faSun = faSun;
  protected readonly faMoon = faMoon;
  protected readonly faCircleHalfStroke = faCircleHalfStroke;

  theme = this.themeService.theme;

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getIcon() {
    switch (this.theme()) {
      case 'light':
        return this.faSun;
      case 'dark':
        return this.faMoon;
      case 'system':
        return this.faCircleHalfStroke;
    }
  }
}
