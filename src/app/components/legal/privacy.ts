import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-privacy',
  imports: [],
  styleUrl: './legal-layout.scss',
  template: `
    <section class="legal">
      <div class="legal-container">
        <div class="legal-eyebrow">Privacy</div>
        <h1 class="legal-title">{{ lang() === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy' }}</h1>
        <p class="legal-updated">{{ lang() === 'de' ? 'Stand:' : 'Last updated:' }} 2026-05-28</p>

        <div class="legal-body">
          <div class="lang-toggle">
            <button [class.active]="lang() === 'de'" (click)="lang.set('de')">Deutsch</button>
            <button [class.active]="lang() === 'en'" (click)="lang.set('en')">English</button>
          </div>

          @if (lang() === 'de') {
            <p>
              Diese Datenschutzerklärung informiert dich darüber, wie wir mit deinen personenbezogenen Daten
              umgehen, wenn du die Website <a href="https://schuly.dev">schuly.dev</a> besuchst oder die
              Schuly-App und das zugehörige Backend nutzt. Die Erklärung erfüllt die Anforderungen des
              schweizerischen Datenschutzgesetzes (revDSG, in Kraft seit 1. September 2023) sowie der
              EU-Datenschutz-Grundverordnung (DSGVO).
            </p>

            <h2>1. Verantwortlicher</h2>
            <p>
              <strong>Niclas Erismann</strong>, Schweiz<br />
              E-Mail: <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>
            </p>

            <h2>2. Welche Daten werden verarbeitet?</h2>

            <h3>2.1 Beim Besuch der Website (schuly.dev)</h3>
            <p>
              Die Website wird über <strong>Cloudflare Pages</strong> (Cloudflare Inc., USA) ausgeliefert.
              Cloudflare verarbeitet beim Aufruf folgende Daten: IP-Adresse, Datum und Uhrzeit, User-Agent,
              Referrer-URL, aufgerufene Ressource, Antwortstatus. Diese Daten sind technisch nötig für die
              Auslieferung und werden gemäss Cloudflare-Logaufbewahrung (in der Regel bis 30 Tage)
              gespeichert. Cloudflare ist nach dem <strong>Swiss-US Data Privacy Framework</strong>
              (in Kraft seit 15. September 2024) zertifiziert; ein angemessenes Schutzniveau im Sinn von
              Art. 16 revDSG ist damit gewährleistet. Rechtsgrundlage: berechtigtes Interesse (Art. 31 Abs. 2
              lit. d revDSG) am sicheren Betrieb der Website.
            </p>
            <p>
              <strong>Backend-Server:</strong> Das SchulyBackend, das die App nutzt, wird bei
              <strong>IONOS SE</strong> in Deutschland betrieben. Es findet <em>keine</em> Übermittlung in
              ein Drittland statt; die App-Daten verbleiben im EU-/EWR-Raum. Mit IONOS besteht ein
              Auftragsverarbeitungsvertrag nach Art. 28 DSGVO bzw. Art. 9 revDSG.
            </p>
            <p>
              Schriftarten (Inter) werden selbst gehostet. Es findet <strong>keine</strong> Übermittlung an
              Google Fonts statt.
            </p>
            <p>
              Beim Aufruf werden die öffentlichen Statistik-Endpunkte von <strong>GitHub</strong>
              (api.github.com) abgefragt (Anzahl Stars, Downloads). Dabei sendet dein Browser deine
              IP-Adresse an GitHub Inc., USA. Rechtsgrundlage: berechtigtes Interesse an Transparenz über
              das Projekt.
            </p>
            <p>
              <strong>Keine</strong> Cookies, <strong>keine</strong> Tracker, <strong>keine</strong>
              Analytics, <strong>keine</strong> Werbung, <strong>keine</strong> Social-Media-Widgets.
            </p>

            <h3>2.2 Bei Nutzung der Schuly-App</h3>
            <p>Wenn du dich in der App anmeldest, werden folgende Daten verarbeitet:</p>
            <ul>
              <li>
                <strong>Identitätsdaten</strong> aus deinem Schul-Login (OIDC): E-Mail-Adresse, Anzeigename,
                Profilbild, eindeutige Subject-ID des Identitätsanbieters.
              </li>
              <li>
                <strong>Schuldaten</strong>, sofern dein Schulsystem sie liefert: Vor- und Nachname,
                private und schulische E-Mail, Telefonnummer, Adresse, Geburtsdatum, Eintritts- und
                Austrittsdatum, Klassenzugehörigkeit, Rolle (Schüler, Lehrperson).
              </li>
              <li>
                <strong>Akademische Daten</strong>: Noten, Notengewichtungen, Semesterzeugnisse,
                Promotionsentscheide, Stundenplan, Termine, Prüfungen.
              </li>
              <li>
                <strong>Absenzen</strong>: Datum, Art (entschuldigt / unentschuldigt) und der von der Schule
                erfasste <em>Grund</em> der Absenz. Diese Angabe kann Gesundheitsinformationen enthalten und
                gilt als <strong>besonders schützenswertes Personendatum</strong> (Art. 5 lit. c revDSG,
                Art. 9 DSGVO).
              </li>
              <li>
                <strong>Schüler-Dokumente</strong>: Dateien und Metadaten, die deine Schule für dich
                hinterlegt hat. Die Speicherung erfolgt in einem S3-kompatiblen Objektspeicher.
              </li>
            </ul>
            <p>
              Rechtsgrundlage: Vertragserfüllung (Art. 31 Abs. 2 lit. a revDSG, Art. 6 Abs. 1 lit. b DSGVO)
              und - für die Absenzgründe - deine ausdrückliche Einwilligung beim erstmaligen App-Login
              (Art. 6 Abs. 7 revDSG, Art. 9 Abs. 2 lit. a DSGVO).
            </p>

            <h3>2.3 Was wir <em>nicht</em> verarbeiten</h3>
            <ul>
              <li>Keine Speicherung deines Schul-Passworts. Die Anmeldung erfolgt ausschliesslich über deinen Schul-OIDC-Anbieter.</li>
              <li>Keine dauerhafte Speicherung von Refresh-Tokens.</li>
              <li>Keine Push-Notification-Tokens (FCM/APNs) im Backend.</li>
              <li>Kein Analytics- oder Telemetry-SDK in der Produktion.</li>
              <li>Kein Logging von Request-Bodies in der Produktion.</li>
            </ul>

            <h2>3. Empfänger / Auftragsverarbeiter</h2>
            <ul>
              <li>
                <strong>Cloudflare Inc.</strong> (USA) - Webhosting für schuly.dev. Swiss-US Data Privacy
                Framework (zertifiziert).
              </li>
              <li>
                <strong>IONOS SE</strong> (Montabaur, Deutschland) - Hosting des SchulyBackends, ISO-27001-
                zertifiziert, AVV nach Art. 28 DSGVO.
              </li>
              <li>
                <strong>GitHub Inc.</strong> (USA) - Quellcode- und Release-Hosting; Quelle der auf der
                Website angezeigten Stern- und Download-Statistiken.
              </li>
              <li>
                <strong>OIDC-Anbieter deiner Schule</strong> - Authentifizierung.
              </li>
            </ul>

            <h2>4. Speicherdauer</h2>
            <p>
              Cloudflare-Server-Logs: bis zu 30 Tage. App-Daten: solange dein Account aktiv ist. Auf
              Wunsch (E-Mail an <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>) löschen
              wir deinen Account und alle damit verbundenen Daten innert 30 Tagen. Eine Self-Service-
              Löschfunktion ist in Vorbereitung (siehe
              <a href="https://github.com/schulydev/SchulyBackend/issues/79" target="_blank" rel="noopener">Issue #79</a>).
            </p>

            <h2>5. Deine Rechte</h2>
            <p>Du hast jederzeit das Recht auf:</p>
            <ul>
              <li>Auskunft über die zu deiner Person gespeicherten Daten (Art. 25 revDSG, Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 32 Abs. 1 revDSG, Art. 16 DSGVO)</li>
              <li>Löschung deiner Daten (Art. 32 revDSG, Art. 17 DSGVO)</li>
              <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 28 revDSG, Art. 20 DSGVO)</li>
              <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft</li>
            </ul>
            <p>
              Wende dich dazu an <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>.
              Für Daten, die deine Schule im Schulsystem führt (Schulnetz / andere), wende dich bitte
              direkt an die Datenschutzverantwortlichen deiner Schule - wir spiegeln diese Daten nur in
              die App.
            </p>

            <h2>6. Beschwerderecht</h2>
            <p>Du kannst dich bei der zuständigen Datenschutzbehörde beschweren:</p>
            <ul>
              <li><strong>Schweiz:</strong> Eidgenössischer Datenschutz- und Öffentlichkeitsbeauftragter (EDÖB), Feldeggweg 1, 3003 Bern - <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">edoeb.admin.ch</a></li>
              <li><strong>Deutschland:</strong> Bundesbeauftragte für den Datenschutz und die Informationsfreiheit (BfDI), Graurheindorfer Str. 153, 53117 Bonn - <a href="https://www.bfdi.bund.de" target="_blank" rel="noopener">bfdi.bund.de</a></li>
              <li><strong>Österreich:</strong> Datenschutzbehörde, Barichgasse 40-42, 1030 Wien - <a href="https://www.dsb.gv.at" target="_blank" rel="noopener">dsb.gv.at</a></li>
            </ul>

            <h2>7. Sicherheit</h2>
            <p>
              Die Übertragung erfolgt durchgehend per TLS. Datenbanken laufen auf verschlüsselten Volumes.
              Eine Spalten-Verschlüsselung für besonders sensible Felder (Noten, Absenzgründe) ist in
              Arbeit (siehe Issue #79 oben). Backend-Plugins laufen in isolierten Datenbanken pro Plugin
              und haben keinen Zugriff auf andere Plugin-Daten oder Kern-Tabellen.
            </p>

            <h2>8. Keine automatisierte Entscheidungsfindung</h2>
            <p>
              Es findet keine automatisierte Einzelentscheidung im Sinn von Art. 21 revDSG / Art. 22 DSGVO
              statt. Schuly bewertet dich nicht und trifft keine automatisierten Entscheidungen über dich.
            </p>

            <h2>9. Änderungen</h2>
            <p>
              Wir können diese Erklärung anpassen, wenn sich Funktionen, Anbieter oder rechtliche
              Anforderungen ändern. Wesentliche Änderungen werden auf dieser Seite mit aktualisiertem
              Stand-Datum veröffentlicht.
            </p>
          } @else {
            <p>
              This Privacy Policy explains how we handle your personal data when you visit
              <a href="https://schuly.dev">schuly.dev</a> or use the Schuly app and its backend. It is
              written to satisfy both the Swiss Federal Act on Data Protection (revDSG, in force since
              1 September 2023) and the EU General Data Protection Regulation (GDPR).
            </p>

            <h2>1. Controller</h2>
            <p>
              <strong>Niclas Erismann</strong>, Switzerland<br />
              Email: <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>
            </p>

            <h2>2. What data we process</h2>

            <h3>2.1 When you visit the website</h3>
            <p>
              The site is served via <strong>Cloudflare Pages</strong> (Cloudflare Inc., USA). On each
              request Cloudflare processes: IP address, date and time, user agent, referrer, requested
              resource, response status. These are required for delivery and are retained per Cloudflare's
              log retention (typically up to 30 days). Cloudflare is certified under the
              <strong>Swiss-US Data Privacy Framework</strong> (in force since 15 September 2024), which
              provides an adequate level of protection within the meaning of Art. 16 revDSG. Legal basis:
              legitimate interest in secure operation of the site (Art. 31(2)(d) revDSG).
            </p>
            <p>
              <strong>Backend servers:</strong> The SchulyBackend used by the app is hosted at
              <strong>IONOS SE</strong> in Germany. There is <em>no</em> transfer to a third country;
              app data stays in the EU/EEA. A data processing agreement under Art. 28 GDPR / Art. 9 revDSG
              is in place with IONOS.
            </p>
            <p>
              The Inter font is self-hosted. <strong>No</strong> request is sent to Google Fonts.
            </p>
            <p>
              On page load, the public <strong>GitHub</strong> API (api.github.com) is called to fetch
              star count and release-download statistics. Your IP is transmitted to GitHub Inc., USA.
              Legal basis: legitimate interest in project transparency.
            </p>
            <p>
              <strong>No</strong> cookies, <strong>no</strong> trackers, <strong>no</strong> analytics,
              <strong>no</strong> ads, <strong>no</strong> social-media widgets.
            </p>

            <h3>2.2 When you use the Schuly app</h3>
            <p>When you sign in, the following data is processed:</p>
            <ul>
              <li><strong>Identity</strong> from your school login (OIDC): email, display name, profile picture, the identity provider's subject identifier.</li>
              <li><strong>School data</strong>, where your school system provides it: first and last name, private and school email, phone, address, date of birth, entry/leave date, class, role (student, teacher).</li>
              <li><strong>Academic data</strong>: grades, weightings, semester reports, promotion decisions, schedule, agenda, exams.</li>
              <li>
                <strong>Absences</strong>: date, type (excused/unexcused), and the <em>reason</em> recorded
                by the school. Since this may include health information, it is treated as a
                <strong>special category of personal data</strong> (Art. 5(c) revDSG, Art. 9 GDPR).
              </li>
              <li><strong>Student documents</strong>: files and metadata your school stores for you, kept in S3-compatible object storage.</li>
            </ul>
            <p>
              Legal basis: contract performance (Art. 31(2)(a) revDSG, Art. 6(1)(b) GDPR) and -
              for absence reasons - your explicit consent at first app login (Art. 6(7) revDSG,
              Art. 9(2)(a) GDPR).
            </p>

            <h3>2.3 What we do <em>not</em> process</h3>
            <ul>
              <li>We do not store your school password. Authentication is delegated to your school's OIDC provider.</li>
              <li>No long-lived storage of refresh tokens.</li>
              <li>No push-notification tokens (FCM/APNs) in the backend.</li>
              <li>No analytics or telemetry SDK in production.</li>
              <li>No request-body logging in production.</li>
            </ul>

            <h2>3. Recipients / processors</h2>
            <ul>
              <li><strong>Cloudflare Inc.</strong> (USA) - website hosting. Swiss-US Data Privacy Framework (certified).</li>
              <li><strong>IONOS SE</strong> (Montabaur, Germany) - SchulyBackend hosting, ISO 27001 certified, Art. 28 GDPR DPA in place.</li>
              <li><strong>GitHub Inc.</strong> (USA) - source-code and release hosting; source of the stats shown on the site.</li>
              <li><strong>Your school's OIDC provider</strong> - authentication.</li>
            </ul>

            <h2>4. Retention</h2>
            <p>
              Cloudflare server logs: up to 30 days. App data: as long as your account is active. On
              request (email <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>) we delete
              your account and all linked data within 30 days. A self-service deletion endpoint is in
              progress (see
              <a href="https://github.com/schulydev/SchulyBackend/issues/79" target="_blank" rel="noopener">Issue #79</a>).
            </p>

            <h2>5. Your rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the data we hold about you (Art. 25 revDSG, Art. 15 GDPR)</li>
              <li>Have inaccurate data rectified (Art. 32(1) revDSG, Art. 16 GDPR)</li>
              <li>Have your data erased (Art. 32 revDSG, Art. 17 GDPR)</li>
              <li>Restrict processing (Art. 18 GDPR)</li>
              <li>Data portability (Art. 28 revDSG, Art. 20 GDPR)</li>
              <li>Withdraw any consent at any time, with effect going forward</li>
            </ul>
            <p>
              Contact <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>. For data your
              school holds in its own school system (Schulnetz or other), please contact your school's
              data protection officer - Schuly only mirrors that data into the app.
            </p>

            <h2>6. Right to lodge a complaint</h2>
            <p>You may complain to the competent supervisory authority:</p>
            <ul>
              <li><strong>Switzerland:</strong> Federal Data Protection and Information Commissioner (EDÖB), Feldeggweg 1, 3003 Bern - <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">edoeb.admin.ch</a></li>
              <li><strong>Germany:</strong> Federal Commissioner for Data Protection and Freedom of Information (BfDI), Graurheindorfer Str. 153, 53117 Bonn - <a href="https://www.bfdi.bund.de" target="_blank" rel="noopener">bfdi.bund.de</a></li>
              <li><strong>Austria:</strong> Datenschutzbehörde, Barichgasse 40-42, 1030 Vienna - <a href="https://www.dsb.gv.at" target="_blank" rel="noopener">dsb.gv.at</a></li>
            </ul>

            <h2>7. Security</h2>
            <p>
              All transport uses TLS. Databases run on encrypted volumes. Column-level encryption for
              especially sensitive fields (grades, absence reasons) is in progress (see Issue #79
              above). Backend plugins run against isolated per-plugin databases and cannot access other
              plugins' data or the core tables.
            </p>

            <h2>8. No automated decision-making</h2>
            <p>
              We do not engage in automated individual decision-making within the meaning of
              Art. 21 revDSG / Art. 22 GDPR. Schuly does not score you or make automated decisions
              about you.
            </p>

            <h2>9. Changes</h2>
            <p>
              We may update this policy when features, providers, or legal requirements change. Material
              changes are published here with an updated "last updated" date.
            </p>
          }
        </div>
      </div>
    </section>
  `,
})
export class Privacy {
  protected lang = signal<'de' | 'en'>('de');
}
