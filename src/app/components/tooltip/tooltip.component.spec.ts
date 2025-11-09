import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipComponent],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TooltipComponent);
    fixture.componentRef.setInput('text', 'Test tooltip');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default position as top', () => {
    expect(component.position()).toBe('top');
  });

  it('should set position correctly', () => {
    fixture.componentRef.setInput('position', 'bottom');
    fixture.detectChanges();
    expect(component.position()).toBe('bottom');
  });

  it('should have positionClass computed correctly for top', () => {
    fixture.componentRef.setInput('position', 'top');
    fixture.detectChanges();
    expect(component.positionClass()).toBe('tooltip--top');
  });

  it('should have positionClass computed correctly for bottom', () => {
    fixture.componentRef.setInput('position', 'bottom');
    fixture.detectChanges();
    expect(component.positionClass()).toBe('tooltip--bottom');
  });

  it('should have positionClass computed correctly for left', () => {
    fixture.componentRef.setInput('position', 'left');
    fixture.detectChanges();
    expect(component.positionClass()).toBe('tooltip--left');
  });

  it('should have positionClass computed correctly for right', () => {
    fixture.componentRef.setInput('position', 'right');
    fixture.detectChanges();
    expect(component.positionClass()).toBe('tooltip--right');
  });

  it('should show tooltip on mouse enter', () => {
    expect(component.isVisible()).toBe(false);
    component.onMouseEnter();
    expect(component.isVisible()).toBe(true);
  });

  it('should hide tooltip on mouse leave', () => {
    component.onMouseEnter();
    expect(component.isVisible()).toBe(true);
    component.onMouseLeave();
    expect(component.isVisible()).toBe(false);
  });

  it('should toggle visibility on mouse enter and leave', () => {
    expect(component.isVisible()).toBe(false);
    component.onMouseEnter();
    expect(component.isVisible()).toBe(true);
    component.onMouseLeave();
    expect(component.isVisible()).toBe(false);
  });

  it('should render tooltip text', () => {
    fixture.componentRef.setInput('text', 'Custom tooltip text');
    component.onMouseEnter();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const tooltipText = compiled.querySelector('.tooltip__text');
    expect(tooltipText?.textContent).toBe('Custom tooltip text');
  });
});

