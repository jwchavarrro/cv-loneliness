import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { LanguageStore } from './language.store';
import { Enum_APP_LANGUAGE } from '../../utils/types';

describe('LanguageStore', () => {
  let store: LanguageStore;
  let translateService: jasmine.SpyObj<TranslateService>;
  const STORAGE_KEY = 'app-language';

  beforeEach(() => {
    localStorage.clear();
    
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['use', 'setDefaultLang'], {
      currentLang: null
    });
    translateServiceSpy.use.and.returnValue(of('en'));
    translateServiceSpy.setDefaultLang.and.returnValue(undefined);
    translateServiceSpy.onLangChange = of({ lang: 'en', translations: {} });
    translateServiceSpy.onDefaultLangChange = of({ lang: 'en', translations: {} });
    
    TestBed.configureTestingModule({
      providers: [
        LanguageStore,
        { provide: TranslateService, useValue: translateServiceSpy },
        provideZonelessChangeDetection()
      ]
    });
    store = TestBed.inject(LanguageStore);
    translateService = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should initialize with EN as default when localStorage is empty', () => {
    expect(store.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.EN);
    expect(store.currentLanguage()).toBe(Enum_APP_LANGUAGE.EN);
  });

  it('should initialize with stored language from localStorage', () => {
    TestBed.resetTestingModule();
    localStorage.setItem(STORAGE_KEY, Enum_APP_LANGUAGE.ES);
    
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['use', 'setDefaultLang'], {
      currentLang: null
    });
    translateServiceSpy.use.and.returnValue(of('es'));
    translateServiceSpy.setDefaultLang.and.returnValue(undefined);
    translateServiceSpy.onLangChange = of({ lang: 'es', translations: {} });
    translateServiceSpy.onDefaultLangChange = of({ lang: 'es', translations: {} });
    
    TestBed.configureTestingModule({
      providers: [
        LanguageStore,
        { provide: TranslateService, useValue: translateServiceSpy },
        provideZonelessChangeDetection()
      ]
    });
    const newStore = TestBed.inject(LanguageStore);
    expect(newStore.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.EN);
    
    TestBed.resetTestingModule();
    localStorage.clear();
    
    const translateServiceSpy2 = jasmine.createSpyObj('TranslateService', ['use', 'setDefaultLang'], {
      currentLang: null
    });
    translateServiceSpy2.use.and.returnValue(of('en'));
    translateServiceSpy2.setDefaultLang.and.returnValue(undefined);
    translateServiceSpy2.onLangChange = of({ lang: 'en', translations: {} });
    translateServiceSpy2.onDefaultLangChange = of({ lang: 'en', translations: {} });
    
    TestBed.configureTestingModule({
      providers: [
        LanguageStore,
        { provide: TranslateService, useValue: translateServiceSpy2 },
        provideZonelessChangeDetection()
      ]
    });
    store = TestBed.inject(LanguageStore);
  });

  it('should initialize with EN when localStorage has invalid value', () => {
    TestBed.resetTestingModule();
    localStorage.setItem(STORAGE_KEY, 'invalid');
    
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['use', 'setDefaultLang'], {
      currentLang: null
    });
    translateServiceSpy.use.and.returnValue(of('en'));
    translateServiceSpy.setDefaultLang.and.returnValue(undefined);
    translateServiceSpy.onLangChange = of({ lang: 'en', translations: {} });
    translateServiceSpy.onDefaultLangChange = of({ lang: 'en', translations: {} });
    
    TestBed.configureTestingModule({
      providers: [
        LanguageStore,
        { provide: TranslateService, useValue: translateServiceSpy },
        provideZonelessChangeDetection()
      ]
    });
    const newStore = TestBed.inject(LanguageStore);
    expect(newStore.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.EN);
    
    TestBed.resetTestingModule();
    localStorage.clear();
    
    const translateServiceSpy2 = jasmine.createSpyObj('TranslateService', ['use', 'setDefaultLang'], {
      currentLang: null
    });
    translateServiceSpy2.use.and.returnValue(of('en'));
    translateServiceSpy2.setDefaultLang.and.returnValue(undefined);
    translateServiceSpy2.onLangChange = of({ lang: 'en', translations: {} });
    translateServiceSpy2.onDefaultLangChange = of({ lang: 'en', translations: {} });
    
    TestBed.configureTestingModule({
      providers: [
        LanguageStore,
        { provide: TranslateService, useValue: translateServiceSpy2 },
        provideZonelessChangeDetection()
      ]
    });
    store = TestBed.inject(LanguageStore);
  });

  it('should set language to EN', () => {
    store.setLanguage(Enum_APP_LANGUAGE.EN);
    expect(store.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.EN);
    expect(store.currentLanguage()).toBe(Enum_APP_LANGUAGE.EN);
    expect(localStorage.getItem(STORAGE_KEY)).toBe(Enum_APP_LANGUAGE.EN);
    expect(translateService.use).toHaveBeenCalledWith(Enum_APP_LANGUAGE.EN);
  });

  it('should set language to ES', () => {
    store.setLanguage(Enum_APP_LANGUAGE.ES);
    expect(store.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.ES);
    expect(store.currentLanguage()).toBe(Enum_APP_LANGUAGE.ES);
    expect(localStorage.getItem(STORAGE_KEY)).toBe(Enum_APP_LANGUAGE.ES);
    expect(translateService.use).toHaveBeenCalledWith(Enum_APP_LANGUAGE.ES);
  });

  it('should toggle from ES to EN', () => {
    store.setLanguage(Enum_APP_LANGUAGE.ES);
    store.toggleLanguage();
    expect(store.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.EN);
    expect(localStorage.getItem(STORAGE_KEY)).toBe(Enum_APP_LANGUAGE.EN);
  });

  it('should toggle from EN to ES', () => {
    store.setLanguage(Enum_APP_LANGUAGE.EN);
    store.toggleLanguage();
    expect(store.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.ES);
    expect(localStorage.getItem(STORAGE_KEY)).toBe(Enum_APP_LANGUAGE.ES);
  });

  it('should persist language changes to localStorage', () => {
    store.setLanguage(Enum_APP_LANGUAGE.EN);
    expect(localStorage.getItem(STORAGE_KEY)).toBe(Enum_APP_LANGUAGE.EN);
    
    store.setLanguage(Enum_APP_LANGUAGE.ES);
    expect(localStorage.getItem(STORAGE_KEY)).toBe(Enum_APP_LANGUAGE.ES);
  });

  it('should update currentLanguage signal when setLanguage is called', () => {
    const initialValue = store.currentLanguage();
    expect(initialValue).toBe(Enum_APP_LANGUAGE.EN);
    
    store.setLanguage(Enum_APP_LANGUAGE.ES);
    expect(store.currentLanguage()).toBe(Enum_APP_LANGUAGE.ES);
    
    store.setLanguage(Enum_APP_LANGUAGE.EN);
    expect(store.currentLanguage()).toBe(Enum_APP_LANGUAGE.EN);
  });

  it('should getCurrentLanguage return the current language', () => {
    expect(store.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.EN);
    store.setLanguage(Enum_APP_LANGUAGE.ES);
    expect(store.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.ES);
  });
});
