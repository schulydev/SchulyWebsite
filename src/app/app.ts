import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navigation } from './components/navigation/navigation';
import { Hero } from './components/hero/hero';
import { Features } from './components/features/features';
import { Screenshots } from './components/screenshots/screenshots';
import { Download } from './components/download/download';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navigation,
    Hero,
    Features,
    Screenshots,
    Download,
    Footer
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected stars = '...';

  async ngOnInit() {
    // Fetch real-time GitHub stars
    try {
      const response = await fetch('https://api.github.com/repos/PianoNic/schuly');
      const data = await response.json();
      this.stars = data.stargazers_count.toString();
    } catch (error) {
      console.error('Failed to fetch GitHub stars:', error);
      this.stars = '0';
    }
  }
}
