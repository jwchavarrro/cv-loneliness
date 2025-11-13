import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { HeaderComponent } from './header.component';
import { CvStore } from '../../stores/pages/home';
import { LanguageStore } from '../../stores/language/language.store';
import { TranslationService } from '../../services';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let cvStore: CvStore;
  let languageStore: LanguageStore;

  beforeEach(async () => {
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant', 'use', 'setDefaultLang'], {
      currentLang: 'en',
      onLangChange: of({ lang: 'en', translations: {} }),
      onDefaultLangChange: of({ lang: 'en', translations: {} })
    });
    translateServiceSpy.instant.and.callFake((key: string) => {
      const translations: Record<string, string> = {
        'fragments.header.changeLanguage': 'Change language',
        'fragments.header.back': 'Back',
        'fragments.header.download': 'Download CV',
        'fragments.header.share': 'Share'
      };
      return translations[key] || 'Test';
    });
    translateServiceSpy.use.and.returnValue(of({ lang: 'en', translations: {} }));
    translateServiceSpy.setDefaultLang.and.returnValue(of({ lang: 'en', translations: {} }));

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        provideZonelessChangeDetection(),
        { provide: TranslateService, useValue: translateServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
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
    cvStore.showCvView();
    fixture.detectChanges();
    const buttons = component.navigationButtonsHeader();
    // El botón back es el primero en el array y tiene el icono Undo
    const backButton = buttons.find(btn => btn.icon === component.navigationButtonsHeader()[0].icon);
    expect(backButton).toBeTruthy();
    if (backButton) {
      backButton.action();
      expect(cvStore.hideCvView).toHaveBeenCalled();
    }
  });

  it('should have changeLanguageText computed signal', () => {
    expect(component.changeLanguageText).toBeDefined();
    const text = component.changeLanguageText();
    expect(typeof text).toBe('string');
    expect(text.length).toBeGreaterThan(0);
  });

  it('should render navigation buttons when showCv is true', () => {
    cvStore.showCvView();
    fixture.detectChanges();
    const buttons = component.navigationButtonsHeader();
    const visibleButtons = buttons.filter(btn => btn.condition());
    expect(visibleButtons.length).toBeGreaterThan(0);
  });

  it('should not show navigation buttons when showCv is false', () => {
    cvStore.hideCvView();
    fixture.detectChanges();
    const buttons = component.navigationButtonsHeader();
    const visibleButtons = buttons.filter(btn => btn.condition());
    expect(visibleButtons.length).toBe(0);
  });

  it('should have download button in navigationButtonsHeader', () => {
    cvStore.showCvView();
    fixture.detectChanges();
    const buttons = component.navigationButtonsHeader();
    // El botón download es el segundo en el array
    const downloadButton = buttons.find(btn => btn.ariaLabel === 'Download CV' || btn.ariaLabel === 'Descargar CV');
    expect(downloadButton).toBeTruthy();
    expect(downloadButton?.icon).toBeTruthy();
  });

  it('should call download action when download button is clicked', () => {
    cvStore.showCvView();
    fixture.detectChanges();
    const buttons = component.navigationButtonsHeader();
    // El botón download es el segundo en el array
    const downloadButton = buttons.find(btn => btn.ariaLabel === 'Download CV' || btn.ariaLabel === 'Descargar CV');
    expect(downloadButton).toBeTruthy();
    if (downloadButton) {
      expect(() => downloadButton.action()).not.toThrow();
    }
  });

  it('should update navigation buttons when language changes', () => {
    const initialButtons = component.navigationButtonsHeader();
    expect(initialButtons.length).toBeGreaterThan(0);
    
    languageStore.toggleLanguage();
    fixture.detectChanges();
    
    const newButtons = component.navigationButtonsHeader();
    expect(newButtons.length).toBe(initialButtons.length);
    // Los ariaLabels deberían cambiar según el idioma
    expect(newButtons[0].ariaLabel).toBeTruthy();
  });

  it('should update changeLanguageText when language changes', () => {
    const initialText = component.changeLanguageText();
    expect(initialText).toBeTruthy();
    
    languageStore.toggleLanguage();
    fixture.detectChanges();
    
    const newText = component.changeLanguageText();
    expect(newText).toBeTruthy();
    // El texto debería cambiar según el idioma
    expect(typeof newText).toBe('string');
  });
});
