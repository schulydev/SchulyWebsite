import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-navigation',
  imports: [FontAwesomeModule, ThemeToggle],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation {
  protected readonly faGithub = faGithub;
  protected readonly faBars = faBars;
  protected readonly faTimes = faTimes;

  mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update(value => !value);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
