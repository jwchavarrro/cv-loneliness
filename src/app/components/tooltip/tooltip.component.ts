import { Component, input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * @component Tooltip
 * @description Componente genérico y reutilizable para mostrar tooltips
 * Maneja automáticamente el hover sobre sus children
 * Solo requiere: texto y posición
 */
@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent {
  /**
   * @name text
   * @description Texto a mostrar en el tooltip (requerido)
   */
  text = input.required<string>();

  /**
   * @name position
   * @description Posición del tooltip: 'top', 'bottom', 'left', 'right'
   * @default 'top'
   */
  position = input<'top' | 'bottom' | 'left' | 'right'>('top');

  /**
   * @name isVisible
   * @description Signal interno que controla la visibilidad del tooltip
   */
  isVisible = signal<boolean>(false);

  /**
   * @name positionClass
   * @description Clase CSS calculada basada en la posición
   */
  positionClass = computed(() => `tooltip--${this.position()}`);

  /**
   * @name onMouseEnter
   * @description Muestra el tooltip al hacer hover
   */
  onMouseEnter() {
    this.isVisible.set(true);
  }

  /**
   * @name onMouseLeave
   * @description Oculta el tooltip al quitar el hover
   */
  onMouseLeave() {
    this.isVisible.set(false);
  }
}

