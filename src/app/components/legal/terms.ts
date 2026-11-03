import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LegalPageBase } from './legal-page-base';

@Component({
  selector: 'app-terms',
  imports: [TranslatePipe],
  styleUrl: './legal-layout.scss',
  template: `
    <section class="legal">
      <div class="legal-container">
        <div class="legal-eyebrow">Terms</div>
        <h1 class="legal-title">{{ 'legal.terms' | translate }}</h1>
        <p class="legal-updated">{{ 'legal.lastUpdated' | translate }} 03.11.2026</p>

        <div class="legal-body">
          @if (showFallbackNotice()) {
            <p class="legal-notice">{{ 'legal.fallbackNotice' | translate: { lang: lang.current() } }}</p>
          }
          @if (showDe()) {
            <div class="callout">
              <strong>Nutzung auf eigene Gefahr.</strong> Schuly ist ein kostenloses Hobby-Projekt eines
              einzelnen Entwicklers, ohne Garantie für Verfügbarkeit, richtige Daten oder gegen Datenverlust.
              Verbindlich sind nur die Angaben deiner Schule.
            </div>

            <p>
              Diese Bedingungen gelten für die Website schuly.dev, die Schuly-Apps und den von uns betriebenen
              Schuly-Server. Mit der Nutzung stimmst du ihnen zu. Bist du unsicher, was sie für dich bedeuten,
              frag deine Eltern. Wie wir mit Daten umgehen, steht in der
              <a href="/de/privacy">Datenschutzerklärung</a>.
            </p>

            <h2>1. Für wen Schuly ist</h2>
            <p>
              Schuly ist eine kostenlose, inoffizielle App für Schülerinnen und Schüler, die eine Schule in der
              Schweiz besuchen. Unseren Dienst auf schuly.dev bieten wir nur ihnen an, und er unterstützt nur
              Schulsysteme, die in der Schweiz verwendet werden.
            </p>

            <h2>2. Was Schuly macht</h2>
            <p>
              Mit deinen Anmeldedaten holt Schuly Inhalte aus deinem Schulsystem und zeigt sie an. Es besteht kein
              Anspruch auf bestimmte Funktionen, auf einen dauerhaften Betrieb oder auf die Unterstützung eines
              bestimmten Schulsystems. KI-Funktionen wie Helply können falsche Antworten geben, prüfe Wichtiges also selbst.
            </p>

            <h2>3. Inoffizielles Projekt</h2>
            <p>
              Schuly gehört nicht zur Centerboard AG, zu Microsoft, zu OdA Org oder zu deiner Schule, und diese
              betreiben oder unterstützen es nicht. «Schulnetz» ist eine Marke oder ein Produktname der Centerboard AG.
            </p>

            <h2>4. Deine Verantwortung</h2>
            <p>
              Du bist dafür verantwortlich, dass deine Nutzung die Regeln deiner Schule und die Bedingungen der
              verbundenen Dienste einhält. Nicht erlaubt ist insbesondere:
            </p>
            <ul>
              <li>auf Konten oder Daten zuzugreifen, die nicht deine sind,</li>
              <li>Zugriffskontrollen oder Anmeldungen zu umgehen,</li>
              <li>Schulsysteme durch automatisierte Abfragen übermässig zu belasten,</li>
              <li>Schuly für rechtswidrige Zwecke zu nutzen.</li>
            </ul>
            <p>Wir können Konten sperren oder löschen, die gegen diese Regeln verstossen.</p>

            <h2>5. Haftung</h2>
            <p>
              Schuly wird bereitgestellt, wie es ist. Soweit gesetzlich zulässig, schliessen wir jede Haftung aus,
              insbesondere für Datenverlust, falsche oder verspätete Angaben zu Noten, Stundenplan oder Absenzen,
              Ausfälle von Schulsystemen oder unserer Infrastruktur sowie Plugins Dritter.
            </p>

            <h2>6. Eigener Server</h2>
            <p>
              Wer Schuly selbst betreibt, ist für diesen Server und die dort bearbeiteten Personendaten verantwortlich
              und muss die dafür geltenden Datenschutzpflichten selbst einhalten.
            </p>

            <h2>7. Quellcode</h2>
            <p>
              Der Quellcode ist auf <a href="https://github.com/schulydev" target="_blank" rel="noopener">GitHub</a>
              öffentlich. Für die Apps und Dienste gilt die PolyForm Noncommercial License 1.0.0, für die Plugins und den
              Plugin-Vertrag die MIT-Lizenz. Geht eine Lizenz weiter als diese Bedingungen, gilt für den Code die Lizenz.
            </p>

            <h2>8. Änderungen und anwendbares Recht</h2>
            <p>
              Wir passen diese Bedingungen an, wenn sich Funktionen oder rechtliche Anforderungen ändern. Es gilt die hier
              veröffentlichte Fassung mit dem oben genannten Datum. Es gilt Schweizer Recht. Gerichtsstand ist, soweit
              zulässig, der Sitz des Betreibers. Zwingende Bestimmungen zum Schutz von Konsumentinnen und Konsumenten bleiben vorbehalten.
            </p>
          } @else {
            <div class="callout">
              <strong>Use at your own risk.</strong> Schuly is a free hobby project by one developer, with no guarantee of
              availability, correct data, or protection against data loss. Only your school's information is binding.
            </div>

            <p>
              These terms cover the schuly.dev website, the Schuly apps, and the Schuly server we operate. By using them, you
              agree to these terms. If you're unsure what they mean for you, ask a parent. How we handle data is explained in
              the <a href="/en/privacy">Privacy Policy</a>.
            </p>

            <h2>1. Who Schuly is for</h2>
            <p>
              Schuly is a free, unofficial app for students who attend a school in Switzerland. We offer our service at
              schuly.dev only to these students, and it supports only school systems used in Switzerland.
            </p>

            <h2>2. What Schuly does</h2>
            <p>
              Using your login, Schuly fetches content from your school system and shows it. You have no right to specific
              features, to continued operation, or to support for a particular school system. AI features such as Helply can give
              wrong answers, so check anything important yourself.
            </p>

            <h2>3. Unofficial project</h2>
            <p>
              Schuly isn't part of Centerboard AG, Microsoft, OdA Org, or your school, and they don't operate or endorse it.
              "Schulnetz" is a trademark or product name of Centerboard AG.
            </p>

            <h2>4. Your responsibility</h2>
            <p>You're responsible for making sure your use follows your school's rules and the terms of the services you connect. In particular, you may not:</p>
            <ul>
              <li>access accounts or data that aren't yours,</li>
              <li>bypass access controls or sign-in,</li>
              <li>overload school systems with automated requests,</li>
              <li>use Schuly for unlawful purposes.</li>
            </ul>
            <p>We may suspend or delete accounts that break these rules.</p>

            <h2>5. Liability</h2>
            <p>
              Schuly is provided as is. As far as the law allows, we exclude all liability, in particular for data loss, wrong or
              late information about grades, timetables, or absences, outages of school systems or our infrastructure, and
              third-party plugins.
            </p>

            <h2>6. Your own server</h2>
            <p>
              If you run Schuly yourself, you're responsible for that server and the personal data processed on it, and you must
              meet the data protection duties that apply to you.
            </p>

            <h2>7. Source code</h2>
            <p>
              The source code is public on <a href="https://github.com/schulydev" target="_blank" rel="noopener">GitHub</a>. The
              apps and services use the PolyForm Noncommercial License 1.0.0, and the plugins and plugin contract use the MIT
              License. Where a license grants more than these terms, the license applies to the code.
            </p>

            <h2>8. Changes and governing law</h2>
            <p>
              We update these terms when features or legal requirements change. The version published here with the date above
              applies. Swiss law applies. Venue, as far as permitted, is the operator's seat. Mandatory consumer protection rules
              remain unaffected.
            </p>
          }
        </div>
      </div>
    </section>
  `,
})
export class Terms extends LegalPageBase {}
