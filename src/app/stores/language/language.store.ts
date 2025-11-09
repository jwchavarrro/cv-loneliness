import { Injectable, signal, inject, effect } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Type_APP_LANGUAGE, Enum_APP_LANGUAGE } from '../../utils/types';

@Injectable({
  providedIn: 'root'
})
export class LanguageStore {
  private readonly STORAGE_KEY = 'app-language';
  private translateService = inject(TranslateService);
  currentLanguage = signal<Type_APP_LANGUAGE>(this.getInitialLanguage());

  constructor() {
    const initialLang = this.getInitialLanguage();
    this.translateService.setDefaultLang(initialLang);
    this.translateService.use(initialLang).subscribe();

    effect(() => {
      const lang = this.currentLanguage();
      if (this.translateService.currentLang !== lang && this.translateService.currentLang !== null) {
        this.translateService.use(lang).subscribe();
      }
    });
  }

  private getInitialLanguage(): Type_APP_LANGUAGE {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored === Enum_APP_LANGUAGE.ES || stored === Enum_APP_LANGUAGE.EN) {
      return stored as Type_APP_LANGUAGE;
    }
    return Enum_APP_LANGUAGE.EN;
  }

  setLanguage(language: Type_APP_LANGUAGE) {
    this.currentLanguage.set(language);
    localStorage.setItem(this.STORAGE_KEY, language);
    this.translateService.use(language);
  }

  toggleLanguage() {
    const current = this.currentLanguage();
    const newLanguage = current === Enum_APP_LANGUAGE.ES ? Enum_APP_LANGUAGE.EN : Enum_APP_LANGUAGE.ES;
    this.setLanguage(newLanguage);
  }

  getCurrentLanguage(): Type_APP_LANGUAGE {
    return this.currentLanguage();
  }
}

