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
      a: 'Schuly is a free, open-source student portal app. It gives you a modern interface for the school system your school already uses - grades, schedule, agenda, absences, push notifications. Available for iOS, Android, and Web.',
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
      a: 'No. Authentication is delegated to your school\'s identity provider via OIDC. Schuly never sees or stores your password.',
    },
    {
      q: 'Can my school system be added?',
      a: 'If your school system exposes an API and you (or someone) can write a backend plugin against the Schuly plugin SDK, yes. The app itself works with any system that has a plugin - you do not need to choose a plugin in the app.',
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
