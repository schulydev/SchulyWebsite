import { Component } from '@angular/core';

@Component({
  selector: 'app-screenshots',
  imports: [],
  templateUrl: './screenshots.html',
  styleUrl: './screenshots.scss'
})
export class Screenshots {
  shots = [
    { src: '/assets/schuly-start-page.png', alt: 'Start page' },
    { src: '/assets/schuly-agenda-page.png', alt: 'Agenda' },
    { src: '/assets/schuly-grades-page.png', alt: 'Grades' },
    { src: '/assets/schuly-absences-page.png', alt: 'Absences' },
    { src: '/assets/schuly-account-page.png', alt: 'Account' },
  ];
}
