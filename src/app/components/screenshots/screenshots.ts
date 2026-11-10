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
    { src: '/assets/schuly-start-page-v3.png',    webp: '/assets/schuly-start-page-v3.webp',    altKey: 'start' },
    { src: '/assets/schuly-agenda-page-v3.png',   webp: '/assets/schuly-agenda-page-v3.webp',   altKey: 'agenda' },
    { src: '/assets/schuly-grades-page-v3.png',   webp: '/assets/schuly-grades-page-v3.webp',   altKey: 'grades' },
    { src: '/assets/schuly-absences-page-v3.png', webp: '/assets/schuly-absences-page-v3.webp', altKey: 'absences' },
    { src: '/assets/schuly-account-page-v3.png',  webp: '/assets/schuly-account-page-v3.webp',  altKey: 'account' },
  ];
}
