import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';
import { faAndroid, faApple } from '@fortawesome/free-brands-svg-icons';
import {
  faBolt,
  faBook,
  faBriefcase,
  faCalendarDays,
  faChartLine,
  faCheck,
  faCloud,
  faEnvelope,
  faGlobe,
  faGraduationCap,
  faLock,
  faMobileScreen,
  faMoon,
  faPalette,
  faPlus,
  faPuzzlePiece,
  faSchool,
  faShieldHalved,
  faSun,
  faUsers,
  faWandMagicSparkles,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-features',
  imports: [FontAwesomeModule, TranslatePipe],
  templateUrl: './features.html',
  styleUrls: ['./features.scss', './features-visuals.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Features {
  protected readonly faAndroid = faAndroid;
  protected readonly faApple = faApple;
  protected readonly faBolt = faBolt;
  protected readonly faBriefcase = faBriefcase;
  protected readonly faCalendarDays = faCalendarDays;
  protected readonly faChartLine = faChartLine;
  protected readonly faCheck = faCheck;
  protected readonly faEnvelope = faEnvelope;
  protected readonly faGlobe = faGlobe;
  protected readonly faGraduationCap = faGraduationCap;
  protected readonly faLock = faLock;
  protected readonly faMobileScreen = faMobileScreen;
  protected readonly faMoon = faMoon;
  protected readonly faPalette = faPalette;
  protected readonly faPlus = faPlus;
  protected readonly faPuzzlePiece = faPuzzlePiece;
  protected readonly faSchool = faSchool;
  protected readonly faShieldHalved = faShieldHalved;
  protected readonly faSun = faSun;
  protected readonly faUsers = faUsers;
  protected readonly faWandMagicSparkles = faWandMagicSparkles;

  // Sample data for the grades tile. Swiss grades run from 1 to 6.
  protected readonly grades = [
    { subject: 'math', grade: 5.5, tone: 'good' },
    { subject: 'german', grade: 5.0, tone: 'good' },
    { subject: 'english', grade: 4.5, tone: 'ok' },
    { subject: 'history', grade: 3.5, tone: 'bad' },
  ];

  protected readonly msApps = [
    { name: 'Mail', icon: faEnvelope, hue: 205 },
    { name: 'Teams', icon: faUsers, hue: 245 },
    { name: 'OneDrive', icon: faCloud, hue: 195 },
    { name: 'OneNote', icon: faBook, hue: 280 },
  ];

  /** Moves the radial highlight of the tile under the pointer. */
  protected spotlight(event: PointerEvent): void {
    const tile = (event.target as HTMLElement | null)?.closest<HTMLElement>('.tile');
    if (!tile) return;
    const rect = tile.getBoundingClientRect();
    tile.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    tile.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }
}
