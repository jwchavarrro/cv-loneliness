import { Component, signal, inject, computed } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

// Import of components custom
import { DialogueBubbleComponent } from "../../components/dialogue-bubble/dialogue-bubble.component";

// Import of stores
import { CvStore } from "../../../../stores/pages/home";

// Import of services
import { TranslationService } from "../../../../services";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [DialogueBubbleComponent, TranslateModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  // Stores
  cvStore = inject(CvStore);

  // Services
  translationService = inject(TranslationService);

  // Signals generales
  showDialogueBubble = signal<boolean>(false);

  // Traducciones reactivas
  dialogueText = computed(() => 
    this.translationService.translate('pages.home.fragments.welcome.dialogue')
  );
  buttonText = computed(() => 
    this.translationService.translate('pages.home.fragments.welcome.button')
  );

  /**
   * @name onImageHover
   * @description Function to show the dialogue bubble
   */
  onImageHover() {
    this.showDialogueBubble.update((prev) => !prev);
  }

  /**
   * @name onExplorarCvClick
   * @description Muestra el CV usando el store global
   */
  onExplorarCvClick() {
    this.cvStore.showCvView();
  }
}
