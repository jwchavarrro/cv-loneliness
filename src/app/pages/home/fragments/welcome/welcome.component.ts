import { Component, signal, inject } from '@angular/core';
import { DialogueBubbleComponent } from "../../components/dialogue-bubble/dialogue-bubble.component";
import { CvStore } from "../../../../stores/pages/home";

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [DialogueBubbleComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss',
})
export class WelcomeComponent {
  // Store global (como Jotai atom)
  cvStore = inject(CvStore);

  // Signals generales
  showDialogueBubble = signal<boolean>(false);

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
