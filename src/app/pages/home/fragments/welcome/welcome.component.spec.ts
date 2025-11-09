import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { CvStore } from '../../../../stores/pages/home';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
  let cvStore: CvStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeComponent],
      providers: [provideZonelessChangeDetection()]
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
});
