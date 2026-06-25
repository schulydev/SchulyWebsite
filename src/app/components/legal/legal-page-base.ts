import { computed, Directive, inject } from '@angular/core';

import { LanguageService } from '../../services/language';

// Shared language-toggle + fallback-notice logic for the legal pages (privacy,
// impressum, terms). The legal text itself stays in each page's own template.
@Directive()
export abstract class LegalPageBase {
  protected lang = inject(LanguageService);
  protected showDe = computed(() => this.lang.current() !== 'en');
  protected showEn = computed(() => this.lang.current() === 'en');
  protected showFallbackNotice = computed(() => !['de', 'en'].includes(this.lang.current()));
}
