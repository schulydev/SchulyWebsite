import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-screenshots',
  imports: [TranslatePipe],
  templateUrl: './screenshots.html',
  styleUrl: './screenshots.scss'
})
export class Screenshots {
  shots = [
    { src: '/assets/schuly-start-page.png',    webp: '/assets/schuly-start-page.webp',    altKey: 'start' },
    { src: '/assets/schuly-agenda-page.png',   webp: '/assets/schuly-agenda-page.webp',   altKey: 'agenda' },
    { src: '/assets/schuly-grades-page.png',   webp: '/assets/schuly-grades-page.webp',   altKey: 'grades' },
    { src: '/assets/schuly-absences-page.png', webp: '/assets/schuly-absences-page.webp', altKey: 'absences' },
    { src: '/assets/schuly-account-page.png',  webp: '/assets/schuly-account-page.webp',  altKey: 'account' },
  ];
}
