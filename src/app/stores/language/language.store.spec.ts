import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LanguageStore } from './language.store';
import { Enum_APP_LANGUAGE, Type_APP_LANGUAGE } from '../../utils/types';

describe('LanguageStore', () => {
  let store: LanguageStore;
  const STORAGE_KEY = 'app-language';

  beforeEach(() => {
    // Limpiar localStorage antes de cada test
    localStorage.clear();
    
    TestBed.configureTestingModule({
      providers: [LanguageStore, provideZonelessChangeDetection()]
    });
    store = TestBed.inject(LanguageStore);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should initialize with ES as default when localStorage is empty', () => {
    expect(store.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.ES);
    expect(store.currentLanguage()).toBe(Enum_APP_LANGUAGE.ES);
  });

  it('should initialize with stored language from localStorage', () => {
    // Limpiar el store actual y crear uno nuevo con valor en localStorage
    TestBed.resetTestingModule();
    localStorage.setItem(STORAGE_KEY, Enum_APP_LANGUAGE.EN);
    
    TestBed.configureTestingModule({
      providers: [LanguageStore, provideZonelessChangeDetection()]
    });
    const newStore = TestBed.inject(LanguageStore);
    expect(newStore.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.EN);
    
    // Restaurar el store original para los siguientes tests
    TestBed.resetTestingModule();
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [LanguageStore, provideZonelessChangeDetection()]
    });
    store = TestBed.inject(LanguageStore);
  });

  it('should initialize with ES when localStorage has invalid value', () => {
    // Limpiar el store actual y crear uno nuevo con valor inválido en localStorage
    TestBed.resetTestingModule();
    localStorage.setItem(STORAGE_KEY, 'invalid');
    
    TestBed.configureTestingModule({
      providers: [LanguageStore, provideZonelessChangeDetection()]
    });
    const newStore = TestBed.inject(LanguageStore);
    expect(newStore.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.ES);
    
    // Restaurar el store original para los siguientes tests
    TestBed.resetTestingModule();
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [LanguageStore, provideZonelessChangeDetection()]
    });
    store = TestBed.inject(LanguageStore);
  });

  it('should set language to EN', () => {
    store.setLanguage(Enum_APP_LANGUAGE.EN);
    expect(store.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.EN);
    expect(store.currentLanguage()).toBe(Enum_APP_LANGUAGE.EN);
    expect(localStorage.getItem(STORAGE_KEY)).toBe(Enum_APP_LANGUAGE.EN);
  });

  it('should set language to ES', () => {
    store.setLanguage(Enum_APP_LANGUAGE.ES);
    expect(store.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.ES);
    expect(store.currentLanguage()).toBe(Enum_APP_LANGUAGE.ES);
    expect(localStorage.getItem(STORAGE_KEY)).toBe(Enum_APP_LANGUAGE.ES);
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
    expect(initialValue).toBe(Enum_APP_LANGUAGE.ES);
    
    store.setLanguage(Enum_APP_LANGUAGE.EN);
    expect(store.currentLanguage()).toBe(Enum_APP_LANGUAGE.EN);
    
    store.setLanguage(Enum_APP_LANGUAGE.ES);
    expect(store.currentLanguage()).toBe(Enum_APP_LANGUAGE.ES);
  });

  it('should getCurrentLanguage return the current language', () => {
    expect(store.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.ES);
    store.setLanguage(Enum_APP_LANGUAGE.EN);
    expect(store.getCurrentLanguage()).toBe(Enum_APP_LANGUAGE.EN);
  });
});

