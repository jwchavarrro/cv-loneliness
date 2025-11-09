import { Injectable, signal } from '@angular/core';

// Import of types
import { Type_APP_LANGUAGE, Enum_APP_LANGUAGE } from '../../utils/types';

/**
 * @service LanguageStore
 * @description Store global para el idioma de la aplicación (como Jotai atom)
 * Disponible en TODOS los componentes mediante inject()
 */
@Injectable({
  providedIn: 'root' // ← Hace el store GLOBAL
})
export class LanguageStore {
  private readonly STORAGE_KEY = 'app-language';

  // Signal global para el idioma actual
  currentLanguage = signal<Type_APP_LANGUAGE>(this.getInitialLanguage());

  /**
   * @name getInitialLanguage
   * @description Obtiene el idioma inicial desde localStorage o usa Enum_APP_LANGUAGE.ES por defecto
   */
  private getInitialLanguage(): Type_APP_LANGUAGE {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored === Enum_APP_LANGUAGE.ES || stored === Enum_APP_LANGUAGE.EN) {
      return stored as Type_APP_LANGUAGE;
    }
    return Enum_APP_LANGUAGE.ES;
  }

  /**
   * @name setLanguage
   * @description Cambia el idioma de la aplicación y lo persiste en localStorage
   * @param language - Idioma a establecer (Enum_APP_LANGUAGE.ES | Enum_APP_LANGUAGE.EN)
   */
  setLanguage(language: Type_APP_LANGUAGE) {
    this.currentLanguage.set(language);
    localStorage.setItem(this.STORAGE_KEY, language);
  }

  /**
   * @name toggleLanguage
   * @description Alterna entre español e inglés
   */
  toggleLanguage() {
    const current = this.currentLanguage();
    const newLanguage = current === Enum_APP_LANGUAGE.ES ? Enum_APP_LANGUAGE.EN : Enum_APP_LANGUAGE.ES;
    this.setLanguage(newLanguage);
  }

  /**
   * @name getCurrentLanguage
   * @description Obtiene el idioma actual
   */
  getCurrentLanguage(): Type_APP_LANGUAGE {
    return this.currentLanguage();
  }
}

