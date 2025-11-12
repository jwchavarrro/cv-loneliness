import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { LanguageStore } from '../../stores/language/language.store';
import { Type_APP_LANGUAGE, Enum_APP_LANGUAGE } from '../../utils/types';
import { Type_TRANSLATION_KEY, CvData, TranslationsFile } from './utils/types';

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
      throw new Error('Error al cargar los datos del CV');
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
