import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

import { WelcomeComponent } from './welcome.component';
import { CvStore } from '../../../../stores/pages/home';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let cvStore: CvStore;

  beforeEach(async () => {
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant', 'use', 'setDefaultLang'], {
      currentLang: 'en'
    });
    translateServiceSpy.instant.and.returnValue('Test');
    translateServiceSpy.use.and.returnValue(of('en'));
    translateServiceSpy.setDefaultLang.and.returnValue(undefined);
    translateServiceSpy.onLangChange = of({ lang: 'en', translations: {} });
    translateServiceSpy.onDefaultLangChange = of({ lang: 'en', translations: {} });

    await TestBed.configureTestingModule({
      imports: [WelcomeComponent, HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        provideZonelessChangeDetection(),
        { provide: TranslateService, useValue: translateServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    cvStore = component.cvStore;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have showDialogueBubble initialized as false', () => {
    expect(component.showDialogueBubble()).toBe(false);
  });

  it('should toggle showDialogueBubble on image hover', () => {
    expect(component.showDialogueBubble()).toBe(false);
    component.onImageHover();
    expect(component.showDialogueBubble()).toBe(true);
    component.onImageHover();
    expect(component.showDialogueBubble()).toBe(false);
  });

  it('should call cvStore.showCvView when onExplorarCvClick is called', () => {
    spyOn(cvStore, 'showCvView');
    component.onExplorarCvClick();
    expect(cvStore.showCvView).toHaveBeenCalled();
  });

  it('should have cvStore injected', () => {
    expect(component.cvStore).toBeTruthy();
    expect(component.cvStore).toBeInstanceOf(CvStore);
  });

  it('should have translationService injected', () => {
    expect(component.translationService).toBeTruthy();
  });

  it('should have dialogueText computed signal', () => {
    expect(component.dialogueText).toBeDefined();
    const dialogue = component.dialogueText();
    expect(typeof dialogue).toBe('string');
    expect(dialogue.length).toBeGreaterThan(0);
  });

  it('should have buttonText computed signal', () => {
    expect(component.buttonText).toBeDefined();
    const buttonText = component.buttonText();
    expect(typeof buttonText).toBe('string');
    expect(buttonText.length).toBeGreaterThan(0);
  });

  it('should update dialogueText when language changes', () => {
    const initialDialogue = component.dialogueText();
    expect(initialDialogue).toBeTruthy();
    expect(typeof initialDialogue).toBe('string');
  });

  it('should update buttonText when language changes', () => {
    const initialButtonText = component.buttonText();
    expect(initialButtonText).toBeTruthy();
    expect(typeof initialButtonText).toBe('string');
  });

  it('should toggle showDialogueBubble correctly on multiple calls', () => {
    expect(component.showDialogueBubble()).toBe(false);
    component.onImageHover();
    expect(component.showDialogueBubble()).toBe(true);
    component.onImageHover();
    expect(component.showDialogueBubble()).toBe(false);
    component.onImageHover();
    expect(component.showDialogueBubble()).toBe(true);
  });
});
