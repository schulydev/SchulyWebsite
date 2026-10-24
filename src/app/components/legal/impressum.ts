import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LegalPageBase } from './legal-page-base';

@Component({
  selector: 'app-impressum',
  imports: [TranslatePipe],
  styleUrl: './legal-layout.scss',
  template: `
    <section class="legal">
      <div class="legal-container">
        <div class="legal-eyebrow">Legal</div>
        <h1 class="legal-title">{{ 'legal.impressum' | translate }}</h1>
        <p class="legal-updated">{{ 'legal.lastUpdated' | translate }} 25.10.2026</p>

        <div class="legal-body">
          @if (showEn()) {
            <h2>Operator</h2>
            <p>
              <strong>Niclas Erismann</strong><br />
              Switzerland
            </p>

            <h2>Contact</h2>
            <p>
              Email: <a href="mailto:legal&#64;schuly.dev">legal&#64;schuly.dev</a><br />
              GitHub: <a href="https://github.com/PianoNic" target="_blank" rel="noopener">github.com/PianoNic</a>
            </p>
            <p>
              Postal address: [TODO: postal address of the operator]
            </p>

            <h2>Responsible for content</h2>
            <p>Niclas Erismann.</p>

            <h2>Disclaimer</h2>
            <p>
              Content on this site is prepared with the greatest possible care, but no warranty is given as to
              its accuracy, completeness, or timeliness. The use of any content on this site and of the
              software linked from it (Schuly app, SchulyBackend, plugins, SchulwareAPI, SchulyMicrosoft) is at your own risk.
            </p>

            <h2>External links</h2>
            <p>
              This site contains links to third-party websites (notably GitHub and the documentation at
              docs.schuly.dev). I have no influence over their content. Responsibility for the content of linked sites
              lies with the respective provider or operator.
            </p>

            <h2>Trademark notice</h2>
            <p>
              "Schulnetz" is a trademark or product name of Centerboard AG. "Microsoft 365" is a trademark
              of Microsoft Corporation. Schuly is an unofficial, independent open-source hobby project. It
              is not affiliated with, endorsed by, sponsored by, or operated by Centerboard AG, Microsoft,
              OdA Org, or any school. Names of school systems are used only to describe compatibility.
            </p>

            <h2>Note on the imprint requirement</h2>
            <p>
              Schuly is a non-commercial open-source project. The Swiss Unfair Competition Act
              (UWG Art. 3(1)(s)) requires an imprint only for commercial offerings; non-commercial
              services are exempt. This information is provided voluntarily so you always know who
              operates this site.
            </p>

            <h2>Copyright</h2>
            <p>
              The source code is public on GitHub at github.com/schulydev. Licence terms are stated in the
              relevant repository [TODO: add a LICENSE file to each repository; most have none yet]. Text,
              graphics, and screenshots on this site are, unless otherwise marked, the copyright of the
              operator.
            </p>
          } @else {
            @if (showFallbackNotice()) {
              <p class="legal-notice">{{ 'legal.fallbackNotice' | translate: { lang: lang.current() } }}</p>
            }
            <h2>Anbieter</h2>
            <p>
              <strong>Niclas Erismann</strong><br />
              Schweiz
            </p>

            <h2>Kontakt</h2>
            <p>
              E-Mail: <a href="mailto:legal&#64;schuly.dev">legal&#64;schuly.dev</a><br />
              GitHub: <a href="https://github.com/PianoNic" target="_blank" rel="noopener">github.com/PianoNic</a>
            </p>
            <p>
              Postanschrift: [TODO: Postanschrift des Anbieters]
            </p>

            <h2>Verantwortlich für den Inhalt</h2>
            <p>Niclas Erismann.</p>

            <h2>Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website werden mit grösstmöglicher Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen. Die Nutzung der
              auf dieser Website abrufbaren Inhalte und der über sie verlinkten Software (Schuly-App,
              SchulyBackend, Plugins, SchulwareAPI, SchulyMicrosoft) erfolgt auf eigene Gefahr.
            </p>

            <h2>Links auf Drittseiten</h2>
            <p>
              Diese Website enthält Links zu externen Websites Dritter (insbesondere GitHub und die
              Dokumentation unter docs.schuly.dev). Auf deren Inhalte habe ich keinen Einfluss. Für die Inhalte der verlinkten
              Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
            </p>

            <h2>Markenhinweis</h2>
            <p>
              «Schulnetz» ist eine Marke bzw. Produktbezeichnung der Centerboard AG. «Microsoft 365» ist eine
              Marke der Microsoft Corporation. Schuly ist ein inoffizielles, unabhängiges
              Open-Source-Hobby-Projekt. Es steht in keiner Verbindung zur Centerboard AG, zu Microsoft, zu
              OdA Org oder zu einer Schule und wird von diesen weder unterstützt, gesponsert noch betrieben.
              Namen von Schulsystemen werden nur verwendet, um die Kompatibilität zu beschreiben.
            </p>

            <h2>Hinweis zur Impressumspflicht</h2>
            <p>
              Schuly ist ein nicht-kommerzielles Open-Source-Projekt. Eine gesetzliche Impressumspflicht
              nach UWG Art. 3 Abs. 1 lit. s besteht für rein nicht-kommerzielle Angebote nicht. Diese
              Angaben werden freiwillig zur Verfügung gestellt, damit du jederzeit weisst, mit wem du es
              zu tun hast.
            </p>

            <h2>Urheberrecht</h2>
            <p>
              Der Quellcode ist öffentlich auf GitHub unter github.com/schulydev einsehbar. Die
              Lizenzbedingungen stehen im jeweiligen Repository [TODO: LICENSE-Datei in jedem Repository
              ergänzen; die meisten haben noch keine]. Texte, Grafiken und Screenshots auf dieser Website
              sind, sofern nicht anders gekennzeichnet, urheberrechtlich geschützt und gehören dem Anbieter.
            </p>
          }
        </div>
      </div>
    </section>
  `,
})
export class Impressum extends LegalPageBase {}
