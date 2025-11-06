/**
 * @fileoverview Home component
 * @description Componente principal de la página de inicio
 */

import { Component, inject } from '@angular/core';

// Import of components custom
import { DialogueBubbleComponent } from '../../components';
import { WelcomeComponent, CvComponent } from './fragments';
import { CvStore } from '../../stores/pages/home';

@Component({
  selector: 'page-home',
  standalone: true,
  imports: [WelcomeComponent, CvComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // Store global (como Jotai atom)
  cvStore = inject(CvStore);
}
