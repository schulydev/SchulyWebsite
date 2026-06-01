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
        <p class="legal-updated">{{ lang() === 'de' ? 'Stand:' : 'Last updated:' }} 28.05.2026</p>

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
              schweizerischen Datenschutzgesetzes (revDSG, in Kraft seit 01.09.2023) sowie der
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
              (in Kraft seit 15.09.2024) zertifiziert; ein angemessenes Schutzniveau im Sinn von
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
                <strong>Identitätsdaten deines Schuly-Accounts</strong>, ausgestellt von unserem
                Pocket-ID-OIDC-Anbieter: E-Mail-Adresse, Anzeigename, Profilbild, eindeutige Subject-ID.
              </li>
              <li>
                <strong>Schul-Account-Zugangsdaten</strong>, die du innerhalb der App pro Schul-System
                hinterlegst. Wie diese authentifiziert werden, hängt vom jeweiligen Plugin ab. Tokens
                werden nur in dem für das jeweilige Schul-System zuständigen Plugin verarbeitet.
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
              <li>Für deinen Schuly-Account: kein Passwort, da die Anmeldung über unseren Pocket-ID-OIDC-Anbieter erfolgt.</li>
              <li>Für Schul-Accounts: Zugangsdaten werden nur an das zuständige Plugin weitergegeben und nicht zentral im Schuly-Kern gespeichert.</li>
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
                <strong>Pocket-ID-OIDC-Anbieter</strong> (von uns betrieben, IONOS Deutschland) -
                Authentifizierung deines Schuly-Accounts.
              </li>
              <li>
                <strong>Schul-System(e)</strong>, die du in der App hinterlegt hast - die in den
                jeweiligen Plugins implementierten Endpunkte werden im Rahmen der Synchronisation
                aufgerufen.
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

            <h2>5. Wer ist wofür verantwortlich?</h2>
            <p>
              Schuly ist <strong>kein Schulsystem</strong>, sondern im Kern ein
              <strong>Daten-Cache mit Sync-Funktion</strong>. Deine Noten, Absenzen, Stundenpläne und
              persönlichen Stammdaten werden <strong>von deiner Schule</strong> in deren Schulsystem
              (z.&nbsp;B. Schulnetz) erfasst und gepflegt. Schuly synchronisiert diese Daten in deinem
              Namen und speichert sie als Kopie auf dem Backend (IONOS, Deutschland), damit die App
              schnell und offline funktioniert.
            </p>
            <p>Daraus ergeben sich zwei Verantwortungsbereiche:</p>
            <ul>
              <li>
                <strong>Deine Schule</strong> ist Verantwortliche für die <em>Originaldaten</em>
                (z.&nbsp;B. Noten, Absenzgründe, Klassenzugehörigkeit, Stammdaten). Falsche oder
                veraltete Angaben dort kannst nur die Schule berichtigen.
              </li>
              <li>
                <strong>Schuly</strong> ist Verantwortlicher für die <em>Kopie</em> dieser Daten im
                Backend sowie für die wenigen Daten, die Schuly selbst erhebt (deine OIDC-Identität:
                E-Mail, Anzeigename, Profilbild, Login-Zeitpunkt).
              </li>
            </ul>

            <h2>6. Deine Rechte</h2>
            <p>
              Du hast unter revDSG und DSGVO die folgenden Rechte. Wohin du dich wenden musst, hängt
              davon ab, worum es geht:
            </p>

            <h3>6.1 Rechte gegenüber Schuly</h3>
            <p>Bei uns kannst du folgende Rechte direkt ausüben:</p>
            <ul>
              <li><strong>Auskunft</strong> über die Kopie deiner Daten im Schuly-Backend (Art. 25 revDSG, Art. 15 DSGVO)</li>
              <li><strong>Löschung</strong> der Kopie deiner Daten im Schuly-Backend (Art. 32 revDSG, Art. 17 DSGVO) - die Originaldaten bei deiner Schule bleiben davon unberührt</li>
              <li><strong>Datenübertragbarkeit</strong> der bei uns gespeicherten Daten (Art. 28 revDSG, Art. 20 DSGVO)</li>
              <li><strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)</li>
              <li><strong>Widerruf erteilter Einwilligungen</strong> mit Wirkung für die Zukunft</li>
            </ul>
            <p>
              Kontakt: <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>.
            </p>

            <h3>6.2 Rechte gegenüber deiner Schule</h3>
            <p>Diese Rechte musst du direkt bei deiner Schule geltend machen, da sie die Originaldaten verwaltet:</p>
            <ul>
              <li><strong>Berichtigung</strong> falscher Daten (Art. 32 Abs. 1 revDSG, Art. 16 DSGVO) - z.&nbsp;B. eine falsch erfasste Note oder Absenz. Schuly kann nichts an dem ändern, was das Schulsystem liefert; sobald die Schule es korrigiert, übernimmt es Schuly bei der nächsten Synchronisation.</li>
              <li><strong>Auskunft</strong> über die vollständigen Originaldaten</li>
              <li><strong>Beschwerden</strong> über die Erfassung von Schul-Daten an sich</li>
            </ul>

            <h2>7. Beschwerderecht</h2>
            <p>
              Du kannst dich beim <strong>Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten
              (EDÖB)</strong>, Feldeggweg 1, 3003 Bern -
              <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">edoeb.admin.ch</a> beschweren.
              Wenn du in einem EU-/EWR-Staat wohnst, kannst du dich zusätzlich an die für dich zuständige
              nationale Datenschutzbehörde wenden.
            </p>

            <h2>8. Sicherheit</h2>
            <p>
              Die Übertragung erfolgt durchgehend per TLS. Datenbanken laufen auf verschlüsselten Volumes.
              Eine Spalten-Verschlüsselung für besonders sensible Felder (Noten, Absenzgründe) ist in
              Arbeit (siehe Issue #79 oben). Backend-Plugins laufen in isolierten Datenbanken pro Plugin
              und haben keinen Zugriff auf andere Plugin-Daten oder Kern-Tabellen.
            </p>

            <h2>9. Keine automatisierte Entscheidungsfindung</h2>
            <p>
              Es findet keine automatisierte Einzelentscheidung im Sinn von Art. 21 revDSG / Art. 22 DSGVO
              statt. Schuly bewertet dich nicht und trifft keine automatisierten Entscheidungen über dich.
            </p>

            <h2>10. Änderungen</h2>
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
              01.09.2023) and the EU General Data Protection Regulation (GDPR).
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
              <strong>Swiss-US Data Privacy Framework</strong> (in force since 15.09.2024), which
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
              <li><strong>Schuly-account identity</strong>, issued by our Pocket ID OIDC provider: email, display name, profile picture, subject identifier.</li>
              <li><strong>School-account credentials</strong> you add inside the app per school system. How they authenticate depends on the relevant plugin; tokens are only processed inside that plugin.</li>
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
              <li>For your Schuly account: no password, since authentication runs through our Pocket ID OIDC provider.</li>
              <li>For school accounts: credentials are handed to the relevant plugin only and not stored centrally in the Schuly core.</li>
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
              <li><strong>Pocket ID OIDC provider</strong> (operated by us on IONOS Germany) - authentication for your Schuly account.</li>
              <li><strong>The school system(s)</strong> you have added in the app - their endpoints (as implemented in the relevant plugin) are called during sync.</li>
            </ul>

            <h2>4. Retention</h2>
            <p>
              Cloudflare server logs: up to 30 days. App data: as long as your account is active. On
              request (email <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>) we delete
              your account and all linked data within 30 days. A self-service deletion endpoint is in
              progress (see
              <a href="https://github.com/schulydev/SchulyBackend/issues/79" target="_blank" rel="noopener">Issue #79</a>).
            </p>

            <h2>5. Who is responsible for what?</h2>
            <p>
              Schuly is <strong>not a school system</strong> - at heart it's a
              <strong>data cache with sync</strong>. Your grades, absences, schedule, and personal master
              data are recorded and maintained <strong>by your school</strong> in their school system
              (e.g. Schulnetz). Schuly syncs that data on your behalf and keeps a copy on the backend
              (IONOS, Germany) so the app is fast and works offline.
            </p>
            <p>This creates two distinct areas of responsibility:</p>
            <ul>
              <li>
                <strong>Your school</strong> is controller for the <em>original</em> data
                (e.g. grades, absence reasons, class membership, master data). Only the school can
                correct anything that is wrong or out of date there.
              </li>
              <li>
                <strong>Schuly</strong> is controller for the <em>copy</em> of that data on the
                backend, plus the small amount of data Schuly itself collects (your OIDC identity:
                email, display name, profile picture, login timestamp).
              </li>
            </ul>

            <h2>6. Your rights</h2>
            <p>
              You have the following rights under revDSG and GDPR. Where you exercise them depends on
              what you want:
            </p>

            <h3>6.1 Rights you exercise with Schuly</h3>
            <p>You can exercise these directly with us:</p>
            <ul>
              <li><strong>Access</strong> to the copy of your data on the Schuly backend (Art. 25 revDSG, Art. 15 GDPR)</li>
              <li><strong>Erasure</strong> of the copy on the Schuly backend (Art. 32 revDSG, Art. 17 GDPR) - the original data at your school remains untouched</li>
              <li><strong>Data portability</strong> of what we hold (Art. 28 revDSG, Art. 20 GDPR)</li>
              <li><strong>Restriction of processing</strong> (Art. 18 GDPR)</li>
              <li><strong>Withdrawal of consent</strong>, with effect going forward</li>
            </ul>
            <p>
              Contact: <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>.
            </p>

            <h3>6.2 Rights you exercise with your school</h3>
            <p>Exercise these directly with your school, since they hold the original data:</p>
            <ul>
              <li><strong>Rectification</strong> of inaccurate data (Art. 32(1) revDSG, Art. 16 GDPR) - e.g. a wrongly recorded grade or absence. Schuly cannot change what the school system delivers; as soon as the school corrects it, Schuly picks up the correction on next sync.</li>
              <li><strong>Access</strong> to the complete original record</li>
              <li><strong>Complaints</strong> about the collection of school data as such</li>
            </ul>

            <h2>7. Right to lodge a complaint</h2>
            <p>
              You may complain to the <strong>Federal Data Protection and Information Commissioner (EDÖB)</strong>,
              Feldeggweg 1, 3003 Bern -
              <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">edoeb.admin.ch</a>.
              If you reside in an EU/EEA state, you may additionally contact your national supervisory
              authority.
            </p>

            <h2>8. Security</h2>
            <p>
              All transport uses TLS. Databases run on encrypted volumes. Column-level encryption for
              especially sensitive fields (grades, absence reasons) is in progress (see Issue #79
              above). Backend plugins run against isolated per-plugin databases and cannot access other
              plugins' data or the core tables.
            </p>

            <h2>9. No automated decision-making</h2>
            <p>
              We do not engage in automated individual decision-making within the meaning of
              Art. 21 revDSG / Art. 22 GDPR. Schuly does not score you or make automated decisions
              about you.
            </p>

            <h2>10. Changes</h2>
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
