import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { ThemeToggle } from '../theme-toggle/theme-toggle';

@Component({
  selector: 'app-navigation',
  imports: [FontAwesomeModule, ThemeToggle],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation {
  protected readonly faGithub = faGithub;
}
