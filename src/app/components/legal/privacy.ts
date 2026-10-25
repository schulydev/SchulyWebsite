import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { LegalPageBase } from './legal-page-base';

@Component({
  selector: 'app-privacy',
  imports: [TranslatePipe],
  styleUrl: './legal-layout.scss',
  template: `
    <section class="legal">
      <div class="legal-container">
        <div class="legal-eyebrow">Privacy</div>
        <h1 class="legal-title">{{ 'legal.privacy' | translate }}</h1>
        <p class="legal-updated">{{ 'legal.lastUpdated' | translate }} 25.10.2026</p>

        <div class="legal-body">
          @if (showFallbackNotice()) {
            <p class="legal-notice">{{ 'legal.fallbackNotice' | translate: { lang: lang.current() } }}</p>
          }
          @if (showDe()) {
            <p>
              Diese Datenschutzerklärung erklärt, welche Personendaten bearbeitet werden, wenn du die Website
              <a href="https://schuly.dev">schuly.dev</a> besuchst oder die Schuly-App mit dem von uns
              betriebenen Schuly-Server («Schuly Cloud») nutzt. Sie richtet sich in erster Linie nach dem
              schweizerischen Datenschutzgesetz (DSG, in Kraft seit 01.09.2023). Soweit die
              EU-Datenschutz-Grundverordnung (DSGVO) auf dich anwendbar ist, nennen wir zusätzlich die
              entsprechenden Bestimmungen.
            </p>
            <p>
              Schuly ist ein inoffizielles, unabhängiges Projekt. Es steht in keiner Verbindung zur
              Centerboard AG (Herstellerin von Schulnetz), zu deiner Schule, zu OdA Org oder zu Microsoft
              und wird von diesen weder betrieben noch unterstützt.
            </p>

            <h2>1. Verantwortlicher</h2>
            <p>
              <strong>Niclas Erismann</strong>, Schweiz<br />
              E-Mail: <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a><br />
              Weitere Angaben findest du im Impressum.
            </p>
            <p>
              Wenn du in der App unter «Self-hosted» einen eigenen Server einträgst, ist der Betreiber
              dieses Servers für die dort bearbeiteten Daten verantwortlich, nicht wir.
            </p>

            <h2>2. Website (schuly.dev)</h2>
            <p>
              Die Website wird über <strong>Cloudflare Pages</strong> (Cloudflare, Inc., USA) ausgeliefert.
              Dabei verarbeitet Cloudflare technisch notwendige Verbindungsdaten: IP-Adresse, Datum und
              Uhrzeit, aufgerufene Adresse, Referrer, User-Agent und Antwortstatus. Diese Daten werden
              nach den Aufbewahrungsfristen von Cloudflare gelöscht. Zweck ist die sichere und stabile
              Auslieferung der Website (DSGVO: berechtigtes Interesse, Art. 6 Abs. 1 lit. f). Dasselbe gilt
              für die Dokumentation unter <a href="https://docs.schuly.dev" target="_blank" rel="noopener">docs.schuly.dev</a>.
            </p>
            <ul>
              <li>Keine Cookies, keine Tracker, keine Analyse-Tools, keine Werbung.</li>
              <li>Die Schriftart (Inter) wird selbst gehostet; es werden keine Daten an Google Fonts übermittelt.</li>
              <li>
                Deine Sprachwahl wird im lokalen Speicher deines Browsers (localStorage) abgelegt, damit
                die Website sie beim nächsten Besuch kennt. Diese Angabe verlässt dein Gerät nicht.
              </li>
              <li>
                Links zu GitHub, zur Dokumentation oder zu Buy Me a Coffee werden erst beim Anklicken
                aufgerufen; dann gelten die Datenschutzbestimmungen des jeweiligen Anbieters.
              </li>
            </ul>

            <h2>3. Die Schuly-App</h2>
            <p>
              Beim ersten Start wählst du zwischen zwei Modi. Welche Daten wo gespeichert werden, hängt
              davon ab.
            </p>

            <h3>3.1 Schuly-Konto (Kontomodus)</h3>
            <p>
              Dein Schuly-Konto wird von unserem eigenen Anmeldedienst (Keycloak unter
              <strong>auth.schuly.dev</strong>) verwaltet. Gespeichert werden Benutzername, E-Mail-Adresse,
              dein Passwort (nur als Hash) bzw. deine Passkeys, optional ein zweiter Faktor
              (Authenticator-App, Wiederherstellungscodes) und optional ein Profilbild. Für
              Bestätigungscodes erhältst du E-Mails, die über Resend (Resend, Inc.) versendet
              werden.
            </p>
            <p>
              Im Kontomodus synchronisiert der Schuly-Server deine Schuldaten im Hintergrund und speichert
              eine Kopie davon, damit die App schnell öffnet, auf mehreren Geräten gleich aussieht und dich
              benachrichtigen kann. Gespeichert werden, soweit dein Schulsystem sie liefert:
            </p>
            <ul>
              <li><strong>Kontodaten</strong>: E-Mail, Anzeigename, Profilbild, Zeitpunkt der letzten Nutzung.</li>
              <li>
                <strong>Stammdaten aus dem Schulsystem</strong>: Vor- und Nachname, schulische und private
                E-Mail, Telefonnummer, Adresse, Geburtsdatum, Ein- und Austrittsdatum, Rolle, Profilbild.
              </li>
              <li>
                <strong>Schuldaten</strong>: Schule und Klassen, Lehrpersonen (Name, Kürzel, E-Mail), Noten
                und Gewichtungen, Prüfungen, Stundenplan und Agenda, Semesterzeugnisse, Dokumente, die deine
                Schule für dich bereitstellt.
              </li>
              <li>
                <strong>Absenzen</strong>: Zeitraum, Art (entschuldigt / unentschuldigt) und der von der
                Schule erfasste Grund. Der Grund kann Gesundheitsangaben enthalten; solche Angaben gelten
                als <strong>besonders schützenswerte Personendaten</strong> (Art. 5 lit. c DSG, Art. 9 DSGVO).
              </li>
              <li>
                <strong>Zugangsdaten zu deinen Schul- und Microsoft-Konten</strong>, verschlüsselt in einem
                Tresor auf dem Server (siehe Ziffer 9):
                <ul>
                  <li>
                    <strong>Schulnetz</strong>: Deine Schul-E-Mail, dein Passwort und ein allfälliges
                    2FA-Secret werden nur für die Anmeldung verwendet und nicht gespeichert. Gespeichert
                    werden die daraus entstehenden Sitzungs-Tokens und Sitzungs-Cookies, damit die
                    Synchronisation ohne erneute Anmeldung funktioniert.
                  </li>
                  <li>
                    <strong>OdA Org</strong>: Benutzername und Passwort werden gespeichert, weil das Portal
                    keine andere Möglichkeit für eine erneute Anmeldung bietet.
                  </li>
                  <li>
                    <strong>Microsoft 365</strong> (nur wenn du ein Microsoft-Konto verknüpfst): ein
                    Refresh-Token sowie die Sitzungs-Cookies der Microsoft-Anmeldung, damit die Verbindung
                    bestehen bleibt. Dein Microsoft-Passwort wird nie gespeichert.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Push-Benachrichtigungen</strong> (wenn aktiviert): Geräte-Token, Plattform, Sprache
                und deine Benachrichtigungseinstellungen.
              </li>
            </ul>

            <h3>3.2 Privater Modus</h3>
            <p>
              Im privaten Modus gibt es kein Schuly-Konto. Deine Schul-Zugangsdaten und Sitzungen werden nur
              im sicheren Speicher deines Geräts abgelegt. Die Anfragen an dein Schulsystem laufen über einen
              zustandslosen Proxy auf dem Schuly-Server: Die Daten (inklusive der für die Anmeldung nötigen
              Zugangsdaten) werden durchgeleitet, aber auf dem Server <strong>nicht gespeichert</strong>.
              Hintergrund-Synchronisation und Push-Benachrichtigungen gibt es in diesem Modus nicht.
            </p>

            <h3>3.3 Auf deinem Gerät</h3>
            <p>
              In beiden Modi speichert die App die zuletzt geladenen Schuldaten und deine Einstellungen auf
              deinem Gerät. Secrets, die du im integrierten Authenticator hinterlegst, bleiben ausschliesslich
              auf deinem Gerät und werden nicht an den Server übertragen.
            </p>

            <h3>3.4 Server-Protokolle</h3>
            <p>
              Der Schuly-Server schreibt technische Betriebsprotokolle. Inhalte von Anfragen (z. B.
              Zugangsdaten oder Schuldaten) werden im Produktivbetrieb nicht protokolliert. IP-Adressen
              werden für die Begrenzung von Anfragen ohne Anmeldung (Rate Limiting) verwendet.
              Aufbewahrungsdauer der Protokolle: [TODO: Aufbewahrungsdauer der Server-Logs].
            </p>

            <h2>4. Zwecke und Rechtsgrundlagen</h2>
            <p>
              Wir bearbeiten deine Daten, um dir die von dir gewünschte Funktion bereitzustellen: deine
              Schuldaten abrufen, anzeigen, synchronisieren und dich über Neuigkeiten benachrichtigen. Wir
              verkaufen keine Daten, werten sie nicht für Werbung aus und geben sie nur an die in Ziffer 5
              genannten Empfänger weiter.
            </p>
            <p>
              Soweit die DSGVO anwendbar ist, stützen wir uns auf die Erfüllung des Nutzungsverhältnisses
              (Art. 6 Abs. 1 lit. b), für Protokolle und Sicherheit auf unser berechtigtes Interesse
              (Art. 6 Abs. 1 lit. f) und für Absenzgründe mit Gesundheitsangaben auf deine ausdrückliche
              Einwilligung (Art. 9 Abs. 2 lit. a). [TODO: Die App holt derzeit keine ausdrückliche
              Einwilligung für Absenzgründe ein. Einwilligungsschritt ergänzen oder Rechtsgrundlage neu
              beurteilen.]
            </p>

            <h2>5. Empfänger und Auftragsbearbeiter</h2>
            <ul>
              <li>
                <strong>Hosting des Schuly-Servers</strong> (Backend, Anmeldedienst, Datenbank,
                Dokumentenspeicher, SchulwareAPI): [TODO: Hosting-Anbieter und Serverstandort].
              </li>
              <li>
                <strong>Cloudflare, Inc.</strong> (USA): Auslieferung von schuly.dev und docs.schuly.dev.
              </li>
              <li>
                <strong>SchulwareAPI</strong> (von uns betrieben): stellt die Verbindung zu Schulnetz her.
                Zugangsdaten werden nur für die Anmeldung verwendet; der Dienst speichert nichts. Für die
                Fehlerüberwachung kann GlitchTip eingesetzt werden; dabei werden IP-Adresse, User-Agent und
                aufgerufene Adresse übermittelt, aber keine Passwörter, Tokens oder Cookies.
                [TODO: Ob GlitchTip im Produktivbetrieb aktiv ist und wo es gehostet wird.]
              </li>
              <li>
                <strong>SchulyMicrosoft</strong> (von uns betrieben, nur bei verknüpftem Microsoft-Konto):
                ruft die Microsoft-Daten ab und speichert selbst nichts. [TODO: Hosting-Anbieter und
                Standort des SchulyMicrosoft-Dienstes].
              </li>
              <li>
                <strong>Dein Schulsystem</strong>: das Schulnetz deiner Schule (Centerboard AG) bzw. das
                OdA-Org-Portal. Schuly ruft es in deinem Auftrag mit deinen Zugangsdaten ab. Für
                Push-Benachrichtigungen registriert Schuly bei Schulnetz ein Gerät, damit Schulnetz
                Benachrichtigungen an Schuly sendet.
              </li>
              <li>
                <strong>Microsoft</strong> (Microsoft Corporation, USA, bzw. Microsoft Ireland Operations Ltd.):
                Bei Schulen mit Microsoft-Anmeldung erfolgt die Schulnetz-Anmeldung über Microsoft. Wenn du
                ein Microsoft-365-Konto verknüpfst, liest Schuly über Microsoft Graph nur lesend Profil,
                E-Mails, Kalender, OneDrive-Dateien, Teams-Chats und OneNote-Notizbücher.
              </li>
              <li>
                <strong>Google Firebase Cloud Messaging</strong> (Google LLC, USA, bzw. Google Ireland Ltd.):
                Zustellung von Push-Benachrichtigungen. Übermittelt werden das Geräte-Token und der Inhalt der
                Benachrichtigung (z. B. Fach und, falls du das aktiviert hast, der Notenwert).
              </li>
              <li>
                <strong>GitHub, Inc.</strong> (USA): Quellcode und App-Downloads. Daten fallen nur an, wenn du
                GitHub aufrufst.
              </li>
            </ul>

            <h2>6. Bekanntgabe ins Ausland</h2>
            <p>
              Cloudflare, Google, Microsoft, GitHub und Resend können Daten in den USA oder anderen Ländern
              bearbeiten. Für die USA gilt für zertifizierte Unternehmen das Swiss-U.S. Data Privacy
              Framework (vom Bundesrat seit 15.09.2024 als angemessen anerkannt), im Übrigen verwenden diese
              Anbieter die Standardvertragsklauseln. Der Standort des Schuly-Servers: [TODO: Land des
              Serverstandorts].
            </p>

            <h2>7. Aufbewahrung</h2>
            <ul>
              <li>Kontodaten und synchronisierte Schuldaten: solange dein Schuly-Konto besteht.</li>
              <li>
                Automatische Bereinigung: Zwischengespeicherte Schuldaten werden 6 Monate nach dem
                Austrittsdatum aus der Schule gelöscht. Konten, mit denen du dich 12 Monate lang nicht
                angemeldet hast, werden samt Daten gelöscht. Dein Anmeldekonto bei auth.schuly.dev wird von
                dieser automatischen Bereinigung derzeit nicht entfernt; du kannst es jederzeit selbst
                löschen (Ziffer 8).
              </li>
              <li>Privater Modus: Auf dem Server wird nichts gespeichert.</li>
              <li>Server-Protokolle: siehe Ziffer 3.4.</li>
              <li>Website-Verbindungsdaten: nach den Fristen von Cloudflare.</li>
            </ul>

            <h2>8. Export und Löschung in der App</h2>
            <p>
              In der App unter <strong>Einstellungen → Datenschutz</strong> kannst du:
            </p>
            <ul>
              <li>
                <strong>Deine Daten exportieren</strong>: eine JSON-Datei mit deinem Profil, deinen
                Schul-Stammdaten, Agenda, Semesterzeugnissen und Dokumenten.
              </li>
              <li>
                <strong>Dein Konto löschen</strong>: Dabei werden deine Konto- und Schuldaten, deine
                Dokumente und dein Anmeldekonto bei auth.schuly.dev gelöscht.
                [TODO: Die Kontolöschung entfernt derzeit noch nicht die im Tresor gespeicherten
                Zugangsdaten und die Konto-Einträge der Plugins (siehe AccountPurger.cs im SchulyBackend).
                Vor der Veröffentlichung beheben oder hier beschreiben.]
              </li>
            </ul>
            <p>
              Du kannst uns dafür auch an <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>
              schreiben.
            </p>

            <h2>9. Sicherheit</h2>
            <p>
              Alle Verbindungen sind per TLS verschlüsselt. Gespeicherte Zugangsdaten liegen in einem
              Tresor, der mit AES-256-GCM und einem eigenen Schlüssel pro Plugin verschlüsselt ist.
              Dokumente werden vor dem Speichern verschlüsselt. Die übrigen Schuldaten (z. B. Noten und
              Absenzen) sind in der Datenbank nicht zusätzlich auf Feldebene verschlüsselt.
            </p>

            <h2>10. Wer ist wofür verantwortlich?</h2>
            <p>
              Schuly ist <strong>kein Schulsystem</strong>. Deine Noten, Absenzen, Stundenpläne und
              Stammdaten werden <strong>von deiner Schule</strong> in deren Schulsystem erfasst. Schuly ruft
              sie in deinem Auftrag ab und speichert im Kontomodus eine Kopie.
            </p>
            <ul>
              <li>
                <strong>Deine Schule</strong> ist für die <em>Originaldaten</em> verantwortlich. Falsche
                Angaben kann nur die Schule berichtigen; Schuly übernimmt die Korrektur bei der nächsten
                Synchronisation.
              </li>
              <li>
                <strong>Schuly</strong> ist für die <em>Kopie</em> im Kontomodus, für dein Schuly-Konto und
                für die gespeicherten Zugangsdaten verantwortlich.
              </li>
            </ul>

            <h2>11. Deine Rechte</h2>
            <p>
              Du hast insbesondere das Recht auf Auskunft (Art. 25 DSG), Herausgabe oder Übertragung deiner
              Daten (Art. 28 DSG), Berichtigung und Löschung (Art. 32 DSG) sowie, soweit die DSGVO anwendbar
              ist, die Rechte nach Art. 15-21 DSGVO und das Recht, eine Einwilligung jederzeit mit Wirkung
              für die Zukunft zu widerrufen. Für die Kopie bei Schuly wende dich an
              <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>; für die Originaldaten an
              deine Schule.
            </p>

            <h2>12. Keine automatisierten Entscheidungen</h2>
            <p>
              Schuly trifft keine automatisierten Einzelentscheidungen im Sinn von Art. 21 DSG bzw.
              Art. 22 DSGVO und erstellt kein Profiling.
            </p>

            <h2>13. Beschwerde</h2>
            <p>
              Du kannst dich beim <strong>Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten
              (EDÖB)</strong>, Feldeggweg 1, 3003 Bern, beschweren
              (<a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">edoeb.admin.ch</a>).
              Wenn du in der EU bzw. im EWR wohnst, kannst du dich auch an die Datenschutzbehörde in deinem
              Land wenden.
            </p>

            <h2>14. Änderungen</h2>
            <p>
              Wir passen diese Erklärung an, wenn sich Funktionen, Anbieter oder rechtliche Anforderungen
              ändern. Es gilt die auf dieser Seite veröffentlichte Fassung mit dem oben genannten Datum.
            </p>
          } @else {
            <p>
              This Privacy Policy explains which personal data is processed when you visit
              <a href="https://schuly.dev">schuly.dev</a> or use the Schuly app with the Schuly server we
              operate ("Schuly Cloud"). It is written primarily under the Swiss Federal Act on Data
              Protection (FADP / revDSG, in force since 01.09.2023). Where the EU General Data Protection
              Regulation (GDPR) applies to you, the corresponding provisions are named as well.
            </p>
            <p>
              Schuly is an unofficial, independent project. It is not affiliated with, endorsed by, or
              operated by Centerboard AG (maker of Schulnetz), your school, OdA Org, or Microsoft.
            </p>

            <h2>1. Controller</h2>
            <p>
              <strong>Niclas Erismann</strong>, Switzerland<br />
              Email: <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a><br />
              See the Legal Notice for further details.
            </p>
            <p>
              If you enter your own server under "Self-hosted" in the app, the operator of that server is
              responsible for the data processed there, not us.
            </p>

            <h2>2. Website (schuly.dev)</h2>
            <p>
              The site is served via <strong>Cloudflare Pages</strong> (Cloudflare, Inc., USA). Cloudflare
              processes the connection data needed for delivery: IP address, date and time, requested URL,
              referrer, user agent, and response status. This data is deleted according to Cloudflare's
              retention periods. The purpose is secure and reliable delivery of the site (GDPR: legitimate
              interest, Art. 6(1)(f)). The same applies to the documentation at
              <a href="https://docs.schuly.dev" target="_blank" rel="noopener">docs.schuly.dev</a>.
            </p>
            <ul>
              <li>No cookies, no trackers, no analytics, no ads.</li>
              <li>The Inter font is self-hosted; nothing is sent to Google Fonts.</li>
              <li>
                Your language choice is saved in your browser's local storage (localStorage) so the site
                remembers it on your next visit. It never leaves your device.
              </li>
              <li>
                Links to GitHub, the documentation, or Buy Me a Coffee are only loaded when you click them;
                the respective provider's privacy policy then applies.
              </li>
            </ul>

            <h2>3. The Schuly app</h2>
            <p>
              On first launch you choose between two modes. Which data is stored where depends on that
              choice.
            </p>

            <h3>3.1 Schuly account (account mode)</h3>
            <p>
              Your Schuly account is managed by our own sign-in service (Keycloak at
              <strong>auth.schuly.dev</strong>). It stores your username, email address, your password
              (as a hash only) or passkeys, an optional second factor (authenticator app, recovery codes),
              and an optional profile picture. Verification-code emails are sent via Resend
              (Resend, Inc.).
            </p>
            <p>
              In account mode the Schuly server syncs your school data in the background and keeps a copy,
              so the app opens fast, looks the same on all your devices, and can notify you. Where your
              school system provides it, the following is stored:
            </p>
            <ul>
              <li><strong>Account data</strong>: email, display name, profile picture, time of last use.</li>
              <li>
                <strong>Master data from the school system</strong>: first and last name, school and private
                email, phone number, address, date of birth, entry and leave dates, role, profile picture.
              </li>
              <li>
                <strong>School data</strong>: school and classes, teachers (name, abbreviation, email), grades
                and weightings, exams, timetable and agenda, semester reports, documents your school provides
                for you.
              </li>
              <li>
                <strong>Absences</strong>: period, type (excused / unexcused), and the reason recorded by the
                school. The reason may include health information, which is
                <strong>sensitive personal data</strong> (Art. 5(c) FADP, Art. 9 GDPR).
              </li>
              <li>
                <strong>Login data for your school and Microsoft accounts</strong>, encrypted in a vault on
                the server (see section 9):
                <ul>
                  <li>
                    <strong>Schulnetz</strong>: your school email, password, and any 2FA secret are used only
                    to sign in and are not stored. The resulting session tokens and session cookies are
                    stored so syncing works without signing in again.
                  </li>
                  <li>
                    <strong>OdA Org</strong>: username and password are stored, because the portal offers no
                    other way to sign in again.
                  </li>
                  <li>
                    <strong>Microsoft 365</strong> (only if you link a Microsoft account): a refresh token and
                    the Microsoft sign-in session cookies, to keep the connection alive. Your Microsoft
                    password is never stored.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Push notifications</strong> (if enabled): device token, platform, language, and your
                notification settings.
              </li>
            </ul>

            <h3>3.2 Private mode</h3>
            <p>
              In private mode there is no Schuly account. Your school login data and sessions are kept only
              in your device's secure storage. Requests to your school system go through a stateless proxy
              on the Schuly server: the data (including the login data needed to sign in) passes through but
              is <strong>not stored</strong> on the server. Background sync and push notifications are not
              available in this mode.
            </p>

            <h3>3.3 On your device</h3>
            <p>
              In both modes the app keeps the most recently loaded school data and your settings on your
              device. Secrets you add to the built-in authenticator stay on your device only and are never
              sent to the server.
            </p>

            <h3>3.4 Server logs</h3>
            <p>
              The Schuly server writes technical operating logs. Request contents (such as login data or
              school data) are not logged in production. IP addresses are used to rate-limit requests made
              without signing in. Log retention: [TODO: server log retention period].
            </p>

            <h2>4. Purposes and legal basis</h2>
            <p>
              We process your data to provide the features you ask for: fetching, displaying, and syncing
              your school data and notifying you about changes. We do not sell data, do not use it for
              advertising, and only share it with the recipients listed in section 5.
            </p>
            <p>
              Where the GDPR applies, we rely on performance of the user relationship (Art. 6(1)(b)), our
              legitimate interest for logs and security (Art. 6(1)(f)), and your explicit consent for absence
              reasons containing health information (Art. 9(2)(a)). [TODO: The app does not currently ask for
              explicit consent for absence reasons. Add a consent step or reassess the legal basis.]
            </p>

            <h2>5. Recipients and processors</h2>
            <ul>
              <li>
                <strong>Hosting of the Schuly server</strong> (backend, sign-in service, database, document
                storage, SchulwareAPI): [TODO: hosting provider and server location].
              </li>
              <li><strong>Cloudflare, Inc.</strong> (USA): delivery of schuly.dev and docs.schuly.dev.</li>
              <li>
                <strong>SchulwareAPI</strong> (operated by us): connects to Schulnetz. Login data is used only
                to sign in; the service stores nothing. GlitchTip may be used for error monitoring; it
                receives IP address, user agent, and requested URL, but no passwords, tokens, or cookies.
                [TODO: whether GlitchTip is enabled in production and where it is hosted.]
              </li>
              <li>
                <strong>SchulyMicrosoft</strong> (operated by us, only with a linked Microsoft account):
                fetches your Microsoft data and stores nothing itself. [TODO: hosting provider and location of
                the SchulyMicrosoft service].
              </li>
              <li>
                <strong>Your school system</strong>: your school's Schulnetz (Centerboard AG) or the OdA Org
                portal. Schuly accesses it on your behalf with your login data. For push notifications, Schuly
                registers a device with Schulnetz so Schulnetz sends its notifications to Schuly.
              </li>
              <li>
                <strong>Microsoft</strong> (Microsoft Corporation, USA, or Microsoft Ireland Operations Ltd.):
                at schools that use Microsoft sign-in, the Schulnetz login runs through Microsoft. If you link a
                Microsoft 365 account, Schuly reads (read-only) your profile, mail, calendar, OneDrive files,
                Teams chats, and OneNote notebooks via Microsoft Graph.
              </li>
              <li>
                <strong>Google Firebase Cloud Messaging</strong> (Google LLC, USA, or Google Ireland Ltd.):
                delivery of push notifications. It receives the device token and the notification content
                (e.g. the subject and, if you enabled it, the grade value).
              </li>
              <li>
                <strong>GitHub, Inc.</strong> (USA): source code and app downloads. Data is only processed when
                you visit GitHub.
              </li>
            </ul>

            <h2>6. Transfers abroad</h2>
            <p>
              Cloudflare, Google, Microsoft, GitHub, and Resend may process data in the USA or other countries. For
              certified US companies the Swiss-U.S. Data Privacy Framework applies (recognised as adequate by
              the Swiss Federal Council since 15.09.2024); otherwise these providers use standard contractual
              clauses. Location of the Schuly server: [TODO: country of the server location].
            </p>

            <h2>7. Retention</h2>
            <ul>
              <li>Account data and synced school data: for as long as your Schuly account exists.</li>
              <li>
                Automatic clean-up: cached school data is deleted 6 months after your leave date at that
                school. Accounts that have not signed in for 12 months are deleted together with their data.
                Your sign-in account at auth.schuly.dev is currently not removed by this automatic clean-up;
                you can delete it yourself at any time (section 8).
              </li>
              <li>Private mode: nothing is stored on the server.</li>
              <li>Server logs: see section 3.4.</li>
              <li>Website connection data: per Cloudflare's retention periods.</li>
            </ul>

            <h2>8. Export and deletion in the app</h2>
            <p>In the app under <strong>Settings → Privacy</strong> you can:</p>
            <ul>
              <li>
                <strong>Export your data</strong>: a JSON file with your profile, school master data, agenda,
                semester reports, and documents.
              </li>
              <li>
                <strong>Delete your account</strong>: this deletes your account and school data, your
                documents, and your sign-in account at auth.schuly.dev.
                [TODO: Account deletion does not yet remove the login data stored in the vault or the plugins'
                account records (see AccountPurger.cs in SchulyBackend). Fix before publishing or describe
                here.]
              </li>
            </ul>
            <p>
              You can also email <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>.
            </p>

            <h2>9. Security</h2>
            <p>
              All connections use TLS. Stored login data is kept in a vault encrypted with AES-256-GCM and a
              separate key per plugin. Documents are encrypted before they are stored. The remaining school
              data (e.g. grades and absences) is not additionally encrypted at field level in the database.
            </p>

            <h2>10. Who is responsible for what?</h2>
            <p>
              Schuly is <strong>not a school system</strong>. Your grades, absences, timetable, and master data
              are recorded <strong>by your school</strong> in its school system. Schuly fetches them on your
              behalf and, in account mode, keeps a copy.
            </p>
            <ul>
              <li>
                <strong>Your school</strong> is responsible for the <em>original</em> data. Only the school can
                correct it; Schuly picks up the correction on the next sync.
              </li>
              <li>
                <strong>Schuly</strong> is responsible for the <em>copy</em> in account mode, your Schuly
                account, and the stored login data.
              </li>
            </ul>

            <h2>11. Your rights</h2>
            <p>
              You have in particular the right of access (Art. 25 FADP), to receive or transfer your data
              (Art. 28 FADP), to rectification and erasure (Art. 32 FADP) and, where the GDPR applies, the
              rights under Art. 15-21 GDPR and the right to withdraw consent at any time with effect for the
              future. For the copy held by Schuly contact
              <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>; for the original data, contact
              your school.
            </p>

            <h2>12. No automated decisions</h2>
            <p>
              Schuly makes no automated individual decisions within the meaning of Art. 21 FADP / Art. 22 GDPR
              and does no profiling.
            </p>

            <h2>13. Complaints</h2>
            <p>
              You may complain to the <strong>Federal Data Protection and Information Commissioner
              (FDPIC / EDÖB)</strong>, Feldeggweg 1, 3003 Bern
              (<a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">edoeb.admin.ch</a>). If you
              live in the EU/EEA, you may also contact the data protection authority in your country.
            </p>

            <h2>14. Changes</h2>
            <p>
              We update this policy when features, providers, or legal requirements change. The version
              published on this page with the date above applies.
            </p>
          }
        </div>
      </div>
    </section>
  `,
})
export class Privacy extends LegalPageBase {}
