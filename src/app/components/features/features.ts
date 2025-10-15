import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faChartBar,
  faUsers,
  faPalette,
  faBell,
  faCalendar,
  faMobileAlt,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-features',
  imports: [FontAwesomeModule],
  templateUrl: './features.html',
  styleUrl: './features.scss'
})
export class Features {
  protected readonly faChartBar = faChartBar;
  protected readonly faUsers = faUsers;
  protected readonly faPalette = faPalette;
  protected readonly faBell = faBell;
  protected readonly faCalendar = faCalendar;
  protected readonly faMobileAlt = faMobileAlt;
}
