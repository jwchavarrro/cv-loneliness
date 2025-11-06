import { Component, input } from '@angular/core';

/**
 * @component DialogueBubble
 * @description Componente privado que solo se usa en HomeComponent
 * Muestra una burbuja de diálogo con un mensaje personalizable
 */
@Component({
  selector: 'home-dialogue-bubble',
  standalone: true,
  templateUrl: './dialogue-bubble.component.html',
  styleUrl: './dialogue-bubble.component.scss'
})
export class DialogueBubbleComponent {
  /**
   * Mensaje a mostrar en la burbuja
   */
  message = input<string>('¡Hola! 👋');
}

