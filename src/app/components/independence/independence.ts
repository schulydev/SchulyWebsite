import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslatePipe } from '@ngx-translate/core';
import { faArrowRight, faCheck, faCloud, faCode, faLock, faServer, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../services/language';

/** Privacy and independence: the two modes, and why Schuly is not tied to anyone. */
@Component({
  selector: 'app-independence',
  imports: [FontAwesomeModule, RouterLink, TranslatePipe],
  templateUrl: './independence.html',
  styleUrl: './independence.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Independence {
  protected readonly lang = inject(LanguageService).current;

  protected readonly faArrowRight = faArrowRight;
  protected readonly faCheck = faCheck;

  protected readonly modes = [
    { key: 'account', icon: faCloud },
    { key: 'private', icon: faLock },
  ];
  protected readonly points = [0, 1, 2];

  protected readonly facts = [
    { key: 'independent', icon: faUserShield },
    { key: 'source', icon: faCode },
    { key: 'selfhost', icon: faServer },
  ];
}
