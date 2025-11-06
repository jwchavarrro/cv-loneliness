import { Component, signal } from '@angular/core';

@Component({
  selector: 'page-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  showButton = signal<boolean>(false);

  onImageClick() {
    this.showButton.update(prev => !prev);
  }
}

