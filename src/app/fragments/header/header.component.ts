import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Undo, Printer, Languages } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

// Import of components custom
import { TooltipComponent } from '../../components';

// Import of stores ( contextos )
import { CvStore } from '../../stores/pages/home';
import { LanguageStore } from '../../stores/language/language.store';

// Import of services
import { TranslationService } from '../../services';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TooltipComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class Header {
  // Stores globales
  cvStore = inject(CvStore);
  languageStore = inject(LanguageStore);
  translationService = inject(TranslationService);

  // Icons
  iconLanguages = Languages;

  // Traducciones reactivas
  changeLanguageText = computed(() => 
    this.translationService.translate('fragments.header.changeLanguage')
  );

  /**
   * @name changeLanguage
   * @description Cambia el idioma de la aplicación
   */
  changeLanguage() {
    this.languageStore.toggleLanguage();
  }

  /**
   * @name navigationButtonsHeader
   * @description Buttons for the header navigation (reactivo al cambio de idioma)
   */
  navigationButtonsHeader = computed(() => [
    {
      icon: Undo,
      ariaLabel: this.translationService.translate('fragments.header.back'),
      condition: () => this.cvStore.showCv(),
      action: () => this.cvStore.hideCvView(),
    },
    {
      icon: Printer,
      ariaLabel: this.translationService.translate('fragments.header.print'),
      condition: () => this.cvStore.showCv(),
      action: () => {},
    },
  ]);
}
