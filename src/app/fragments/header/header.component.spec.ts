import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header.component';
import { CvStore } from '../../stores/pages/home';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let cvStore: CvStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    cvStore = component.cvStore;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have cvStore injected', () => {
    expect(component.cvStore).toBeTruthy();
    expect(component.cvStore).toBeInstanceOf(CvStore);
  });

  it('should have iconLanguages defined', () => {
    expect(component.iconLanguages).toBeTruthy();
  });

  it('should call changeLanguage when changeLanguage is called', () => {
    spyOn(console, 'log');
    component.changeLanguage();
    expect(console.log).toHaveBeenCalledWith('Cambiar idioma');
  });

  it('should have navigationButtonsHeader array', () => {
    expect(component.navigationButtonsHeader).toBeDefined();
    expect(Array.isArray(component.navigationButtonsHeader)).toBe(true);
  });

  it('should have navigation buttons with correct structure', () => {
    expect(component.navigationButtonsHeader.length).toBeGreaterThan(0);
    component.navigationButtonsHeader.forEach(button => {
      expect(button.icon).toBeDefined();
      expect(button.ariaLabel).toBeDefined();
      expect(typeof button.condition).toBe('function');
      expect(typeof button.action).toBe('function');
    });
  });

  it('should call hideCvView when back button action is triggered', () => {
    spyOn(cvStore, 'hideCvView');
    const backButton = component.navigationButtonsHeader.find(btn => btn.ariaLabel === 'Regresar');
    if (backButton) {
      backButton.action();
      expect(cvStore.hideCvView).toHaveBeenCalled();
    }
  });
});
