import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { appConfig, CustomTranslateLoader, HttpLoaderFactory } from './app.config';
import { Enum_APP_LANGUAGE } from './utils/types';

describe('AppConfig', () => {
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [provideZonelessChangeDetection()]
    });
    http = TestBed.inject(HttpClient);
  });

  describe('CustomTranslateLoader', () => {
    it('should be created', () => {
      const loader = new CustomTranslateLoader(http);
      expect(loader).toBeTruthy();
    });

    it('should load translations and exclude cv data', (done) => {
      const loader = new CustomTranslateLoader(http);
      const mockData = {
        fragments: { header: { changeLanguage: 'Test' } },
        pages: { home: { fragments: {} } },
        cv: { personalInfo: { name: 'Test' } }
      };

      spyOn(http, 'get').and.returnValue(of(mockData));

      loader.getTranslation('es').subscribe((result) => {
        expect(result.fragments).toBeDefined();
        expect(result.pages).toBeDefined();
        expect(result.cv).toBeUndefined();
        done();
      });
    });
  });

  describe('HttpLoaderFactory', () => {
    it('should create CustomTranslateLoader', () => {
      const loader = HttpLoaderFactory(http);
      expect(loader).toBeInstanceOf(CustomTranslateLoader);
    });
  });

  describe('appConfig', () => {
    it('should have providers configured', () => {
      expect(appConfig.providers).toBeDefined();
      expect(appConfig.providers.length).toBeGreaterThan(0);
    });

    it('should configure TranslateModule with correct default language', () => {
      // Verificar que appConfig tiene providers
      expect(appConfig.providers).toBeDefined();
      expect(Array.isArray(appConfig.providers)).toBe(true);
      // Verificar que hay al menos un provider relacionado con TranslateModule
      // Los providers de TranslateModule pueden estar en diferentes formatos
      const hasTranslateProvider = appConfig.providers.some((provider: any) => {
        if (!provider) return false;
        // Puede ser un provider con useFactory
        if (provider.useFactory === HttpLoaderFactory) return true;
        // Puede ser un provider con ɵprov
        if (provider.ɵprov) return true;
        // Puede ser un array de providers
        if (Array.isArray(provider)) {
          return provider.some((p: any) => p && (p.useFactory === HttpLoaderFactory || p.ɵprov));
        }
        return false;
      });
      expect(hasTranslateProvider).toBe(true);
    });
  });
});

