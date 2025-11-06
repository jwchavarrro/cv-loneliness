import { Component, inject } from '@angular/core';
import { CvStore } from '../../../../stores/pages/home';

/**
 * @component Cv
 * @description Fragmento que muestra el currículum completo
 */
@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [],
  templateUrl: './cv.component.html',
  styleUrl: './cv.component.scss',
})
export class CvComponent {
  // Store global (como Jotai atom)
  cvStore = inject(CvStore);
}
