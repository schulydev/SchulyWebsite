import { Component, OnInit, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDownload, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-hero',
  imports: [
    FontAwesomeModule
  ],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements OnInit{
  stars = signal('...');
  downloads = signal('...');

  protected readonly faDownload = faDownload;
  protected readonly faExternalLinkAlt = faExternalLinkAlt;

  async ngOnInit() {
    try {
      const response = await fetch('https://api.github.com/repos/PianoNic/schuly');
      const data = await response.json();
      this.stars.set(data.stargazers_count.toString());
    } catch (error) {
      console.error('Failed to fetch GitHub stars:', error);
      this.stars.set('0');
    }

    try {
      const response = await fetch('https://api.github.com/repos/PianoNic/schuly/releases');
      const releases = await response.json();

      let totalDownloads = 0;
      for (const release of releases) {
        if (release.assets) {
          for (const asset of release.assets) {
            // Count only .apk files
            if (asset.name.endsWith('.apk')) {
              totalDownloads += asset.download_count;
            }
          }
        }
      }

      this.downloads.set(totalDownloads.toString());
    } catch (error) {
      console.error('Failed to fetch GitHub release downloads:', error);
      this.downloads.set('0');
    }
  }
}
