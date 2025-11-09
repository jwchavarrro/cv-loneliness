import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueBubbleComponent } from './dialogue-bubble.component';

describe('DialogueBubbleComponent', () => {
  let component: DialogueBubbleComponent;
  let fixture: ComponentFixture<DialogueBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogueBubbleComponent],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogueBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default message', () => {
    expect(component.message()).toBe('¡Hola! 👋');
  });

  it('should render default message', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('¡Hola! 👋');
  });

  it('should render custom message when provided', () => {
    fixture.componentRef.setInput('message', 'Custom message');
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Custom message');
  });
});

