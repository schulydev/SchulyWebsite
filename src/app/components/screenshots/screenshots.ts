import { Component } from '@angular/core';

@Component({
  selector: 'app-screenshots',
  imports: [],
  templateUrl: './screenshots.html',
  styleUrl: './screenshots.scss'
})
export class Screenshots {
  shots = [
    { src: '/assets/schuly-start-page.png',    webp: '/assets/schuly-start-page.webp',    alt: 'Schuly start page on iOS - shows grade overview and agenda' },
    { src: '/assets/schuly-agenda-page.png',   webp: '/assets/schuly-agenda-page.webp',   alt: 'Schuly agenda page - daily schedule and upcoming exams' },
    { src: '/assets/schuly-grades-page.png',   webp: '/assets/schuly-grades-page.webp',   alt: 'Schuly grades page - subject averages and trend chart' },
    { src: '/assets/schuly-absences-page.png', webp: '/assets/schuly-absences-page.webp', alt: 'Schuly absences page - excused and unexcused list' },
    { src: '/assets/schuly-account-page.png',  webp: '/assets/schuly-account-page.webp',  alt: 'Schuly account page - profile and multi-school switcher' },
  ];
}
