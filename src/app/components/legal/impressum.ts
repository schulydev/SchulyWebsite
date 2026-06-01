import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-impressum',
  imports: [TranslatePipe],
  styleUrl: './legal-layout.scss',
  template: `
    <section class="legal">
      <div class="legal-container">
        <div class="legal-eyebrow">Legal</div>
        <h1 class="legal-title">{{ 'legal.impressum' | translate }}</h1>
        <p class="legal-updated">{{ 'legal.lastUpdated' | translate }} 28.05.2026</p>

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
              A postal address will be provided on reasoned request by email.
            </p>

            <h2>Responsible for content</h2>
            <p>Niclas Erismann.</p>

            <h2>Disclaimer</h2>
            <p>
              Content on this site is prepared with the greatest possible care, but no warranty is given as to
              its accuracy, completeness, or timeliness. The use of any content on this site and of the
              software linked from it (Schuly App, SchulyBackend, plugins) is at your own risk.
            </p>

            <h2>External links</h2>
            <p>
              This site contains links to third-party websites (notably GitHub, the App Store, and Google
              Play). I have no influence over their content. Responsibility for the content of linked sites
              lies with the respective provider or operator.
            </p>

            <h2>Trademark notice</h2>
            <p>
              "Schulnetz" is a trademark or product name of Centerboard AG. Schuly is an
              independent open-source hobby project, not affiliated with, endorsed by, or sponsored by
              Centerboard AG.
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
              Source code is published under the open-source licence stated in the relevant GitHub repository.
              Text, graphics, and screenshots on this site are, unless otherwise marked, the copyright of the
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
              Eine Postanschrift wird auf begründete Anfrage per E-Mail zur Verfügung gestellt.
            </p>

            <h2>Verantwortlich für den Inhalt</h2>
            <p>Niclas Erismann.</p>

            <h2>Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website werden mit grösstmöglicher Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte wird jedoch keine Gewähr übernommen. Die Nutzung der
              auf dieser Website abrufbaren Inhalte und der über sie verlinkten Software (Schuly App,
              SchulyBackend, Plugins) erfolgt auf eigene Gefahr.
            </p>

            <h2>Links auf Drittseiten</h2>
            <p>
              Diese Website enthält Links zu externen Websites Dritter (insbesondere GitHub, App Store,
              Google Play). Auf deren Inhalte habe ich keinen Einfluss. Für die Inhalte der verlinkten
              Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
            </p>

            <h2>Markenhinweis</h2>
            <p>
              «Schulnetz» ist eine Marke bzw. Produktbezeichnung der Centerboard AG.
              Schuly ist ein unabhängiges Open-Source-Hobby-Projekt und steht in keiner Verbindung zur
              Centerboard AG und wird von dieser weder unterstützt noch gesponsert.
            </p>

            <h2>Hinweis zur Impressumspflicht</h2>
            <p>
              Schuly ist ein nicht-kommerzielles Open-Source-Projekt. Eine gesetzliche Impressumspflicht
              nach UWG Art. 3 Abs. 1 lit. s besteht für rein nicht-kommerzielle Angebote nicht. Diese
              Angaben werden freiwillig zur Verfügung gestellt, damit du jederzeit weisst, mit wem du es
              zu tun hast.
            </p>
          }
        </div>
      </div>
    </section>
  `,
})
export class Impressum {
  protected lang = inject(LanguageService);
  protected showEn = computed(() => this.lang.current() === 'en');
  protected showFallbackNotice = computed(() => !['de', 'en'].includes(this.lang.current()));
}
