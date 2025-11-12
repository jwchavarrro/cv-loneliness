import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { DownloadService } from './download.service';

describe('DownloadService', () => {
  let service: DownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(DownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('downloadPdf', () => {
    it('should create and trigger download link with default filename', () => {
      // Arrange
      const createElementSpy = spyOn(document, 'createElement').and.callThrough();
      const appendChildSpy = spyOn(document.body, 'appendChild').and.callThrough();
      const removeChildSpy = spyOn(document.body, 'removeChild').and.callThrough();
      const clickSpy = jasmine.createSpy('click');

      // Create a real anchor element for proper DOM manipulation
      const realLink = document.createElement('a');
      spyOn(realLink, 'click').and.callFake(clickSpy);
      
      createElementSpy.and.returnValue(realLink);

      // Act
      service.downloadPdf();

      // Assert
      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(realLink.href).toContain('/pdfs/cv-maria-soledad-duero.pdf');
      expect(realLink.download).toBe('cv-maria-soledad-duero.pdf');
      expect(appendChildSpy).toHaveBeenCalled();
      expect(clickSpy).toHaveBeenCalled();
      expect(removeChildSpy).toHaveBeenCalled();
    });

    it('should create and trigger download link with custom filename', () => {
      // Arrange
      const customFilename = 'custom-cv.pdf';
      const createElementSpy = spyOn(document, 'createElement').and.callThrough();
      const appendChildSpy = spyOn(document.body, 'appendChild').and.callThrough();
      const removeChildSpy = spyOn(document.body, 'removeChild').and.callThrough();
      const clickSpy = jasmine.createSpy('click');

      // Create a real anchor element for proper DOM manipulation
      const realLink = document.createElement('a');
      spyOn(realLink, 'click').and.callFake(clickSpy);
      
      createElementSpy.and.returnValue(realLink);

      // Act
      service.downloadPdf(customFilename);

      // Assert
      expect(createElementSpy).toHaveBeenCalledWith('a');
      expect(realLink.href).toContain(`/pdfs/${customFilename}`);
      expect(realLink.download).toBe(customFilename);
      expect(appendChildSpy).toHaveBeenCalled();
      expect(clickSpy).toHaveBeenCalled();
      expect(removeChildSpy).toHaveBeenCalled();
    });
  });
});

