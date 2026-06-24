import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule, RouterLink, TranslatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  private language = inject(LanguageService);

  protected readonly faHeart = faHeart;
  protected readonly year = new Date().getFullYear();

  /** Active language prefix for in-page anchors, e.g. `/de`. */
  protected readonly base = computed(() => `/${this.language.current()}`);
  /** Active language code for routerLink segments. */
  protected readonly lang = this.language.current;
}
