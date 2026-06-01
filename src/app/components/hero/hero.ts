import { afterNextRender, Component, ElementRef, signal, viewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-hero',
  imports: [FontAwesomeModule, TranslatePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  stars = signal('-');
  downloads = signal('-');

  protected readonly faArrowRight = faArrowRight;
  protected readonly faGithub = faGithub;

  private pill = viewChild<ElementRef<HTMLElement>>('pill');
  private title = viewChild<ElementRef<HTMLElement>>('title');
  private sub = viewChild<ElementRef<HTMLElement>>('sub');
  private actions = viewChild<ElementRef<HTMLElement>>('actions');
  private stage = viewChild<ElementRef<HTMLElement>>('stage');

  constructor() {
    afterNextRender(async () => {
      const { animate, createTimeline } = await import('animejs');

      const targets = [
        this.pill()?.nativeElement,
        this.title()?.nativeElement,
        this.sub()?.nativeElement,
        this.actions()?.nativeElement,
        this.stage()?.nativeElement,
      ].filter(Boolean) as HTMLElement[];

      const tl = createTimeline({ defaults: { ease: 'out(3)', duration: 800 } });
      targets.forEach((el, i) => {
        tl.add(el, { opacity: [0, 1], translateY: [24, 0] }, i * 90);
      });

      this.loadStats(animate);
    });
  }

  private async loadStats(animate: (...args: any[]) => any) {
    try {
      const res = await fetch('https://api.github.com/repos/schulydev/Schuly');
      const data = await res.json();
      if (typeof data.stargazers_count === 'number') {
        this.animateNumber(animate, 0, data.stargazers_count, n => this.stars.set(n.toString()));
      }
    } catch {
      this.stars.set('0');
    }

    try {
      const res = await fetch('https://api.github.com/repos/schulydev/Schuly/releases');
      const releases = await res.json();
      let total = 0;
      if (Array.isArray(releases)) {
        for (const r of releases) {
          if (r.assets) {
            for (const a of r.assets) {
              if (a.name?.endsWith('.apk')) total += a.download_count || 0;
            }
          }
        }
      }
      this.animateNumber(animate, 0, total, n => this.downloads.set(n.toString()));
    } catch {
      this.downloads.set('0');
    }
  }

  private animateNumber(animate: (...args: any[]) => any, from: number, to: number, set: (v: number) => void) {
    const proxy = { v: from };
    animate(proxy, {
      v: to,
      duration: 1400,
      ease: 'out(2)',
      onUpdate: () => set(Math.round(proxy.v)),
    });
  }
}
