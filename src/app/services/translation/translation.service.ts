import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { LanguageStore } from '../../stores/language/language.store';
import { Type_APP_LANGUAGE, Enum_APP_LANGUAGE } from '../../utils/types';

export type Type_TRANSLATION_KEY = 
  | 'fragments.header.changeLanguage'
  | 'fragments.header.back'
  | 'fragments.header.download'
  | 'fragments.header.share'
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
  }>;
  skills: string[];
  hobbies: Array<{
    name: string;
  }>;
  contact: Array<{
    value: string;
  }>;
}

interface TranslationsFile {
  fragments: {
    header: {
      changeLanguage: string;
      back: string;
      download: string;
      share: string;
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

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private languageStore = inject(LanguageStore);
  private http = inject(HttpClient);
  private translateService = inject(TranslateService);
  private cvDataEs = signal<CvData | null>(null);
  private cvDataEn = signal<CvData | null>(null);
  private translationsLoaded = signal<boolean>(false);
  
  cvData = computed(() => {
    const lang = this.languageStore.currentLanguage();
    return lang === Enum_APP_LANGUAGE.ES ? this.cvDataEs() : this.cvDataEn();
  });
  
  constructor() {
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
  
  private async loadCvData(): Promise<void> {
    try {
      const [esData, enData] = await Promise.all([
        firstValueFrom(this.http.get<TranslationsFile>('/locales/es/common.json')),
        firstValueFrom(this.http.get<TranslationsFile>('/locales/en/common.json'))
      ]);
      
      this.cvDataEs.set(esData.cv);
      this.cvDataEn.set(enData.cv);
    } catch (error) {
      // Error silencioso
    }
  }
  
  translate(key: Type_TRANSLATION_KEY): string {
    this.languageStore.currentLanguage();
    this.translationsLoaded();
    
    const translation = this.translateService.instant(key);
    return translation === key ? key : translation;
  }

  translateComputed(key: Type_TRANSLATION_KEY) {
    return computed(() => {
      this.languageStore.currentLanguage();
      return this.translate(key);
    });
  }

  getCurrentLanguage(): Type_APP_LANGUAGE {
    return this.languageStore.getCurrentLanguage();
  }
}
