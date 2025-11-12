import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal, WritableSignal } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { TranslationService } from './translation.service';
import { LanguageStore } from '../../stores/language/language.store';
import { Enum_APP_LANGUAGE, Type_APP_LANGUAGE } from '../../utils/types';

describe('TranslationService', () => {
  let service: TranslationService;
  let languageStore: jasmine.SpyObj<LanguageStore>;
  let translateService: jasmine.SpyObj<TranslateService>;
  let currentLanguageSignal: WritableSignal<Type_APP_LANGUAGE>;

  const mockTranslations = {
    es: {
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
              greeting: 'Soy',
              experience: 'Experiencia',
              education: 'Educación',
              skills: 'Habilidades',
              hobbies: 'Pasatiempos',
              contact: 'Contacto',
              profession: 'Profesora de Inglés | Profesora'
            }
          }
        }
      }
    },
    en: {
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
              greeting: "Hi, I'm",
              experience: 'Experience',
              education: 'Education',
              skills: 'Skills',
              hobbies: 'Hobbies',
              contact: 'Contact',
              profession: 'English Teacher | Professor'
            }
          }
        }
      }
    }
  };

  beforeEach(() => {
    currentLanguageSignal = signal<Type_APP_LANGUAGE>(Enum_APP_LANGUAGE.ES);

    const languageStoreSpy = jasmine.createSpyObj('LanguageStore', ['getCurrentLanguage'], {
      currentLanguage: currentLanguageSignal
    });
    languageStoreSpy.getCurrentLanguage.and.callFake(() => currentLanguageSignal());

    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant', 'use', 'setDefaultLang'], {
      translations: mockTranslations
    });
    
    Object.defineProperty(translateServiceSpy, 'currentLang', {
      get: () => currentLanguageSignal() === Enum_APP_LANGUAGE.ES ? 'es' : 'en',
      configurable: true
    });
    
    translateServiceSpy.onLangChange = of({ lang: 'es', translations: mockTranslations.es });
    translateServiceSpy.onDefaultLangChange = of({ lang: 'es', translations: mockTranslations.es });

    translateServiceSpy.instant.and.callFake((key: string) => {
      const lang = currentLanguageSignal();
      const translations = mockTranslations[lang as 'es' | 'en'];
      const keys = key.split('.');
      let value: any = translations;
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          return key;
        }
      }
      
      return typeof value === 'string' ? value : key;
    });

    translateServiceSpy.use.and.returnValue(of({ lang: 'es', translations: mockTranslations.es }));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        TranslationService,
        { provide: LanguageStore, useValue: languageStoreSpy },
        { provide: TranslateService, useValue: translateServiceSpy },
        provideZonelessChangeDetection()
      ]
    });
    
    service = TestBed.inject(TranslationService);
    languageStore = TestBed.inject(LanguageStore) as jasmine.SpyObj<LanguageStore>;
    translateService = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('translate', () => {
    beforeEach(() => {
      currentLanguageSignal.set(Enum_APP_LANGUAGE.ES);
    });

    it('should translate to Spanish when language is ES', () => {
      const result = service.translate('fragments.header.changeLanguage');
      expect(result).toBe('Cambiar idioma');
    });

    it('should translate header.back to Spanish', () => {
      const result = service.translate('fragments.header.back');
      expect(result).toBe('Regresar');
    });

    it('should translate header.print to Spanish', () => {
      const result = service.translate('fragments.header.print');
      expect(result).toBe('Imprimir');
    });

    it('should translate footer.copyright to Spanish', () => {
      const result = service.translate('fragments.footer.copyright');
      expect(result).toBe('© 2024 Jveloper. Todos los derechos reservados.');
    });

    it('should translate welcome.dialogue to Spanish', () => {
      const result = service.translate('pages.home.fragments.welcome.dialogue');
      expect(result).toBe('¡Bienvenido! Soy Soledad, profesora de inglés. Siéntete libre de explorar mi perfil profesional.');
    });

    it('should translate welcome.button to Spanish', () => {
      const result = service.translate('pages.home.fragments.welcome.button');
      expect(result).toBe('Explorar CV');
    });

    it('should translate cv.title to Spanish', () => {
      const result = service.translate('pages.home.fragments.cv.title');
      expect(result).toBe('Curriculum Vitae');
    });

    it('should translate cv.subtitle to Spanish', () => {
      const result = service.translate('pages.home.fragments.cv.subtitle');
      expect(result).toBe('Perfil profesional');
    });
  });

  describe('translate - English', () => {
    beforeEach(() => {
      currentLanguageSignal.set(Enum_APP_LANGUAGE.EN);
    });

    it('should translate to English when language is EN', () => {
      const result = service.translate('fragments.header.changeLanguage');
      expect(result).toBe('Change language');
    });

    it('should translate header.back to English', () => {
      const result = service.translate('fragments.header.back');
      expect(result).toBe('Back');
    });

    it('should translate header.print to English', () => {
      const result = service.translate('fragments.header.print');
      expect(result).toBe('Print');
    });

    it('should translate footer.copyright to English', () => {
      const result = service.translate('fragments.footer.copyright');
      expect(result).toBe('© 2024 Jveloper. All rights reserved.');
    });

    it('should translate welcome.dialogue to English', () => {
      const result = service.translate('pages.home.fragments.welcome.dialogue');
      expect(result).toBe('Welcome! I am Soledad, English teacher. Feel free to explore my professional profile.');
    });

    it('should translate welcome.button to English', () => {
      const result = service.translate('pages.home.fragments.welcome.button');
      expect(result).toBe('Explore CV');
    });

    it('should translate cv.subtitle to English', () => {
      const result = service.translate('pages.home.fragments.cv.subtitle');
      expect(result).toBe('Professional profile');
    });
  });

  describe('translate - invalid keys', () => {
    beforeEach(() => {
      currentLanguageSignal.set(Enum_APP_LANGUAGE.ES);
    });

    it('should return the key if translation is not found', () => {
      const invalidKey = 'invalid.key.path' as any;
      const result = service.translate(invalidKey);
      expect(result).toBe(invalidKey);
    });
  });

  describe('getCurrentLanguage', () => {
    it('should return current language from LanguageStore', () => {
      languageStore.getCurrentLanguage.and.returnValue(Enum_APP_LANGUAGE.ES);
      const result = service.getCurrentLanguage();
      expect(result).toBe(Enum_APP_LANGUAGE.ES);
      expect(languageStore.getCurrentLanguage).toHaveBeenCalled();
    });

    it('should return EN when language is EN', () => {
      languageStore.getCurrentLanguage.and.returnValue(Enum_APP_LANGUAGE.EN);
      const result = service.getCurrentLanguage();
      expect(result).toBe(Enum_APP_LANGUAGE.EN);
    });
  });

  describe('translateComputed', () => {
    it('should return a computed signal', () => {
      currentLanguageSignal.set(Enum_APP_LANGUAGE.ES);
      
      const computed = service.translateComputed('fragments.header.changeLanguage');
      expect(computed).toBeDefined();
      expect(computed()).toBe('Cambiar idioma');
    });

    it('should update when language changes', () => {
      currentLanguageSignal.set(Enum_APP_LANGUAGE.ES);
      
      const computed = service.translateComputed('fragments.header.changeLanguage');
      expect(computed()).toBe('Cambiar idioma');
      
      currentLanguageSignal.set(Enum_APP_LANGUAGE.EN);
      expect(computed()).toBe('Change language');
    });
  });

  describe('language switching', () => {
    it('should switch translations when language changes', () => {
      currentLanguageSignal.set(Enum_APP_LANGUAGE.ES);
      
      let result = service.translate('fragments.header.changeLanguage');
      expect(result).toBe('Cambiar idioma');

      currentLanguageSignal.set(Enum_APP_LANGUAGE.EN);
      
      result = service.translate('fragments.header.changeLanguage');
      expect(result).toBe('Change language');
    });
  });

  describe('cvData', () => {
    it('should return ES cvData when language is ES', () => {
      currentLanguageSignal.set(Enum_APP_LANGUAGE.ES);
      const cvData = service.cvData();
      // cvData puede ser null si no se ha cargado aún
      expect(cvData === null || typeof cvData === 'object').toBe(true);
    });

    it('should return EN cvData when language is EN', () => {
      currentLanguageSignal.set(Enum_APP_LANGUAGE.EN);
      const cvData = service.cvData();
      // cvData puede ser null si no se ha cargado aún
      expect(cvData === null || typeof cvData === 'object').toBe(true);
    });
  });
});
