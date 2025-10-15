import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-navigation',
  imports: [FontAwesomeModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss'
})
export class Navigation {
  protected readonly faGithub = faGithub;
}
