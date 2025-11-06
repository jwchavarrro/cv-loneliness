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
});

