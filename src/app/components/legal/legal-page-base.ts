import { computed, Directive, inject } from '@angular/core';

import { LanguageService } from '../../services/language';

@Directive()
export abstract class LegalPageBase {
  protected lang = inject(LanguageService);
  protected showDe = computed(() => this.lang.current() !== 'en');
  protected showEn = computed(() => this.lang.current() === 'en');
  protected showFallbackNotice = computed(() => !['de', 'en'].includes(this.lang.current()));
}
