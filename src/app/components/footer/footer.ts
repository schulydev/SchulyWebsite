import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  protected readonly faHeart = faHeart;
  protected readonly year = new Date().getFullYear();
}
