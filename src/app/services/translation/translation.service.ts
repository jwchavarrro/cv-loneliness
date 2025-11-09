import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
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
  | 'pages.home.fragments.cv.greeting'
  | 'pages.home.fragments.cv.experience'
  | 'pages.home.fragments.cv.education'
  | 'pages.home.fragments.cv.skills'
  | 'pages.home.fragments.cv.hobbies'
  | 'pages.home.fragments.cv.contact'
  | 'pages.home.fragments.cv.profession';

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
          greeting: string;
          experience: string;
          education: string;
          skills: string;
          hobbies: string;
          contact: string;
          profession: string;
        };
      };
    };
  };
  cv: CvData;
}

/**
 * @service TranslationService
 * @description Servicio para manejar las traducciones de la aplicación usando ngx-translate
 * Mantiene compatibilidad con la API anterior pero usa TranslateService internamente
 */
@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private languageStore = inject(LanguageStore);
  private http = inject(HttpClient);
  private translateService = inject(TranslateService);
  
  // Signal para los datos del CV cargados desde JSON
  private cvDataEs = signal<CvData | null>(null);
  private cvDataEn = signal<CvData | null>(null);
  
  // Signal para forzar la actualización cuando se cargan las traducciones
  private translationsLoaded = signal<boolean>(false);
  
  // Computed signal que devuelve los datos del CV según el idioma actual
  cvData = computed(() => {
    const lang = this.languageStore.currentLanguage();
    return lang === Enum_APP_LANGUAGE.ES ? this.cvDataEs() : this.cvDataEn();
  });
  
  constructor() {
    // Cargar los datos del CV al inicializar el servicio
    this.loadCvData();
    
    this.translateService.onLangChange.subscribe(() => {
      this.translationsLoaded.set(true);
      setTimeout(() => {
        this.translationsLoaded.update(v => !v);
        this.translationsLoaded.update(v => !v);
      }, 0);
    });
    
    this.translateService.onDefaultLangChange.subscribe(() => {
      this.translationsLoaded.set(true);
      setTimeout(() => {
        this.translationsLoaded.update(v => !v);
        this.translationsLoaded.update(v => !v);
      }, 0);
    });
  }
  
  /**
   * @name loadCvData
   * @description Carga los datos del CV desde los archivos JSON
   */
  private async loadCvData(): Promise<void> {
    try {
      const [esData, enData] = await Promise.all([
        firstValueFrom(this.http.get<TranslationsFile>('/locales/es/common.json')),
        firstValueFrom(this.http.get<TranslationsFile>('/locales/en/common.json'))
      ]);
      
      // Guardar los datos del CV
      this.cvDataEs.set(esData.cv);
      this.cvDataEn.set(enData.cv);
    } catch (error) {
      // Error silencioso - los datos del CV no son críticos para i18n
    }
  }
  
  /**
   * @name translate
   * @description Traduce una clave al idioma actual usando ngx-translate
   * Este método es reactivo: lee directamente el signal de idioma para que los computed signals
   * en los componentes se actualicen correctamente cuando cambia el idioma.
   * @param key - Clave de traducción (ej: 'fragments.header.changeLanguage')
   * @returns Texto traducido
   */
  translate(key: Type_TRANSLATION_KEY): string {
    this.languageStore.currentLanguage();
    this.translationsLoaded();
    
    const translation = this.translateService.instant(key);
    return translation === key ? key : translation;
  }

  /**
   * @name translateComputed
   * @description Crea un computed signal reactivo para una clave de traducción
   * Este método simplifica el uso en componentes, evitando crear computed signals manualmente
   * @param key - Clave de traducción (ej: 'fragments.header.changeLanguage')
   * @returns Computed signal que retorna el texto traducido
   */
  translateComputed(key: Type_TRANSLATION_KEY) {
    return computed(() => {
      this.languageStore.currentLanguage();
      return this.translate(key);
    });
  }

  /**
   * @name getCurrentLanguage
   * @description Obtiene el idioma actual
   */
  getCurrentLanguage(): Type_APP_LANGUAGE {
    return this.languageStore.getCurrentLanguage();
  }
}
