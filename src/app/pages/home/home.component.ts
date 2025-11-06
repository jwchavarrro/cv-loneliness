/**
 * @fileoverview Home component
 * @description Componente principal de la página de inicio
 */


import { Component, signal } from '@angular/core';

// Import of components custom
import { DialogueBubbleComponent } from '../../components';


@Component({
  selector: 'page-home',
  standalone: true,
  imports: [DialogueBubbleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  // Signals generales
  showDialogueBubble = signal<boolean>(false);

  /**
   * @name onImageHover
   * @description Function to show the dialogue bubble
   */
  onImageHover() {
    this.showDialogueBubble.update(prev => !prev);
  }
}

