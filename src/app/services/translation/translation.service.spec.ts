import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal, WritableSignal } from '@angular/core';
import { TranslationService } from './translation.service';
import { LanguageStore } from '../../stores/language/language.store';
import { Enum_APP_LANGUAGE, Type_APP_LANGUAGE } from '../../utils/types';

describe('TranslationService', () => {
  let service: TranslationService;
  let languageStore: jasmine.SpyObj<LanguageStore>;
  let currentLanguageSignal: WritableSignal<Type_APP_LANGUAGE>;

  beforeEach(() => {
    // Crear un signal real para el mock
    currentLanguageSignal = signal<Type_APP_LANGUAGE>(Enum_APP_LANGUAGE.ES);

    // Crear un mock del LanguageStore
    const languageStoreSpy = jasmine.createSpyObj('LanguageStore', ['getCurrentLanguage'], {
      currentLanguage: currentLanguageSignal
    });

    // Hacer que getCurrentLanguage retorne el valor del signal
    languageStoreSpy.getCurrentLanguage.and.callFake(() => currentLanguageSignal());

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TranslationService,
        { provide: LanguageStore, useValue: languageStoreSpy },
        provideZonelessChangeDetection()
      ]
    });
    
    service = TestBed.inject(TranslationService);
    languageStore = TestBed.inject(LanguageStore) as jasmine.SpyObj<LanguageStore>;
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
      // Nota: TypeScript no permitirá pasar una clave inválida, pero si se pasa,
      // el servicio debe retornar la clave como fallback
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

  describe('language switching', () => {
    it('should switch translations when language changes', () => {
      // Inicialmente en español
      currentLanguageSignal.set(Enum_APP_LANGUAGE.ES);
      
      let result = service.translate('fragments.header.changeLanguage');
      expect(result).toBe('Cambiar idioma');

      // Cambiar a inglés
      currentLanguageSignal.set(Enum_APP_LANGUAGE.EN);
      
      result = service.translate('fragments.header.changeLanguage');
      expect(result).toBe('Change language');
    });
  });
});

