import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    const translateServiceSpy = jasmine.createSpyObj('TranslateService', ['instant', 'use', 'setDefaultLang'], {
      currentLang: 'en',
      onLangChange: of({ lang: 'en', translations: {} }),
      onDefaultLangChange: of({ lang: 'en', translations: {} })
    });
    translateServiceSpy.instant.and.returnValue('Test');
    translateServiceSpy.use.and.returnValue(of({ lang: 'en', translations: {} }));
    translateServiceSpy.setDefaultLang.and.returnValue(of({ lang: 'en', translations: {} }));

    await TestBed.configureTestingModule({
      imports: [App, HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        provideZonelessChangeDetection(),
        { provide: TranslateService, useValue: translateServiceSpy }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render router-outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
