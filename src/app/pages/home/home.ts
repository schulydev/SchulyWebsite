import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { Features } from '../../components/features/features';
import { Screenshots } from '../../components/screenshots/screenshots';
import { Download } from '../../components/download/download';

@Component({
  selector: 'app-home',
  imports: [Hero, Features, Screenshots, Download],
  template: `
    <app-hero />
    <app-features />
    <app-screenshots />
    <app-download />
  `,
})
export class Home {}
