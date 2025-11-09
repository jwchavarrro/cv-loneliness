import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvComponent } from './cv.component';
import { CvStore } from '../../../../stores/pages/home';

describe('CvComponent', () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;
  let cvStore: CvStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvComponent],
      providers: [provideZonelessChangeDetection()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvComponent);
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

  it('should have mappingCVData defined', () => {
    expect(component.mappingCVData).toBeDefined();
  });

  it('should have personalInfo in mappingCVData', () => {
    expect(component.mappingCVData.personalInfo).toBeDefined();
    expect(component.mappingCVData.personalInfo.name).toBe('Sol');
    expect(component.mappingCVData.personalInfo.profession).toBe('English Teacher | Professor');
  });

  it('should have experience array in mappingCVData', () => {
    expect(component.mappingCVData.experience).toBeDefined();
    expect(Array.isArray(component.mappingCVData.experience)).toBe(true);
    expect(component.mappingCVData.experience.length).toBeGreaterThan(0);
  });

  it('should have education array in mappingCVData', () => {
    expect(component.mappingCVData.education).toBeDefined();
    expect(Array.isArray(component.mappingCVData.education)).toBe(true);
    expect(component.mappingCVData.education.length).toBeGreaterThan(0);
  });

  it('should have skills array in mappingCVData', () => {
    expect(component.mappingCVData.skills).toBeDefined();
    expect(Array.isArray(component.mappingCVData.skills)).toBe(true);
    expect(component.mappingCVData.skills.length).toBeGreaterThan(0);
  });

  it('should have hobbies array in mappingCVData', () => {
    expect(component.mappingCVData.hobbies).toBeDefined();
    expect(Array.isArray(component.mappingCVData.hobbies)).toBe(true);
    expect(component.mappingCVData.hobbies.length).toBeGreaterThan(0);
  });

  it('should render personal info', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Sol');
    expect(compiled.textContent).toContain('English Teacher | Professor');
  });

  it('should render experience section', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Experience');
    // Note: Experience items are currently commented out in the template
    // expect(compiled.textContent).toContain('Colegio Primavera');
  });

  it('should render education section', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Education');
    // Note: Education items are currently commented out in the template
    // expect(compiled.textContent).toContain('Licenciatura en Enseñanza del Inglés');
  });
});
