import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Undo, Printer, Languages } from 'lucide-angular';

// Import of components custom
import { TooltipComponent } from '../../components';

// Import of stores ( contextos )
import { CvStore } from '../../stores/pages/home';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TooltipComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class Header {
  // Store global
  cvStore = inject(CvStore);


  // Icons
  iconLanguages = Languages;

  /**
   * @name changeLanguage
   * @description Cambia el idioma de la aplicación
   */
  changeLanguage() {
    // TODO: Implementar lógica de cambio de idioma
    console.log('Cambiar idioma');
  }

  /**
   * @name navigationButtonsHeader
   * @description Buttons for the header navigation
   */
  navigationButtonsHeader = [
    {
      icon: Undo,
      ariaLabel: 'Regresar',
      condition: () => this.cvStore.showCv(),
      action: () => this.cvStore.hideCvView(),
    },
    {
      icon: Printer,
      ariaLabel: 'Imprimir',
      condition: () => this.cvStore.showCv(),
      action: () => {},
    },
    
  ];
}
