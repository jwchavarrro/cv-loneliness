import { Injectable, computed, inject } from '@angular/core';

// Import of stores
import { LanguageStore } from '../../stores/language/language.store';

// Import of types
import { Type_APP_LANGUAGE, Enum_APP_LANGUAGE } from '../../utils/types';

/**
 * @type TranslationKey
 * @description Type for the translation key (refleja la estructura de carpetas)
 */
export type Type_TRANSLATION_KEY = 
  | 'fragments.header.changeLanguage'
  | 'fragments.header.back'
  | 'fragments.header.print'
  | 'fragments.footer.copyright'
  | 'fragments.footer.github'
  | 'pages.home.fragments.welcome.dialogue'
  | 'pages.home.fragments.welcome.button'
  | 'pages.home.fragments.cv.title'
  | 'pages.home.fragments.cv.subtitle';

/**
 * @interface TranslationsStructure
 * @description Estructura de traducciones que refleja la organización de carpetas
 */
interface TranslationsStructure {
  fragments: {
    header: {
      changeLanguage: string;
      back: string;
      print: string;
    };
    footer: {
      copyright: string;
      github: string;
    };
  };
  pages: {
    home: {
      fragments: {
        welcome: {
          dialogue: string;
          button: string;
        };
        cv: {
          title: string;
          subtitle: string;
        };
      };
    };
  };
}

/**
 * @service TranslationService
 * @description Servicio para manejar las traducciones de la aplicación
 */
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private languageStore = inject(LanguageStore);

  // Traducciones en español (organizadas por estructura de carpetas)
  private translationsEs: TranslationsStructure = {
    fragments: {
      header: {
        changeLanguage: 'Cambiar idioma',
        back: 'Regresar',
        print: 'Imprimir'
      },
      footer: {
        copyright: '© 2024 Jveloper. Todos los derechos reservados.',
        github: 'GitHub'
      }
    },
    pages: {
      home: {
        fragments: {
          welcome: {
            dialogue: 'Welcome! I am Soledad, English teacher. Feel free to explore my professional profile.',
            button: 'Explorar CV'
          },
          cv: {
            title: 'Curriculum Vitae',
            subtitle: 'Perfil profesional'
          }
        }
      }
    }
  };

  // Traducciones en inglés (organizadas por estructura de carpetas)
  private translationsEn: TranslationsStructure = {
    fragments: {
      header: {
        changeLanguage: 'Change language',
        back: 'Back',
        print: 'Print'
      },
      footer: {
        copyright: '© 2024 Jveloper. All rights reserved.',
        github: 'GitHub'
      }
    },
    pages: {
      home: {
        fragments: {
          welcome: {
            dialogue: '¡Bienvenido! Soy Soledad, profesora de inglés. Siéntete libre de explorar mi perfil profesional.',
            button: 'Explore CV'
          },
          cv: {
            title: 'Curriculum Vitae',
            subtitle: 'Professional profile'
          }
        }
      }
    }
  };

  // Computed signal que devuelve las traducciones según el idioma actual
  private translations = computed(() => {
    const lang = this.languageStore.currentLanguage();
    return lang === Enum_APP_LANGUAGE.ES ? this.translationsEs : this.translationsEn;
  });

  /**
   * @name translate
   * @description Traduce una clave al idioma actual usando la ruta de carpetas
   * @param key - Clave de traducción (ej: 'fragments.header.changeLanguage')
   * @returns Texto traducido
   */
  translate(key: Type_TRANSLATION_KEY): string {
    const keys = key.split('.');
    let value: any = this.translations();
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Retorna la clave si no encuentra la traducción
      }
    }
    
    return typeof value === 'string' ? value : key;
  }

  /**
   * @name getCurrentLanguage
   * @description Obtiene el idioma actual
   */
  getCurrentLanguage(): Type_APP_LANGUAGE {
    return this.languageStore.getCurrentLanguage();
  }
}

