import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickyLabelComponent } from './sticky-label.component';

describe('StickyLabelComponent', () => {
  let component: StickyLabelComponent;
  let fixture: ComponentFixture<StickyLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StickyLabelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StickyLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

