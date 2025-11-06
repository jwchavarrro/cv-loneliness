import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CircleX, Menu } from 'lucide-angular';
import { CvStore } from '../../stores/pages/home';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class Header {
  // Store global
  cvStore = inject(CvStore);

  /**
   * @name navigationButtonsHeader
   * @description Buttons for the header navigation
   */
  navigationButtonsHeader = [
    { 
      icon: Menu, 
      ariaLabel: 'Menú',
      condition: () => this.cvStore.showCv(),
      action: () => {}
    },
    { 
      icon: CircleX, 
      ariaLabel: 'Cerrar',
      condition: () => this.cvStore.showCv(),
      action: () => this.cvStore.hideCvView()
    }
  ];
}
