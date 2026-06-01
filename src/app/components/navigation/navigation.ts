import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

@Component({
  selector: 'app-navigation',
  imports: [FontAwesomeModule, TranslatePipe, LanguageSwitcher],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation {
  protected readonly faGithub = faGithub;
  protected readonly faBars = faBars;
  protected readonly faTimes = faTimes;

  mobileMenuOpen = signal(false);

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
  }
}
