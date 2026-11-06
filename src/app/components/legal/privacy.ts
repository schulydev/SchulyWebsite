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
        <h1 class="legal-title">{{ 'legal.privacy' | translate }}</h1>
        <p class="legal-updated">{{ 'legal.lastUpdated' | translate }} 04.11.2026</p>

        <div class="legal-body">
          @if (showFallbackNotice()) {
            <p class="legal-notice">{{ 'legal.fallbackNotice' | translate: { lang: lang.current() } }}</p>
          }
          @if (showDe()) {
            <h2>1. Wer wir sind und für wen Schuly ist</h2>
            <p>
              Schuly ist eine kostenlose, unabhängige App für Schülerinnen und Schüler, die eine Schule in der
              Schweiz besuchen. Unseren Dienst auf schuly.dev bieten wir nur ihnen an, und er unterstützt nur
              Schulsysteme, die in der Schweiz verwendet werden. Schuly gehört nicht zu deiner Schule, zur
              Centerboard AG (Schulnetz), zu OdA Org oder zu Microsoft.
            </p>
            <p>
              Verantwortlich ist <strong>Niclas Erismann</strong>, Schweiz:
              <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>. Wenn du in der App einen eigenen
              Server einträgst, ist dessen Betreiber verantwortlich. Bist du unsicher, was das für dich bedeutet,
              frag deine Eltern.
            </p>

            <h2>2. Zwei Arten, Schuly zu nutzen</h2>
            <ul>
              <li>
                <strong>Schuly-Konto:</strong> Der Server holt deine Schuldaten im Hintergrund und speichert eine
                Kopie, damit die App schnell startet und dich benachrichtigen kann.
              </li>
              <li>
                <strong>Privater Modus:</strong> Es gibt kein Konto. Deine Anmeldedaten und Schuldaten bleiben auf
                deinem Gerät. Sie laufen bei jeder Anfrage durch unseren Server, werden dort aber nicht gespeichert.
              </li>
            </ul>

            <h2>3. Welche Daten wir bearbeiten</h2>
            <p>Die Daten stammen von dir und von den Schulsystemen, die du verbindest.</p>
            <ul>
              <li><strong>Konto:</strong> Benutzername, E-Mail, Passwort als Hash, Zweitfaktor, Profilbild, angemeldete Geräte mit IP-Adresse und Browser, Zeitpunkt der letzten Nutzung, deine Bestätigung des Datenschutzhinweises.</li>
              <li><strong>Schuldaten:</strong> Name, Schule, Klassen, Lehrpersonen, Noten, Prüfungen, Stundenplan, Semesterzeugnisse und Dokumente.</li>
              <li><strong>Absenzen:</strong> Zeitraum, Status und Grund. <strong>Der Grund kann Gesundheitsdaten enthalten</strong>, also besonders schützenswerte Daten.</li>
              <li><strong>Microsoft 365</strong> (nur wenn du ein Konto verknüpfst): E-Mails, Kalender, Dateien, Microsoft-Teams-Chats und Notizen. Diese Inhalte können auch Daten anderer Personen enthalten, etwa von Lehrpersonen und Mitschülern.</li>
              <li><strong>Benachrichtigungen:</strong> Geräte-Token und deine Einstellungen.</li>
              <li><strong>Technische Daten:</strong> Server-Protokolle und ein Sicherheitsprotokoll über Anmeldungen und Löschungen.</li>
            </ul>
            <p>Bei der Registrierung prüfen wir, ob deine IP-Adresse zu einem Schweizer Netz gehört. Das Ergebnis wird nicht gespeichert.</p>

            <h2>4. Gespeicherte Anmeldedaten</h2>
            <ul>
              <li><strong>Schulnetz:</strong> Sitzungs-Tokens und Cookies, kein Passwort.</li>
              <li><strong>OdA Org:</strong> Benutzername und Passwort, weil das Portal keine andere erneute Anmeldung erlaubt.</li>
              <li><strong>Microsoft:</strong> Refresh-Token und Cookies. Dein Microsoft-Passwort speichern wir nicht.</li>
            </ul>
            <p>Diese Daten geben Zugriff auf die jeweiligen Konten. Sie liegen verschlüsselt auf dem Server und werden entfernt, wenn du die Verbindung trennst.</p>

            <h2>5. Wozu</h2>
            <p>
              Wir bearbeiten Daten, um deine Schuldaten anzuzeigen und zu aktualisieren, dich zu benachrichtigen,
              die von dir genutzten Funktionen bereitzustellen und den Dienst zu schützen. Wir verkaufen keine Daten
              und zeigen keine Werbung. Die Website nutzt keine Tracker und keine Analyse-Tools.
            </p>

            <h2>6. KI-Funktionen</h2>
            <p>
              <strong>Helply</strong> ist eine KI, keine Person, und kann sich irren. Wenn du Helply nutzt, gehen
              deine Nachrichten, Anhänge und die Daten, die du erlaubst, an ein KI-Modell, das wir selbst in der
              Schweiz betreiben. Der KI-Dienst speichert sie nach der Antwort nicht und nutzt sie nicht für Training.
              Deine Unterhaltungen speichert Schuly verschlüsselt. Bevor Helply etwas ändert, fragt es dich.
            </p>
            <p>
              <strong>KI-Apps, die du selbst verbindest</strong> (zum Beispiel über MCP), erhalten die Daten, die du
              ihnen erlaubst. Für sie gelten die Bedingungen ihres Anbieters, und die Daten können ins Ausland gehen.
            </p>

            <h2>7. Empfänger und Länder</h2>
            <div class="legal-table-wrap">
              <table>
                <thead><tr><th>Empfänger</th><th>Zweck</th><th>Land</th><th>Grundlage</th></tr></thead>
                <tbody>
                  <tr><td>IONOS SE</td><td>Hosting des Servers</td><td>Deutschland</td><td>Angemessener Schutz</td></tr>
                  <tr><td>Cloudflare, Inc.</td><td>Auslieferung von schuly.dev und docs.schuly.dev</td><td>USA</td><td>Swiss-U.S. Data Privacy Framework</td></tr>
                  <tr><td>Resend, Inc.</td><td>Bestätigungs- und Passwort-E-Mails</td><td>USA</td><td>Standardvertragsklauseln</td></tr>
                  <tr><td>Google (Firebase)</td><td>Zustellung von Benachrichtigungen; Standard ist ein allgemeiner Text, Details nur wenn du sie einschaltest</td><td>USA</td><td>Swiss-U.S. Data Privacy Framework</td></tr>
                  <tr><td>Apple</td><td>Zustellung von Benachrichtigungen auf iOS</td><td>USA</td><td>Laut Apple</td></tr>
                  <tr><td>Microsoft</td><td>Microsoft 365, wenn du es verknüpfst; Anmeldung bei manchen Schulen</td><td>USA / EU</td><td>Laut Microsoft</td></tr>
                  <tr><td>Google, Microsoft</td><td>Anmeldung bei Schuly, wenn du sie wählst</td><td>USA</td><td>Laut Anbieter</td></tr>
                  <tr><td>Centerboard AG, OdA Org</td><td>Abruf deiner Schuldaten</td><td>Schweiz</td><td>In deinem Auftrag</td></tr>
                  <tr><td>GitHub, Inc.</td><td>Prüfung auf App-Updates (überträgt deine IP-Adresse, lässt sich abschalten), Downloads</td><td>USA</td><td>Laut GitHub</td></tr>
                  <tr><td>Giphy</td><td>GIFs in Chats: dein Browser lädt die Bilder direkt von Giphy (überträgt deine IP-Adresse)</td><td>USA</td><td>Laut Giphy</td></tr>
                </tbody>
              </table>
            </div>

            <h2>8. Wie lange</h2>
            <ul>
              <li><strong>Schuldaten:</strong> bis 6 Monate nach deinem Austritt aus der Schule.</li>
              <li><strong>Inaktive Konten:</strong> werden nach 12 Monaten ohne Nutzung gelöscht, nach einer Warnung per E-Mail, wenn du eine bestätigte Adresse hast.</li>
              <li><strong>Helply:</strong> 30 Tage nach deiner letzten Aktivität in der Unterhaltung.</li>
              <li><strong>Aktivität von KI-Apps:</strong> 30 Tage.</li>
              <li><strong>Sicherheitsprotokoll:</strong> 1 Jahr. <strong>Server-Protokolle:</strong> in der Grösse begrenzt und laufend überschrieben. Inhalte von Anfragen werden nicht protokolliert.</li>
              <li><strong>Sicherungskopien:</strong> höchstens 30 Tage.</li>
              <li><strong>Microsoft-Inhalte im Web:</strong> Die Web-App hält E-Mails und Chats kurz im Arbeitsspeicher des Servers (Listen bis etwa 70 Minuten, eine E-Mail bis 2 Stunden, Ordnernamen bis 25 Stunden) und unverschlüsselt in deinem Browser. Der Browser-Speicher wird bei der Abmeldung gelöscht. Melde dich auf geteilten Computern deshalb immer ab.</li>
            </ul>

            <h2>9. Sicherheit</h2>
            <p>
              Verbindungen zu und von unserem Server sind verschlüsselt. Anmeldedaten, Dokumente, Absenzgründe und
              Helply-Inhalte sind auf dem Server verschlüsselt gespeichert. Noten und übrige Schuldaten sind nicht
              einzeln verschlüsselt. Authenticator-Geheimnisse bleiben auf deinem Gerät, ausser du speicherst eines
              für die Schul-Anmeldung.
            </p>

            <h2>10. Deine Rechte</h2>
            <p>
              Du kannst Auskunft, Berichtigung, Löschung und die Herausgabe deiner Daten verlangen. In der App oder
              Web-App kannst du unter <strong>Einstellungen → Datenschutz</strong> deine Daten exportieren und dein
              Konto löschen. Für alles andere schreib an
              <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>; wir antworten innert 30 Tagen. Falsche
              Schuldaten korrigiert deine Schule, Schuly übernimmt die Änderung beim nächsten Abgleich. Falls das
              Datenschutzrecht eines anderen Landes auf deine Nutzung anwendbar ist, hast du auch die Rechte, die es dir gibt.
            </p>
            <p>Schuly trifft keine automatisierten Einzelentscheidungen. KI-Aktionen in Helply bestätigst du selbst.</p>

            <h2>11. Beschwerde und Änderungen</h2>
            <p>
              Schreib uns zuerst. Du kannst dich auch beim <strong>Eidgenössischen Datenschutz- und
              Öffentlichkeitsbeauftragten (EDÖB)</strong>, Feldeggweg 1, 3003 Bern, beschweren
              (<a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">edoeb.admin.ch</a>). Es gilt die hier
              veröffentlichte Fassung mit dem oben genannten Datum.
            </p>
          } @else {
            <h2>1. Who we are and who Schuly is for</h2>
            <p>
              Schuly is a free, independent app for students who attend a school in Switzerland. We offer our service at
              schuly.dev only to these students, and it supports only school systems used in Switzerland. Schuly isn't
              part of your school, Centerboard AG (Schulnetz), OdA Org, or Microsoft.
            </p>
            <p>
              <strong>Niclas Erismann</strong>, Switzerland, is responsible:
              <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>. If you enter your own server in the app,
              its operator is responsible instead. If you're unsure what this means for you, ask a parent.
            </p>

            <h2>2. Two ways to use Schuly</h2>
            <ul>
              <li>
                <strong>Schuly account:</strong> the server fetches your school data in the background and keeps a copy, so
                the app opens quickly and can notify you.
              </li>
              <li>
                <strong>Private mode:</strong> there is no account. Your login and school data stay on your device. They pass
                through our server with each request, but aren't stored there.
              </li>
            </ul>

            <h2>3. What data we process</h2>
            <p>The data comes from you and from the school systems you connect.</p>
            <ul>
              <li><strong>Account:</strong> username, email, password as a hash, second factor, profile picture, signed-in devices with IP address and browser, time of last use, and your confirmation of the privacy notice.</li>
              <li><strong>School data:</strong> name, school, classes, teachers, grades, exams, timetable, semester reports, and documents.</li>
              <li><strong>Absences:</strong> period, status, and reason. <strong>The reason can include health information</strong>, which is sensitive personal data.</li>
              <li><strong>Microsoft 365</strong> (only if you link an account): mail, calendar, files, Microsoft Teams chats, and notes. This content can include data about other people, such as teachers and classmates.</li>
              <li><strong>Notifications:</strong> device token and your settings.</li>
              <li><strong>Technical data:</strong> server logs and a security log of sign-ins and deletions.</li>
            </ul>
            <p>When you register, we check whether your IP address belongs to a Swiss network. The result isn't stored.</p>

            <h2>4. Logins we store</h2>
            <ul>
              <li><strong>Schulnetz:</strong> session tokens and cookies, no password.</li>
              <li><strong>OdA Org:</strong> username and password, because the portal offers no other way to sign in again.</li>
              <li><strong>Microsoft:</strong> refresh token and cookies. We don't store your Microsoft password.</li>
            </ul>
            <p>These give access to those accounts. They're stored encrypted on the server and removed when you disconnect the account.</p>

            <h2>5. Why</h2>
            <p>
              We process data to show and update your school data, notify you, provide the features you use, and protect the
              service. We don't sell data or show ads. The website uses no trackers or analytics.
            </p>

            <h2>6. AI features</h2>
            <p>
              <strong>Helply</strong> is an AI, not a person, and can be wrong. When you use it, your messages, attachments,
              and the data you allow go to an AI model we run ourselves in Switzerland. The AI service doesn't keep them after
              answering or use them for training. Schuly stores your conversations encrypted. Helply asks you before it changes
              anything.
            </p>
            <p>
              <strong>AI apps you connect yourself</strong> (for example through MCP) receive the data you allow. Their
              provider's terms apply, and the data can go abroad.
            </p>

            <h2>7. Recipients and countries</h2>
            <div class="legal-table-wrap">
              <table>
                <thead><tr><th>Recipient</th><th>Purpose</th><th>Country</th><th>Basis</th></tr></thead>
                <tbody>
                  <tr><td>IONOS SE</td><td>Server hosting</td><td>Germany</td><td>Adequate protection</td></tr>
                  <tr><td>Cloudflare, Inc.</td><td>Delivering schuly.dev and docs.schuly.dev</td><td>USA</td><td>Swiss-U.S. Data Privacy Framework</td></tr>
                  <tr><td>Resend, Inc.</td><td>Confirmation and password emails</td><td>USA</td><td>Standard contractual clauses</td></tr>
                  <tr><td>Google (Firebase)</td><td>Delivering notifications; generic text by default, details only if you turn them on</td><td>USA</td><td>Swiss-U.S. Data Privacy Framework</td></tr>
                  <tr><td>Apple</td><td>Delivering notifications on iOS</td><td>USA</td><td>Per Apple</td></tr>
                  <tr><td>Microsoft</td><td>Microsoft 365 if you link it; sign-in at some schools</td><td>USA / EU</td><td>Per Microsoft</td></tr>
                  <tr><td>Google, Microsoft</td><td>Signing in to Schuly, if you choose them</td><td>USA</td><td>Per provider</td></tr>
                  <tr><td>Centerboard AG, OdA Org</td><td>Fetching your school data</td><td>Switzerland</td><td>On your behalf</td></tr>
                  <tr><td>GitHub, Inc.</td><td>Checking for app updates (sends your IP address, can be turned off) and downloads</td><td>USA</td><td>Per GitHub</td></tr>
                  <tr><td>Giphy</td><td>GIFs in chats: your browser loads the images directly from Giphy (sends your IP address)</td><td>USA</td><td>Per Giphy</td></tr>
                </tbody>
              </table>
            </div>

            <h2>8. How long</h2>
            <ul>
              <li><strong>School data:</strong> until 6 months after you leave the school.</li>
              <li><strong>Inactive accounts:</strong> deleted after 12 months without use, after an email warning if you have a confirmed address.</li>
              <li><strong>Helply:</strong> 30 days after your last activity in the conversation.</li>
              <li><strong>AI app activity:</strong> 30 days.</li>
              <li><strong>Security log:</strong> 1 year. <strong>Server logs:</strong> limited in size and continually overwritten. Request contents aren't logged.</li>
              <li><strong>Backups:</strong> 30 days at most.</li>
              <li><strong>Microsoft content on the web:</strong> the web app keeps mail and chats briefly in the server's memory (lists up to about 70 minutes, one mail up to 2 hours, folder names up to 25 hours) and unencrypted in your browser. The browser storage is deleted when you sign out, so always sign out on shared computers.</li>
            </ul>

            <h2>9. Security</h2>
            <p>
              Connections to and from our server are encrypted. Logins, documents, absence reasons, and Helply content are stored
              encrypted on the server. Grades and other school data aren't encrypted individually. Authenticator secrets stay on
              your device, unless you save one for school sign-in.
            </p>

            <h2>10. Your rights</h2>
            <p>
              You can ask for access to your data, and for correction, deletion, or a copy of it. In the app or web app, under
              <strong>Settings → Privacy</strong>, you can export your data and delete your account. For anything else, write to
              <a href="mailto:privacy&#64;schuly.dev">privacy&#64;schuly.dev</a>; we answer within 30 days. Your school corrects wrong
              school data, and Schuly picks up the change on the next sync. If another country's data protection law applies to your
              use, you also have the rights it grants.
            </p>
            <p>Schuly makes no automated individual decisions. You confirm AI actions in Helply yourself.</p>

            <h2>11. Complaints and changes</h2>
            <p>
              Contact us first. You may also complain to the <strong>Federal Data Protection and Information Commissioner
              (FDPIC)</strong>, Feldeggweg 1, 3003 Bern
              (<a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener">edoeb.admin.ch</a>). The version published here
              with the date above applies.
            </p>
          }
        </div>
      </div>
    </section>
  `,
})
export class Privacy extends LegalPageBase {}
