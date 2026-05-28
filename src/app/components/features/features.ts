import { afterNextRender, Component, ElementRef, viewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faChartLine,
  faUsers,
  faPalette,
  faBell,
  faCalendarDays,
  faMobileScreen,
  faPuzzlePiece,
  faShieldHalved,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';

interface Feature {
  icon: IconDefinition;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features',
  imports: [FontAwesomeModule],
  templateUrl: './features.html',
  styleUrl: './features.scss'
})
export class Features {
  private grid = viewChild<ElementRef<HTMLElement>>('grid');

  features: Feature[] = [
    { icon: faChartLine, title: 'Grades & analytics', description: 'Every grade visualised with averages, trends, and breakdowns. See your trajectory at a glance.' },
    { icon: faCalendarDays, title: 'Agenda & absences', description: 'Schedule, exams, and absence records - synced live, designed to fit on a phone screen.' },
    { icon: faBell, title: 'Push notifications', description: 'New grades, schedule changes, important announcements. Delivered the moment they appear.' },
    { icon: faPuzzlePiece, title: 'Schulnetz, and more', description: 'Schulnetz works out of the box. Additional school systems are added on the backend - the app just connects.' },
    { icon: faUsers, title: 'Multi-account', description: 'Switch between profiles in a tap. Built for students juggling more than one identity.' },
    { icon: faPalette, title: 'shadcn-style UI', description: 'Composable primitives, neutral defaults, dark-first. Themeable down to the token - no design-system lock-in.' },
    { icon: faMobileScreen, title: 'iOS · Android · Web', description: 'One Flutter codebase, three first-class targets. Your data follows you everywhere.' },
    { icon: faShieldHalved, title: 'OIDC, end-to-end', description: 'Authentication delegated to your provider. Tokens validated server-side. No password handling.' },
    { icon: faBolt, title: 'Lightning fast', description: 'Native compilation, aggressive caching, and a backend that does the heavy lifting once.' },
  ];

  constructor() {
    afterNextRender(() => {
      const el = this.grid()?.nativeElement;
      if (!el) return;
      const cards = Array.from(el.querySelectorAll<HTMLElement>('.feature-card'));
      cards.forEach(c => c.classList.add('animatable'));
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLElement);
            setTimeout(() => entry.target.classList.add('in-view'), Math.max(0, idx % 3) * 80);
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      cards.forEach(c => io.observe(c));
    });
  }
}
