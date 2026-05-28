import { Component, signal } from '@angular/core';

interface FaqItem {
  q: string;
  a: string;
}

@Component({
  selector: 'app-faq',
  imports: [],
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
            <details
              class="faq-item"
              [attr.open]="open() === i ? '' : null"
              (toggle)="onToggle(i, $event)"
            >
              <summary class="faq-q">
                <span>{{ item.q }}</span>
                <span class="faq-icon" aria-hidden="true">+</span>
              </summary>
              <div class="faq-a">{{ item.a }}</div>
            </details>
          }
        </div>
      </div>
    </section>
  `,
})
export class Faq {
  protected open = signal<number | null>(0);

  items: FaqItem[] = [
    {
      q: 'What is Schuly?',
      a: 'Schuly is a free, open-source student portal app. It gives you a modern interface for the school systems your schools already use - grades, schedule, agenda, absences, push notifications - and lets you keep multiple schools in one app. Available for iOS, Android, and Web.',
    },
    {
      q: 'Does Schuly work with Schulnetz?',
      a: 'Yes. Schulnetz is supported out of the box via the official Schulware plugin: grades, agenda, absences, exams, push notifications. Schulnetz is currently the most widely used integration.',
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
      a: 'No. Your Schuly account itself runs on Keycloak (OIDC) - Schuly never sees a password there. School accounts are added separately inside the app; how they authenticate depends on the school system\'s plugin, but credentials are scoped to that plugin and never shared across schools.',
    },
    {
      q: 'Can my school system be added?',
      a: 'Yes. The backend loads plugins that wrap each school system - an API wrapper if the system has an API, a scraper if it does not. Once a plugin is installed on the backend, the school simply shows up in the app as a newly supported school. Plugins are written against the Schuly plugin SDK on GitHub.',
    },
    {
      q: 'I do not trust my data to Schuly. What can I do?',
      a: 'Fair. Schuly is fully open source - the app, the backend, the plugins, the plugin SDK, the Keycloak setup, and this website all live on GitHub at github.com/schulydev. You can read every line of code, audit what we do with your data, and if you still prefer your own instance: a ready-made docker-compose brings the entire stack up with one command. The app can then be pointed at your own backend; nothing has to go through ours.',
    },
    {
      q: 'Is Schuly open source? Can I contribute?',
      a: 'Yes. Every component - app, backend, plugins, plugin SDK, and this website - is on GitHub at github.com/schulydev. Issues with the "bug" or "feature" label are the easiest place to start.',
    },
  ];

  onToggle(index: number, event: Event) {
    const el = event.target as HTMLDetailsElement;
    if (el.open) {
      this.open.set(index);
    } else if (this.open() === index) {
      this.open.set(null);
    }
  }
}
