import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';
import { faAndroid, faApple } from '@fortawesome/free-brands-svg-icons';
import {
  faBell,
  faBook,
  faBriefcase,
  faCheck,
  faCloud,
  faEnvelope,
  faGlobe,
  faGraduationCap,
  faMoon,
  faPlus,
  faSchool,
  faSun,
  faUsers,
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
  protected readonly faBriefcase = faBriefcase;
  protected readonly faCheck = faCheck;
  protected readonly faGlobe = faGlobe;
  protected readonly faGraduationCap = faGraduationCap;
  protected readonly faMoon = faMoon;
  protected readonly faPlus = faPlus;
  protected readonly faSchool = faSchool;
  protected readonly faSun = faSun;

  // Sample grades for the grades tile, on the Swiss 1 to 6 scale.
  protected readonly subjects = [
    { key: 'math', grades: [4.5, 5, 6] },
    { key: 'german', grades: [5.5, 5, 5.5, 5] },
    { key: 'english', grades: [4.5, 5, 4.5, 5, 4] },
    { key: 'history', grades: [4, 4.5, 3.5] },
  ].map(({ key, grades }) => {
    const average = grades.reduce((sum, g) => sum + g, 0) / grades.length;
    return {
      key,
      grades,
      average,
      label: average.toFixed(1),
      tone: gradeTone(average),
      avgLeft: scalePosition(average),
      dots: grades.map((g) => ({ tone: gradeTone(g), left: scalePosition(g) })),
    };
  });
  protected readonly axis = [1, 2, 3, 4, 5, 6];

  // Sample school day for the timetable tile.
  protected readonly lessons = [
    { time: '07:30', subject: 'german' },
    { time: '08:20', subject: 'german' },
    { time: '09:20', subject: 'math', exam: true },
    { time: '10:15', subject: 'english' },
    { time: '11:05', subject: 'informatics' },
    { time: '11:50', break: true },
    { time: '12:30', subject: 'economics', now: true },
    { time: '13:20', subject: 'history' },
    { time: '14:10', subject: 'sport' },
  ];
  protected readonly overall = (this.subjects.reduce((sum, s) => sum + s.average, 0) / this.subjects.length).toFixed(1);

  protected readonly msApps = [
    { name: 'Mail', icon: faEnvelope, hue: 205 },
    { name: 'Teams', icon: faUsers, hue: 245 },
    { name: 'OneDrive', icon: faCloud, hue: 195 },
    { name: 'OneNote', icon: faBook, hue: 280 },
  ];

  // What an account unlocks: web app, push, Helply and Microsoft 365. Helply uses its avatar.
  protected readonly suiteApps = [
    { key: 'web', icon: faGlobe, hue: 210 },
    { key: 'push', icon: faBell, hue: 40 },
    { key: 'helply', icon: null, hue: 265 },
    { key: 'mail', icon: faEnvelope, hue: 205 },
    { key: 'teams', icon: faUsers, hue: 245 },
    { key: 'onedrive', icon: faCloud, hue: 195 },
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

/** Green from 5, amber from the 4.0 pass mark, red below it. */
function gradeTone(grade: number): 'good' | 'ok' | 'bad' {
  if (grade >= 5) return 'good';
  return grade >= 4 ? 'ok' : 'bad';
}

/** Where a grade sits on the 1 to 6 scale, in percent. */
function scalePosition(grade: number): number {
  return Math.min(100, Math.max(0, ((grade - 1) / 5) * 100));
}
