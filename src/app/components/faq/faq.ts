import { Component, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface FaqItem {
  q: string;
  a: string;
}

@Component({
  selector: 'app-faq',
  imports: [FontAwesomeModule],
  styleUrl: './faq.scss',
  template: `
    <section id="faq" class="faq">
      <div class="container">
        <div class="section-header">
          <div class="eyebrow">FAQ</div>
          <h2 class="section-title">Questions, answered.</h2>
          <p class="section-description">
            What Schuly is, what it isn't, and how it fits next to the school system you already use.
          </p>
        </div>

        <div class="faq-list">
          @for (item of items; track item.q; let i = $index) {
            <div class="faq-item" [class.is-open]="open() === i">
              <button
                type="button"
                class="faq-q"
                [attr.aria-expanded]="open() === i"
                [attr.aria-controls]="'faq-a-' + i"
                (click)="toggle(i)"
              >
                <span>{{ item.q }}</span>
                <fa-icon [icon]="faChevronDown" class="faq-icon" aria-hidden="true" />
              </button>
              <div class="faq-a-wrap" [id]="'faq-a-' + i" role="region">
                <div class="faq-a">{{ item.a }}</div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  `,
})
export class Faq {
  protected open = signal<number | null>(0);
  protected readonly faChevronDown = faChevronDown;

  items: FaqItem[] = [
    {
      q: 'What is Schuly?',
      a: 'Schuly is a free, open-source student portal app. It gives you a modern interface for the school systems your schools already use - grades, schedule, agenda, absences, push notifications - and lets you keep multiple schools in one app. Available for iOS, Android, and Web.',
    },
    {
      q: 'Which school systems does Schuly support?',
      a: 'Currently Schulnetz (via the Schulware plugin) and OdaOrg. Schulnetz is the most widely used integration. Each system is wrapped by a backend plugin, so more can be added without changing the app.',
    },
    {
      q: 'Is Schuly affiliated with Schulnetz or Centerboard AG?',
      a: 'No. Schuly is an independent open-source project. It is not affiliated with, endorsed by, or sponsored by Centerboard AG or any other school system, company, or institution.',
    },
    {
      q: 'How much does Schuly cost?',
      a: 'Schuly is free. The app, the backend, and the plugin SDK are open source. Source code is on GitHub under github.com/schulydev.',
    },
    {
      q: 'Where is my data stored?',
      a: 'The backend runs on IONOS in Germany. Your data stays in the EU/EEA - no third-country transfer. The marketing site you are reading is on Cloudflare Pages and processes only your IP for delivery.',
    },
    {
      q: 'Does Schuly know my school password?',
      a: 'Your Schuly account runs on an external OIDC provider (Pocket ID by default; the authority is configurable). Schulnetz uses its own OAuth flow, so no password reaches us. OdaOrg currently uses username and password, posted to the OdaOrg plugin and stored only inside that plugin\'s isolated database - never read by, or shared with, the rest of the system.',
    },
    {
      q: 'Can my school system be added?',
      a: 'Yes. The backend loads plugins that wrap each school system - an API wrapper if the system has an API, a scraper if it does not. Once a plugin is installed, the school system shows up in the app\'s "Add school" flow. Plugins are written against the Schuly plugin SDK on GitHub.',
    },
    {
      q: 'I do not trust my data to Schuly. What can I do?',
      a: 'Fair. Schuly is fully open source - the app, the backend, the plugins, the plugin SDK, and this website all live on GitHub at github.com/schulydev. You can read every line of code, audit what we do with your data, and self-host the backend if you want full control. The app can be pointed at your own backend instance; nothing has to go through ours.',
    },
    {
      q: 'Is Schuly open source? Can I contribute?',
      a: 'Yes. Every component - app, backend, plugins, plugin SDK, and this website - is on GitHub at github.com/schulydev. Issues with the "bug" or "feature" label are the easiest place to start.',
    },
  ];

  toggle(index: number) {
    this.open.update(current => (current === index ? null : index));
  }
}
