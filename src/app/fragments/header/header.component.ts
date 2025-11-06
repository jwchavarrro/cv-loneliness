import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CircleX, Menu } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class Header {

  /**
   * @name navigationButtonsHeader
   * @description Buttons for the header navigation
   * @type {Array<{ icon: any, ariaLabel: string }>}
   */
  navigationButtonsHeader = [
    { icon: Menu, ariaLabel: 'Menú' },
    { icon: CircleX, ariaLabel: 'Cerrar' }
  ];
}
