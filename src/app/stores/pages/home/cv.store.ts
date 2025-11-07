import { Injectable, signal } from '@angular/core';

/**
 * @service CvStore
 * @description Store global para el estado del CV (como Jotai atom)
 * Disponible en TODOS los componentes mediante inject()
 */
@Injectable({
  providedIn: 'root' // ← Hace el store GLOBAL
})
export class CvStore {
  // Signal global para mostrar/ocultar CV
  showCv = signal<boolean>(false);

  /**
   * @name showCvView
   * @description Muestra el CV
   */
  showCvView() {
    this.showCv.set(true);
  }

  /**
   * @name hideCvView
   * @description Oculta el CV
   */
  hideCvView() {
    this.showCv.set(false);
  }
}

