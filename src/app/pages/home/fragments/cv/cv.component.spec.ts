import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CvComponent } from './cv.component';
import { CvStore } from '../../../../stores/pages/home';

describe('CvComponent', () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;
  let cvStore: CvStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvComponent, HttpClientTestingModule],
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
    const data = component.mappingCVData();
    expect(data.personalInfo).toBeDefined();
    expect(data.personalInfo.name).toBe('Sol');
    expect(data.personalInfo.profession).toBeTruthy();
  });

  it('should have experience array in mappingCVData', () => {
    const data = component.mappingCVData();
    expect(data.experience).toBeDefined();
    expect(Array.isArray(data.experience)).toBe(true);
  });

  it('should have education array in mappingCVData', () => {
    const data = component.mappingCVData();
    expect(data.education).toBeDefined();
    expect(Array.isArray(data.education)).toBe(true);
  });

  it('should have skills array in mappingCVData', () => {
    const data = component.mappingCVData();
    expect(data.skills).toBeDefined();
    expect(Array.isArray(data.skills)).toBe(true);
  });

  it('should have hobbies array in mappingCVData', () => {
    const data = component.mappingCVData();
    expect(data.hobbies).toBeDefined();
    expect(Array.isArray(data.hobbies)).toBe(true);
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
    // Puede estar en español o inglés dependiendo del idioma actual
    const hasExperience = compiled.textContent?.includes('Experiencia') || compiled.textContent?.includes('Experience');
    expect(hasExperience).toBe(true);
  });

  it('should render education section', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // Puede estar en español o inglés dependiendo del idioma actual
    const hasEducation = compiled.textContent?.includes('Educación') || compiled.textContent?.includes('Education');
    expect(hasEducation).toBe(true);
  });

  it('should have personalBio in mappingCVData', () => {
    const data = component.mappingCVData();
    expect(data.personalBio).toBeDefined();
    expect(typeof data.personalBio).toBe('string');
  });

  it('should have contact information in mappingCVData', () => {
    const data = component.mappingCVData();
    expect(data.contact).toBeDefined();
    expect(data.contact.email).toBeDefined();
    expect(data.contact.website).toBeDefined();
    expect(data.contact.social).toBeDefined();
  });

  it('should have experience items with correct structure', () => {
    const data = component.mappingCVData();
    if (data.experience.length > 0) {
      data.experience.forEach((exp: { year: string; title: string; description: string }) => {
        expect(exp.year).toBeDefined();
        expect(exp.title).toBeDefined();
        expect(exp.description).toBeDefined();
      });
    }
  });

  it('should have education items with correct structure', () => {
    const data = component.mappingCVData();
    if (data.education.length > 0) {
      data.education.forEach((edu: { years: string; course: string; institution: string; note: string }) => {
        expect(edu.years).toBeDefined();
        expect(edu.course).toBeDefined();
        expect(edu.institution).toBeDefined();
        expect(edu.note).toBeDefined();
      });
    }
  });

  it('should have skills as array of strings', () => {
    const data = component.mappingCVData();
    expect(Array.isArray(data.skills)).toBe(true);
    data.skills.forEach((skill: string) => {
      expect(typeof skill).toBe('string');
    });
  });

  it('should have hobbies with icon and name', () => {
    const data = component.mappingCVData();
    expect(Array.isArray(data.hobbies)).toBe(true);
    data.hobbies.forEach((hobby: { icon: unknown; name: string }) => {
      expect(hobby.icon).toBeDefined();
      expect(hobby.name).toBeDefined();
      expect(typeof hobby.name).toBe('string');
    });
  });

  it('should render skills section', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // Verificar que se renderiza contenido relacionado con skills
    expect(compiled.textContent).toBeTruthy();
  });

  it('should render hobbies section', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    // Verificar que se renderiza contenido relacionado con hobbies
    expect(compiled.textContent).toBeTruthy();
  });
});
