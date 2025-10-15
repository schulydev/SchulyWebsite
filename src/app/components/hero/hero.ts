import { Component, input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero',
  imports: [FontAwesomeModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  stars = input<string>('...');

  protected readonly faDownload = faDownload;
  protected readonly faExternalLinkAlt = faExternalLinkAlt;
}
