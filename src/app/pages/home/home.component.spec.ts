import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant', 'use', 'setDefaultLang'], {
      currentLang: 'en'
    });
    translateServiceSpy.instant.and.returnValue('Test');
    translateServiceSpy.use.and.returnValue(of('en'));
    translateServiceSpy.setDefaultLang.and.returnValue(undefined);
    translateServiceSpy.onLangChange = of({ lang: 'en', translations: {} });
    translateServiceSpy.onDefaultLangChange = of({ lang: 'en', translations: {} });

    await TestBed.configureTestingModule({
      imports: [HomeComponent, HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        provideZonelessChangeDetection(),
        { provide: TranslateService, useValue: translateServiceSpy }
      ]
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
});

