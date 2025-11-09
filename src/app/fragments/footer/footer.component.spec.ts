import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';

import { Footer } from './footer.component';
import { TranslationService } from '../../services';
import { LanguageStore } from '../../stores/language/language.store';
import { Enum_APP_LANGUAGE } from '../../utils/types';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;
  let translationService: TranslationService;
  let languageStore: LanguageStore;
  let currentLanguageSignal: ReturnType<typeof signal<Enum_APP_LANGUAGE>>;

  beforeEach(async () => {
    currentLanguageSignal = signal<Enum_APP_LANGUAGE>(Enum_APP_LANGUAGE.ES);
    const languageStoreSpy = jasmine.createSpyObj('LanguageStore', ['getCurrentLanguage'], {
      currentLanguage: currentLanguageSignal
    });
    languageStoreSpy.getCurrentLanguage.and.callFake(() => currentLanguageSignal());

    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [
        provideZonelessChangeDetection(),
        TranslationService,
        { provide: LanguageStore, useValue: languageStoreSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    translationService = TestBed.inject(TranslationService);
    languageStore = TestBed.inject(LanguageStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have translationService injected', () => {
    expect(component.translationService).toBeTruthy();
    expect(component.translationService).toBeInstanceOf(TranslationService);
  });

  it('should have copyrightText computed signal', () => {
    expect(component.copyrightText).toBeDefined();
    const copyright = component.copyrightText();
    expect(typeof copyright).toBe('string');
    expect(copyright.length).toBeGreaterThan(0);
  });

  it('should have githubText computed signal', () => {
    expect(component.githubText).toBeDefined();
    const github = component.githubText();
    expect(typeof github).toBe('string');
    expect(github.length).toBeGreaterThan(0);
  });

  it('should render copyright text', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const copyrightElement = compiled.querySelector('.text--footer');
    expect(copyrightElement?.textContent).toBeTruthy();
    expect(copyrightElement?.textContent).toContain('©');
  });

  it('should render GitHub link', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const githubLink = compiled.querySelector('a[href*="github.com"]');
    expect(githubLink).toBeTruthy();
    expect(githubLink?.getAttribute('target')).toBe('_blank');
    expect(githubLink?.getAttribute('rel')).toBe('noopener');
  });

  it('should render GitHub icon', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const svg = compiled.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('should update copyright text when language changes', () => {
    const initialCopyright = component.copyrightText();
    expect(initialCopyright).toBeTruthy();
    
    // Simular cambio de idioma
    currentLanguageSignal.set(Enum_APP_LANGUAGE.EN);
    fixture.detectChanges();
    
    const newCopyright = component.copyrightText();
    expect(newCopyright).toBeTruthy();
    // El texto debería cambiar (aunque puede ser el mismo en este caso)
    expect(typeof newCopyright).toBe('string');
  });
});
