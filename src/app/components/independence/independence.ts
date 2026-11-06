import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';
import { faArrowRight, faCheck, faCloud, faCode, faLock, faServer, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../services/language';

/** One terminal row: a typed command, plain output, or a container status with its mark. */
interface TermLine {
  kind: 'cmd' | 'out' | 'ok';
  text: string;
  name?: string;
  mark?: string;
}

/** The self-hosting session. The last row is the empty prompt the cursor rests on. */
const SESSION: TermLine[] = [
  { kind: 'cmd', text: 'git clone https://github.com/schulydev/SchulyServer' },
  { kind: 'out', text: "Cloning into 'SchulyServer'..." },
  { kind: 'out', text: 'Receiving objects: 100% (2841/2841), 1.92 MiB | 6.10 MiB/s, done.' },
  { kind: 'cmd', text: 'cd SchulyServer/deploy && cp .env.example .env' },
  { kind: 'cmd', text: 'docker compose -f compose.staging.yml up -d' },
  { kind: 'out', text: '[+] Running 3/3' },
  { kind: 'ok', mark: '✓', name: 'network ', text: '  Created' },
  { kind: 'ok', mark: '✓', name: 'postgres', text: '  Healthy' },
  { kind: 'ok', mark: '✓', name: 'backend ', text: '  Started  ·  http://localhost' },
  { kind: 'cmd', text: '' },
];

const SPINNER = ['⠋', '⠙', '⠹'];

/** Privacy and independence: the two modes, and why Schuly is not tied to anyone. */
@Component({
  selector: 'app-independence',
  imports: [FontAwesomeModule, NgTemplateOutlet, RouterLink, TranslatePipe],
  templateUrl: './independence.html',
  styleUrl: './independence.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Independence {
  protected readonly lang = inject(LanguageService).current;

  protected readonly faArrowRight = faArrowRight;
  protected readonly faCheck = faCheck;

  protected readonly modes = [
    { key: 'account', icon: faCloud },
    { key: 'private', icon: faLock },
  ];

  protected readonly facts = [
    { key: 'independent', icon: faUserShield },
    { key: 'source', icon: faCode },
    { key: 'selfhost', icon: faServer },
  ];

  // The full transcript stays in the DOM for screen readers and the prerender; the typed copy is aria-hidden.
  protected readonly session = SESSION;
  protected readonly live = signal<TermLine[]>([]);
  protected readonly playing = signal(false);

  private readonly terminal = viewChild<ElementRef<HTMLElement>>('terminal');
  private readonly timers: number[] = [];

  constructor() {
    let observer: IntersectionObserver | undefined;
    afterNextRender(() => {
      const el = this.terminal()?.nativeElement;
      if (!el || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      observer = new IntersectionObserver((entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer?.disconnect();
        this.play();
      }, { threshold: 0.5 });
      observer.observe(el);
    });
    inject(DestroyRef).onDestroy(() => {
      observer?.disconnect();
      this.timers.forEach((t) => clearTimeout(t));
    });
  }

  /** Types the session once, row by row, and leaves the final state on screen. */
  private play(): void {
    let at = 400;
    const later = (ms: number, fn: () => void) => this.timers.push(window.setTimeout(fn, (at += ms)));
    const push = (line: TermLine) => this.live.update((rows) => [...rows, line]);
    const setLast = (patch: Partial<TermLine>) => this.live.update((rows) => [...rows.slice(0, -1), { ...rows[rows.length - 1], ...patch }]);
    const jitter = (min: number, max: number) => min + Math.random() * (max - min);

    this.playing.set(true);
    push({ kind: 'cmd', text: '' });
    SESSION.forEach((line, i) => {
      if (line.kind === 'cmd') {
        if (i > 0) later(jitter(250, 450), () => push({ kind: 'cmd', text: '' }));
        for (let n = 1; n <= line.text.length; n++) later(jitter(35, 60), () => setLast({ text: line.text.slice(0, n) }));
        if (line.text) later(jitter(300, 500), () => undefined);
      } else if (line.kind === 'out') {
        later(jitter(90, 180), () => push(line));
      } else {
        later(jitter(80, 160), () => push({ ...line, mark: SPINNER[0] }));
        SPINNER.slice(1).forEach((mark) => later(90, () => setLast({ mark })));
        later(jitter(100, 200), () => setLast({ mark: line.mark }));
      }
    });
  }
}
