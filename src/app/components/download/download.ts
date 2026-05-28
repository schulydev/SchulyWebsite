import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAndroid, faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-download',
  imports: [FontAwesomeModule],
  templateUrl: './download.html',
  styleUrl: './download.scss'
})
export class Download {
  protected readonly faAndroid = faAndroid;
  protected readonly faApple = faApple;
  protected readonly faGooglePlay = faGooglePlay;
  protected readonly faGlobe = faGlobe;
  protected readonly faArrowRight = faArrowRight;
}
