import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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
  | 'pages.home.fragments.cv.subtitle'
  | 'pages.home.fragments.cv.description'
  | 'pages.home.fragments.cv.personalBio'
  | 'pages.home.fragments.cv.experience'
  | 'pages.home.fragments.cv.education'
  | 'pages.home.fragments.cv.skills'
  | 'pages.home.fragments.cv.hobbies'
  | 'pages.home.fragments.cv.contact';

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
          description: string;
          personalBio: string;
          experience: string;
          education: string;
          skills: string;
          hobbies: string;
          contact: string;
        };
      };
    };
  };
}

/**
 * @interface CvData
 * @description Interface para los datos del CV
 */
export interface CvData {
  personalInfo: {
    name: string;
    profession: string;
  };
  personalBio: string;
  experience: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  education: Array<{
    years: string;
    course: string;
    institution: string;
    note: string;
  }>;
  skills: string[];
  hobbies: Array<{
    name: string;
  }>;
  contact: {
    email: string;
    website: string;
    social: string;
  };
}

/**
 * @interface TranslationsFile
 * @description Interface para el archivo JSON completo de traducciones
 */
interface TranslationsFile {
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
          description: string;
          personalBio: string;
          experience: string;
          education: string;
          skills: string;
          hobbies: string;
          contact: string;
        };
      };
    };
  };
  cv: CvData;
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
  private http = inject(HttpClient);
  
  // Signals para todas las traducciones cargadas desde JSON
  private translationsEs = signal<TranslationsStructure | null>(null);
  private translationsEn = signal<TranslationsStructure | null>(null);
  
  // Signal para los datos del CV cargados desde JSON
  private cvDataEs = signal<CvData | null>(null);
  private cvDataEn = signal<CvData | null>(null);
  
  // Computed signal que devuelve las traducciones según el idioma actual
  private translations = computed(() => {
    const lang = this.languageStore.currentLanguage();
    const translations = lang === Enum_APP_LANGUAGE.ES ? this.translationsEs() : this.translationsEn();
    // Si aún no se han cargado, retornar traducciones por defecto
    if (!translations) {
      return this.getDefaultTranslations(lang);
    }
    return translations;
  });
  
  // Computed signal que devuelve los datos del CV según el idioma actual
  cvData = computed(() => {
    const lang = this.languageStore.currentLanguage();
    const data = lang === Enum_APP_LANGUAGE.ES ? this.cvDataEs() : this.cvDataEn();
    return data;
  });
  
  constructor() {
    // Cargar todas las traducciones al inicializar el servicio
    this.loadTranslations();
  }
  
  /**
   * @name loadTranslations
   * @description Carga todas las traducciones desde los archivos JSON
   */
  private async loadTranslations(): Promise<void> {
    try {
      const [esData, enData] = await Promise.all([
        firstValueFrom(this.http.get<TranslationsFile>('/locales/es/common.json')),
        firstValueFrom(this.http.get<TranslationsFile>('/locales/en/common.json'))
      ]);
      
      // Guardar las traducciones
      this.translationsEs.set(esData.fragments ? {
        fragments: esData.fragments,
        pages: esData.pages
      } : null);
      this.translationsEn.set(enData.fragments ? {
        fragments: enData.fragments,
        pages: enData.pages
      } : null);
      
      // Guardar los datos del CV
      this.cvDataEs.set(esData.cv);
      this.cvDataEn.set(enData.cv);
    } catch (error) {
      console.error('Error loading translations:', error);
    }
  }
  
  /**
   * @name getDefaultTranslations
   * @description Retorna traducciones por defecto mientras se cargan los JSON
   */
  private getDefaultTranslations(lang: Type_APP_LANGUAGE): TranslationsStructure {
    if (lang === Enum_APP_LANGUAGE.ES) {
      return {
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
                dialogue: '¡Bienvenido! Soy Soledad, profesora de inglés. Siéntete libre de explorar mi perfil profesional.',
                button: 'Explorar CV'
              },
              cv: {
                title: 'Curriculum Vitae',
                subtitle: 'Perfil profesional',
                description: 'Descubre mi trayectoria profesional, educación y habilidades. Este CV proporciona una visión general de mi experiencia y calificaciones.',
                personalBio: 'Biografía Personal',
                experience: 'Experiencia',
                education: 'Educación',
                skills: 'Habilidades',
                hobbies: 'Pasatiempos',
                contact: 'Contacto'
              }
            }
          }
        }
      };
    } else {
      return {
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
                dialogue: 'Welcome! I am Soledad, English teacher. Feel free to explore my professional profile.',
                button: 'Explore CV'
              },
              cv: {
                title: 'Curriculum Vitae',
                subtitle: 'Professional profile',
                description: 'Discover my professional journey, education, and skills. This CV provides an overview of my experience and qualifications.',
                personalBio: 'Personal Bio',
                experience: 'Experience',
                education: 'Education',
                skills: 'Skills',
                hobbies: 'Hobbies',
                contact: 'Contact'
              }
            }
          }
        }
      };
    }
  }


  /**
   * @name translate
   * @description Traduce una clave al idioma actual usando la ruta de carpetas
   * Este método es reactivo: lee directamente el signal de idioma para que los computed signals
   * en los componentes se actualicen correctamente cuando cambia el idioma.
   * @param key - Clave de traducción (ej: 'fragments.header.changeLanguage')
   * @returns Texto traducido
   */
  translate(key: Type_TRANSLATION_KEY): string {
    // Leer directamente el signal de idioma para que sea reactivo
    const translations = this.translations();
    
    const keys = key.split('.');
    let value: unknown = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k];
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

