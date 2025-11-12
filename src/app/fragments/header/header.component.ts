import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Undo, Download, Languages, Share2 } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

// Import of components custom
import { TooltipComponent } from '../../components';

// Import of stores ( contextos )
import { CvStore } from '../../stores/pages/home';
import { LanguageStore } from '../../stores/language/language.store';

// Import of services
import { TranslationService, DownloadService } from '../../services';

// Import of types
import { Enum_APP_LANGUAGE } from '../../utils/types';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TooltipComponent, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class Header {
  [x: string]: any;
  // Stores globales
  cvStore = inject(CvStore);
  languageStore = inject(LanguageStore);
  translationService = inject(TranslationService);
  downloadService = inject(DownloadService);

  // Enums
  Enum_APP_LANGUAGE = Enum_APP_LANGUAGE;

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
   * @name downloadPdf
   * @description Descarga el PDF del CV usando el servicio de descarga
   */
  downloadPdf() {
    this.downloadService.downloadPdf();
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
      icon: Download,
      ariaLabel: this.translationService.translate('fragments.header.download'),
      condition: () => this.cvStore.showCv(),
      action: () => this.downloadPdf(),
    },
    {
      icon: Share2,
      ariaLabel: this.translationService.translate('fragments.header.share'),
      condition: () => this.cvStore.showCv(),
      action: () => {},
    },
  ]);
}
