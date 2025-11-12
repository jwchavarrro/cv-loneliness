import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ShareService } from './share.service';
import { Enum_SHARE_PLATFORM } from '../../../../utils/types';

describe('ShareService', () => {
  let service: ShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()]
    });
    service = TestBed.inject(ShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('share', () => {
    it('should use Web Share API if available', async () => {
      // Arrange
      const mockShare = jasmine.createSpy('share').and.returnValue(Promise.resolve());
      (navigator as any).share = mockShare;

      // Act
      service.share();

      // Assert
      expect(mockShare).toHaveBeenCalledWith({
        title: document.title,
        text: 'Mira este CV profesional',
        url: window.location.href,
      });

      // Cleanup
      delete (navigator as any).share;
    });

    it('should fallback to Twitter if Web Share API is not available', () => {
      // Arrange
      const openSpy = spyOn(window, 'open');
      (navigator as any).share = undefined;

      // Act
      service.share();

      // Assert
      expect(openSpy).toHaveBeenCalled();
      const callArgs = openSpy.calls.mostRecent().args[0];
      expect(callArgs).toContain('twitter.com/intent/tweet');
    });

    it('should use custom URL, title and text when provided', async () => {
      // Arrange
      const mockShare = jasmine.createSpy('share').and.returnValue(Promise.resolve());
      (navigator as any).share = mockShare;
      const customUrl = 'https://example.com';
      const customTitle = 'Mi CV';
      const customText = 'Revisa mi CV';

      // Act
      service.share(customUrl, customTitle, customText);

      // Assert
      expect(mockShare).toHaveBeenCalledWith({
        title: customTitle,
        text: customText,
        url: customUrl,
      });

      // Cleanup
      delete (navigator as any).share;
    });
  });

  describe('shareOnFacebook', () => {
    it('should open Facebook share window with current URL', () => {
      // Arrange
      const openSpy = spyOn(window, 'open');

      // Act
      service.shareOnFacebook();

      // Assert
      expect(openSpy).toHaveBeenCalled();
      const callArgs = openSpy.calls.mostRecent().args[0];
      expect(callArgs).toContain('facebook.com/sharer');
      expect(callArgs).toContain(encodeURIComponent(window.location.href));
    });

    it('should open Facebook share window with custom URL', () => {
      // Arrange
      const openSpy = spyOn(window, 'open');
      const customUrl = 'https://example.com/cv';

      // Act
      service.shareOnFacebook(customUrl);

      // Assert
      expect(openSpy).toHaveBeenCalled();
      const callArgs = openSpy.calls.mostRecent().args[0];
      expect(callArgs).toContain('facebook.com/sharer');
      expect(callArgs).toContain(encodeURIComponent(customUrl));
    });
  });

  describe('shareOnTwitter', () => {
    it('should open Twitter share window with current URL', () => {
      // Arrange
      const openSpy = spyOn(window, 'open');

      // Act
      service.shareOnTwitter();

      // Assert
      expect(openSpy).toHaveBeenCalled();
      const callArgs = openSpy.calls.mostRecent().args[0];
      expect(callArgs).toContain('twitter.com/intent/tweet');
      expect(callArgs).toContain(encodeURIComponent(window.location.href));
    });

    it('should open Twitter share window with custom URL and text', () => {
      // Arrange
      const openSpy = spyOn(window, 'open');
      const customUrl = 'https://example.com/cv';
      const customText = 'Mira mi CV';

      // Act
      service.shareOnTwitter(customUrl, customText);

      // Assert
      expect(openSpy).toHaveBeenCalled();
      const callArgs = openSpy.calls.mostRecent().args[0];
      expect(callArgs).toContain('twitter.com/intent/tweet');
      expect(callArgs).toContain(encodeURIComponent(customUrl));
      expect(callArgs).toContain(encodeURIComponent(customText));
    });
  });

  describe('shareOnLinkedIn', () => {
    it('should open LinkedIn share window with current URL', () => {
      // Arrange
      const openSpy = spyOn(window, 'open');

      // Act
      service.shareOnLinkedIn();

      // Assert
      expect(openSpy).toHaveBeenCalled();
      const callArgs = openSpy.calls.mostRecent().args[0];
      expect(callArgs).toContain('linkedin.com/sharing');
      expect(callArgs).toContain(encodeURIComponent(window.location.href));
    });

    it('should open LinkedIn share window with custom parameters', () => {
      // Arrange
      const openSpy = spyOn(window, 'open');
      const customUrl = 'https://example.com/cv';
      const customTitle = 'Mi CV';
      const customSummary = 'CV profesional';

      // Act
      service.shareOnLinkedIn(customUrl, customTitle, customSummary);

      // Assert
      expect(openSpy).toHaveBeenCalled();
      const callArgs = openSpy.calls.mostRecent().args[0];
      expect(callArgs).toContain('linkedin.com/sharing');
      expect(callArgs).toContain(encodeURIComponent(customUrl));
      expect(callArgs).toContain(encodeURIComponent(customTitle));
      expect(callArgs).toContain(encodeURIComponent(customSummary));
    });
  });

  describe('shareOnWhatsApp', () => {
    it('should open WhatsApp share window with current URL', () => {
      // Arrange
      const openSpy = spyOn(window, 'open');

      // Act
      service.shareOnWhatsApp();

      // Assert
      expect(openSpy).toHaveBeenCalled();
      const callArgs = openSpy.calls.mostRecent().args[0];
      expect(callArgs).toContain('wa.me');
      expect(callArgs).toContain(encodeURIComponent(window.location.href));
    });

    it('should open WhatsApp share window with custom URL and text', () => {
      // Arrange
      const openSpy = spyOn(window, 'open');
      const customUrl = 'https://example.com/cv';
      const customText = 'Mira mi CV';

      // Act
      service.shareOnWhatsApp(customUrl, customText);

      // Assert
      expect(openSpy).toHaveBeenCalled();
      const callArgs = openSpy.calls.mostRecent().args[0];
      expect(callArgs).toContain('wa.me');
      expect(callArgs).toContain(encodeURIComponent(customUrl));
      expect(callArgs).toContain(encodeURIComponent(customText));
    });
  });

  describe('shareOnPlatform', () => {
    it('should call shareOnFacebook when platform is facebook', () => {
      // Arrange
      const shareOnFacebookSpy = spyOn(service, 'shareOnFacebook');

      // Act
      service.shareOnPlatform(Enum_SHARE_PLATFORM.FACEBOOK);

      // Assert
      expect(shareOnFacebookSpy).toHaveBeenCalled();
    });

    it('should call shareOnTwitter when platform is twitter', () => {
      // Arrange
      const shareOnTwitterSpy = spyOn(service, 'shareOnTwitter');

      // Act
      service.shareOnPlatform(Enum_SHARE_PLATFORM.TWITTER);

      // Assert
      expect(shareOnTwitterSpy).toHaveBeenCalled();
    });

    it('should call shareOnLinkedIn when platform is linkedin', () => {
      // Arrange
      const shareOnLinkedInSpy = spyOn(service, 'shareOnLinkedIn');

      // Act
      service.shareOnPlatform(Enum_SHARE_PLATFORM.LINKEDIN);

      // Assert
      expect(shareOnLinkedInSpy).toHaveBeenCalled();
    });

    it('should call shareOnWhatsApp when platform is whatsapp', () => {
      // Arrange
      const shareOnWhatsAppSpy = spyOn(service, 'shareOnWhatsApp');

      // Act
      service.shareOnPlatform(Enum_SHARE_PLATFORM.WHATSAPP);

      // Assert
      expect(shareOnWhatsAppSpy).toHaveBeenCalled();
    });

    it('should call share when platform is native', () => {
      // Arrange
      const shareSpy = spyOn(service, 'share');

      // Act
      service.shareOnPlatform(Enum_SHARE_PLATFORM.NATIVE);

      // Assert
      expect(shareSpy).toHaveBeenCalled();
    });
  });
});

