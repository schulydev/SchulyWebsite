import { afterNextRender, ChangeDetectionStrategy, Component, computed, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';
import { faArrowRight, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-hero',
  imports: [FontAwesomeModule, TranslatePipe, NgOptimizedImage],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class.field-on]': 'fieldOn()' },
})
export class Hero {
  protected readonly faArrowRight = faArrowRight;
  protected readonly faGithub = faGithub;
  protected readonly faGlobe = faGlobe;

  private readonly language = inject(LanguageService);
  protected readonly base = computed(() => `/${this.language.current()}`);
  protected readonly fieldOn = signal(false);
  private readonly field = viewChild.required<ElementRef<HTMLCanvasElement>>('field');

  constructor() {
    let stop: (() => void) | null = null;
    let cancelled = false;
    inject(DestroyRef).onDestroy(() => {
      cancelled = true;
      stop?.();
    });

    // The animated field is decoration: load it only after first paint, and
    // never when the visitor asked for reduced motion (the CSS dots stay).
    afterNextRender(() => {
      const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (motion.matches) return;

      const load = () => {
        import('./hero-field').then(({ startField }) => {
          if (cancelled) return;
          stop = startField(this.field().nativeElement, () => this.fieldOn.set(true));
        });
      };
      if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 2500 });
      else setTimeout(load, 1200);

      motion.addEventListener('change', (e) => {
        if (!e.matches) return;
        stop?.();
        stop = null;
        this.fieldOn.set(false);
      });
    });
  }
}
