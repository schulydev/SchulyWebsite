import { afterNextRender, Component, ElementRef, viewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faChartLine,
  faUsers,
  faPalette,
  faCalendarDays,
  faMobileScreen,
  faPuzzlePiece,
  faShieldHalved,
  faBolt,
} from '@fortawesome/free-solid-svg-icons';

interface Feature {
  key: string;
  icon: IconDefinition;
}

@Component({
  selector: 'app-features',
  imports: [FontAwesomeModule, TranslatePipe],
  templateUrl: './features.html',
  styleUrl: './features.scss'
})
export class Features {
  private grid = viewChild<ElementRef<HTMLElement>>('grid');

  features: Feature[] = [
    { key: 'grades',     icon: faChartLine },
    { key: 'agenda',     icon: faCalendarDays },
    { key: 'schulnetz',  icon: faPuzzlePiece },
    { key: 'multi',      icon: faUsers },
    { key: 'design',     icon: faPalette },
    { key: 'platforms',  icon: faMobileScreen },
    { key: 'oidc',       icon: faShieldHalved },
    { key: 'fast',       icon: faBolt },
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
