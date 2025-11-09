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
});

