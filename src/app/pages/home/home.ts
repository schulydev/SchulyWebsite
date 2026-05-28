import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Features } from '../../components/features/features';
import { Screenshots } from '../../components/screenshots/screenshots';
import { Download } from '../../components/download/download';
import { Faq } from '../../components/faq/faq';

@Component({
  selector: 'app-home',
  imports: [Hero, Features, Screenshots, Download, Faq],
  template: `
    <app-hero />
    <app-features />
    <app-screenshots />
    <app-faq />
    <app-download />
  `,
})
export class Home {}
