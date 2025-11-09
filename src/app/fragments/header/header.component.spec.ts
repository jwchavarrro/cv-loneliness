import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header.component';
import { CvStore } from '../../stores/pages/home';
import { LanguageStore } from '../../stores/language/language.store';
import { TranslationService } from '../../services';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let cvStore: CvStore;
  let languageStore: LanguageStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    cvStore = component.cvStore;
    languageStore = component.languageStore;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have cvStore injected', () => {
    expect(component.cvStore).toBeTruthy();
    expect(component.cvStore).toBeInstanceOf(CvStore);
  });

  it('should have languageStore injected', () => {
    expect(component.languageStore).toBeTruthy();
    expect(component.languageStore).toBeInstanceOf(LanguageStore);
  });

  it('should have translationService injected', () => {
    expect(component.translationService).toBeTruthy();
    expect(component.translationService).toBeInstanceOf(TranslationService);
  });

  it('should have iconLanguages defined', () => {
    expect(component.iconLanguages).toBeTruthy();
  });

  it('should toggle language when changeLanguage is called', () => {
    const initialLanguage = languageStore.getCurrentLanguage();
    spyOn(languageStore, 'toggleLanguage');
    component.changeLanguage();
    expect(languageStore.toggleLanguage).toHaveBeenCalled();
  });

  it('should have navigationButtonsHeader as computed signal', () => {
    expect(component.navigationButtonsHeader).toBeDefined();
    const buttons = component.navigationButtonsHeader();
    expect(Array.isArray(buttons)).toBe(true);
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should have navigation buttons with correct structure', () => {
    const buttons = component.navigationButtonsHeader();
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach(button => {
      expect(button.icon).toBeDefined();
      expect(button.ariaLabel).toBeDefined();
      expect(typeof button.ariaLabel).toBe('string');
      expect(typeof button.condition).toBe('function');
      expect(typeof button.action).toBe('function');
    });
  });

  it('should call hideCvView when back button action is triggered', () => {
    spyOn(cvStore, 'hideCvView');
    const buttons = component.navigationButtonsHeader();
    const backButton = buttons.find(btn => 
      btn.ariaLabel === 'Regresar' || btn.ariaLabel === 'Back'
    );
    if (backButton) {
      backButton.action();
      expect(cvStore.hideCvView).toHaveBeenCalled();
    }
  });
});
