import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideZonelessChangeDetection()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render main element', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main')).toBeTruthy();
  });

  it('should have a button with text "Explorar cv"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = compiled.querySelector('button');
    expect(button?.textContent).toContain('Explorar cv');
  });

  it('should toggle showDialogueBubble signal when onImageHover is called', () => {
    const initialValue = component.showDialogueBubble();
    component.onImageHover();
    expect(component.showDialogueBubble()).toBe(!initialValue);
  });

  it('should toggle showDialogueBubble signal twice when onImageHover is called twice', () => {
    const initialValue = component.showDialogueBubble();
    component.onImageHover();
    component.onImageHover();
    expect(component.showDialogueBubble()).toBe(initialValue);
  });
});

