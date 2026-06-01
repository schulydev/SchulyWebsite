import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-terms',
  imports: [TranslatePipe],
  styleUrl: './legal-layout.scss',
  template: `
    <section class="legal">
      <div class="legal-container">
        <div class="legal-eyebrow">Terms</div>
        <h1 class="legal-title">{{ 'legal.terms' | translate }}</h1>
        <p class="legal-updated">{{ 'legal.lastUpdated' | translate }} 28.05.2026</p>

        <div class="legal-body">
          @if (showFallbackNotice()) {
            <p class="legal-notice">{{ 'legal.fallbackNotice' | translate: { lang: lang.current() } }}</p>
          }
          @if (showDe()) {
            <div class="callout">
              <strong>Nutzung auf eigene Gefahr.</strong> Schuly ist ein kostenloses, offenes
              Hobby-Projekt eines einzelnen Entwicklers. Die Software wird ohne jegliche Gewährleistung
              bereitgestellt - weder für Verfügbarkeit, Richtigkeit der angezeigten Schul-Daten noch für
              Datenverlust. Verbindliche Auskünfte zu Noten, Stundenplan und Absenzen erhältst du
              ausschliesslich von deiner Schule.
            </div>

            <p>
              Diese Nutzungsbedingungen regeln die Nutzung der Website schuly.dev und der Schuly-Apps für
              iOS, Android und Web. Mit dem Zugriff auf die Website oder dem Download und der Nutzung der
              App erklärst du dich mit diesen Bedingungen einverstanden.
            </p>

            <h2>1. Leistung</h2>
            <p>
              Schuly ist ein Open-Source-Studierendenportal. Die App stellt Inhalte deines Schulsystems
              (z. B. Schulnetz) in einer modernen Benutzeroberfläche dar. Schuly speichert oder verarbeitet
              keine Schul-Passwörter; die Authentifizierung erfolgt über den OIDC-Anbieter deiner Schule.
            </p>

            <h2>2. Keine Verbindung zu Centerboard AG</h2>
            <p>
              Schuly ist ein unabhängiges Projekt. «Schulnetz» ist eine Marke bzw. Produktbezeichnung
              der Centerboard AG. Es besteht keine vertragliche, gesellschaftsrechtliche oder
              geschäftliche Verbindung zur Centerboard AG. Eine Empfehlung oder Sponsoring durch
              Centerboard AG findet nicht statt.
            </p>

            <h2>3. Eigenverantwortung</h2>
            <p>
              Du bist selbst dafür verantwortlich, dass deine Nutzung von Schuly mit den
              Nutzungsbedingungen, Hausregeln und IT-Richtlinien deiner Schule sowie mit dem Vertrag deiner
              Schule mit der Centerboard AG vereinbar ist. Schuly wird «as is» bereitgestellt; eine Pflicht
              zur Verfügbarkeit oder Lauffähigkeit besteht nicht.
            </p>

            <h2>4. Open-Source-Lizenz</h2>
            <p>
              Der Quellcode der App, des Backends und der Plugins steht unter der jeweils im
              GitHub-Repository angegebenen Open-Source-Lizenz. Diese gilt für die Software selbst und
              hat Vorrang vor Punkt 5 (Haftungsbeschränkung) dieser Bedingungen, soweit sie weitergehende
              Rechte gewährt.
            </p>

            <h2>5. Haftungsbeschränkung</h2>
            <p>
              Die Nutzung von Schuly erfolgt auf eigenes Risiko. Soweit gesetzlich zulässig, schliessen
              wir jede Haftung für direkte, indirekte, mittelbare oder Folgeschäden aus, die aus oder im
              Zusammenhang mit der Nutzung oder Nichtverfügbarkeit der App, der Website oder des Backends
              entstehen. Insbesondere übernehmen wir keine Haftung für:
            </p>
            <ul>
              <li>Datenverlust oder fehlerhafte Daten aus dem Schulsystem,</li>
              <li>verspätete oder unzutreffende Notenanzeige, Stundenplaninformationen oder Absenzen,</li>
              <li>Ausfälle des Schulsystems, des Identitätsanbieters oder unserer Infrastruktur,</li>
              <li>von Dritten geschriebene Backend-Plugins.</li>
            </ul>
            <p>
              Verbindliche Auskünfte über Noten, Stundenpläne, Absenzen, Termine usw. erhältst du
              ausschliesslich von deiner Schule.
            </p>

            <h2>6. Selbstgehostete Instanzen</h2>
            <p>
              Wenn du Schuly oder das SchulyBackend selbst betreibst, bist du in Bezug auf die dort
              verarbeiteten personenbezogenen Daten Verantwortlicher im Sinne von Art. 5 lit. j revDSG
              bzw. Art. 4 Nr. 7 DSGVO. Du bist insbesondere verpflichtet, ein Verzeichnis der
              Bearbeitungstätigkeiten zu führen, geeignete technische und organisatorische Massnahmen
              umzusetzen und die Rechte der betroffenen Personen zu wahren.
            </p>

            <h2>7. Missbrauchsverbot</h2>
            <p>
              Du verpflichtest dich, Schuly nicht zu missbrauchen, insbesondere nicht:
            </p>
            <ul>
              <li>für automatisiertes Auslesen oder Scraping, das die schulischen Systeme über Gebühr belastet,</li>
              <li>zur Umgehung von Zugriffskontrollen oder Authentifizierungsmechanismen,</li>
              <li>zum Zugriff auf Konten oder Daten, die nicht dir gehören,</li>
              <li>für rechtswidrige Zwecke.</li>
            </ul>

            <h2>8. Änderungen</h2>
            <p>
              Wir können diese Nutzungsbedingungen anpassen, wenn sich die Funktionen oder die rechtlichen
              Rahmenbedingungen ändern. Massgeblich ist jeweils die auf dieser Seite veröffentlichte
              Fassung mit aktualisiertem Datum.
            </p>

            <h2>9. Anwendbares Recht und Gerichtsstand</h2>
            <p>
              Diese Bedingungen unterstehen schweizerischem Recht unter Ausschluss kollisionsrechtlicher
              Verweisungsnormen. Gerichtsstand ist - soweit gesetzlich zulässig - der Sitz des Anbieters.
              Zwingende Konsumentenschutzbestimmungen am Wohnsitz des Nutzers bleiben vorbehalten.
            </p>
          } @else {
            <div class="callout">
              <strong>Use at your own risk.</strong> Schuly is a free, open-source hobby project by a
              single developer. The software is provided without any warranty whatsoever - not for
              availability, not for correctness of the school data shown, not for data loss. For binding
              information about grades, schedule, or absences, consult your school directly.
            </div>

            <p>
              These Terms govern your use of the schuly.dev website and the Schuly apps for iOS, Android,
              and Web. By accessing the site or downloading and using the app you agree to these Terms.
            </p>

            <h2>1. Service</h2>
            <p>
              Schuly is an open-source student portal. The app surfaces content from your school system
              (e.g. Schulnetz) in a modern interface. Schuly does not store or process your school
              password; authentication is delegated to your school's OIDC provider.
            </p>

            <h2>2. No affiliation with Centerboard AG</h2>
            <p>
              Schuly is an independent project. "Schulnetz" is a trademark or product name of
              Centerboard AG. There is no contractual, corporate, or commercial relationship with
              Centerboard AG, and no endorsement or sponsorship by Centerboard AG.
            </p>

            <h2>3. Your responsibility</h2>
            <p>
              You are responsible for ensuring that your use of Schuly complies with your school's terms,
              IT rules, and the contract between your school and Centerboard AG. Schuly is provided
              "as is"; there is no obligation as to availability or operability.
            </p>

            <h2>4. Open-source licence</h2>
            <p>
              The source code of the app, backend, and plugins is published under the open-source licence
              stated in the relevant GitHub repository. That licence applies to the software itself and
              takes precedence over Clause 5 (limitation of liability) of these Terms to the extent it
              grants broader rights.
            </p>

            <h2>5. Limitation of liability</h2>
            <p>
              Use of Schuly is at your own risk. To the extent permitted by law we exclude all liability
              for direct, indirect, consequential or incidental damages arising from or in connection
              with the use of, or inability to use, the app, the website, or the backend. In particular,
              we accept no liability for:
            </p>
            <ul>
              <li>data loss or incorrect data from the school system,</li>
              <li>late or inaccurate display of grades, schedule, or absences,</li>
              <li>outages of the school system, the identity provider, or our infrastructure,</li>
              <li>third-party backend plugins.</li>
            </ul>
            <p>
              For binding information about grades, schedules, absences, and dates please consult your
              school directly.
            </p>

            <h2>6. Self-hosted instances</h2>
            <p>
              If you operate Schuly or SchulyBackend yourself, you are the controller within the meaning
              of Art. 5(j) revDSG / Art. 4(7) GDPR for the personal data processed by that instance.
              You are in particular required to keep a Record of Processing Activities, implement
              appropriate technical and organisational measures, and uphold data-subject rights.
            </p>

            <h2>7. No misuse</h2>
            <p>
              You agree not to misuse Schuly, in particular not:
            </p>
            <ul>
              <li>for automated scraping that disproportionately loads school systems,</li>
              <li>to bypass access control or authentication,</li>
              <li>to access accounts or data not your own,</li>
              <li>for unlawful purposes.</li>
            </ul>

            <h2>8. Changes</h2>
            <p>
              We may update these Terms when features or legal requirements change. The version
              published on this page with the current "last updated" date applies.
            </p>

            <h2>9. Governing law and venue</h2>
            <p>
              These Terms are governed by Swiss law, excluding its conflict-of-laws rules. Venue,
              to the extent permitted, is the operator's seat. Mandatory consumer-protection
              provisions of your place of residence remain reserved.
            </p>
          }
        </div>
      </div>
    </section>
  `,
})
export class Terms {
  protected lang = inject(LanguageService);
  protected showDe = computed(() => this.lang.current() !== 'en');
  protected showFallbackNotice = computed(() => !['de', 'en'].includes(this.lang.current()));
}
