import { Component, input } from '@angular/core';

/**
 * @component StickyLabel
 * @description Componente genérico reutilizable que muestra una etiqueta/nota adhesiva
 * con texto e icono opcional
 */
@Component({
  selector: 'home-sticky-label',
  standalone: true,
  templateUrl: './sticky-label.component.html',
  styleUrl: './sticky-label.component.scss'
})
export class StickyLabelComponent {
  /**
   * @name text
   * @description Text to display in the label
   */
  text = input.required<string>();

  /**
   * @name icon
   * @description Icon to display in the label
   * Puede ser un emoji, un string o un código de icono
   */
  icon = input<string | undefined>(undefined);
}

