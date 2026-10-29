import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAndroid, faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight, faGlobe } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-download',
  imports: [FontAwesomeModule, TranslatePipe],
  templateUrl: './download.html',
  styleUrl: './download.scss'
})
export class Download {
  protected readonly faAndroid = faAndroid;
  protected readonly faApple = faApple;
  protected readonly faGooglePlay = faGooglePlay;
  protected readonly faArrowRight = faArrowRight;
  protected readonly faGlobe = faGlobe;
}
