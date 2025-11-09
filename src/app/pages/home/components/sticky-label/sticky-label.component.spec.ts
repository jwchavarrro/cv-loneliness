import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyLabelComponent } from './sticky-label.component';

describe('StickyLabelComponent', () => {
  let component: StickyLabelComponent;
  let fixture: ComponentFixture<StickyLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickyLabelComponent],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyLabelComponent);
    fixture.componentRef.setInput('text', 'Test Label');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render text input', () => {
    fixture.componentRef.setInput('text', 'My Label');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const textElement = compiled.querySelector('.sticky-label__text');
    expect(textElement?.textContent).toBe('My Label');
  });

  it('should not render icon when icon input is undefined', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const iconElement = compiled.querySelector('.sticky-label__icon');
    expect(iconElement).toBeNull();
  });

  it('should render icon when icon input is provided', () => {
    fixture.componentRef.setInput('icon', '⭐');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const iconElement = compiled.querySelector('.sticky-label__icon');
    expect(iconElement?.textContent).toBe('⭐');
  });

  it('should render both text and icon when both are provided', () => {
    fixture.componentRef.setInput('text', 'Experience');
    fixture.componentRef.setInput('icon', '💼');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const textElement = compiled.querySelector('.sticky-label__text');
    const iconElement = compiled.querySelector('.sticky-label__icon');
    expect(textElement?.textContent).toBe('Experience');
    expect(iconElement?.textContent).toBe('💼');
  });
});

