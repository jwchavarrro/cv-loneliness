import { Injectable } from '@angular/core';
import { Enum_SHARE_PLATFORM, Type_SHARE_PLATFORM } from '../../../../utils/types';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  /**
   * @name share
   * @description Comparte el contenido usando Web Share API si está disponible, o abre un menú de opciones
   * @param url - URL a compartir (opcional, por defecto: URL actual)
   * @param title - Título del contenido a compartir (opcional)
   * @param text - Texto descriptivo a compartir (opcional)
   */
  share(url?: string, title?: string, text?: string): void {
    const shareUrl = url || window.location.href;
    const shareTitle = title || document.title;
    const shareText = text || 'Mira este CV profesional';

    // Intentar usar Web Share API si está disponible (principalmente en móviles)
    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        text: shareText,
        url: shareUrl,
      }).catch((error) => {
        // Si el usuario cancela o hay un error, no hacer nada
        console.log('Error al compartir:', error);
      });
    } else {
      // Fallback: abrir en la red social por defecto (Twitter)
      this.shareOnTwitter(shareUrl, shareText);
    }
  }

  /**
   * @name shareOnFacebook
   * @description Comparte en Facebook
   * @param url - URL a compartir (opcional, por defecto: URL actual)
   */
  shareOnFacebook(url?: string): void {
    const shareUrl = encodeURIComponent(url || window.location.href);
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    this.openShareWindow(facebookUrl);
  }

  /**
   * @name shareOnTwitter
   * @description Comparte en Twitter/X
   * @param url - URL a compartir (opcional, por defecto: URL actual)
   * @param text - Texto del tweet (opcional)
   */
  shareOnTwitter(url?: string, text?: string): void {
    const shareUrl = encodeURIComponent(url || window.location.href);
    const shareText = encodeURIComponent(text || 'Mira este CV profesional');
    const twitterUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`;
    this.openShareWindow(twitterUrl);
  }

  /**
   * @name shareOnLinkedIn
   * @description Comparte en LinkedIn
   * @param url - URL a compartir (opcional, por defecto: URL actual)
   * @param title - Título del contenido (opcional)
   * @param summary - Resumen del contenido (opcional)
   */
  shareOnLinkedIn(url?: string, title?: string, summary?: string): void {
    const shareUrl = encodeURIComponent(url || window.location.href);
    const shareTitle = encodeURIComponent(title || document.title);
    const shareSummary = encodeURIComponent(summary || 'CV profesional');
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&title=${shareTitle}&summary=${shareSummary}`;
    this.openShareWindow(linkedInUrl);
  }

  /**
   * @name shareOnWhatsApp
   * @description Comparte en WhatsApp
   * @param url - URL a compartir (opcional, por defecto: URL actual)
   * @param text - Texto del mensaje (opcional)
   */
  shareOnWhatsApp(url?: string, text?: string): void {
    const shareUrl = encodeURIComponent(url || window.location.href);
    const shareText = encodeURIComponent(text || 'Mira este CV profesional');
    const whatsappUrl = `https://wa.me/?text=${shareText}%20${shareUrl}`;
    this.openShareWindow(whatsappUrl);
  }

  /**
   * @name shareOnPlatform
   * @description Comparte en una plataforma específica
   * @param platform - Plataforma donde compartir
   * @param url - URL a compartir (opcional)
   * @param text - Texto a compartir (opcional)
   */
  shareOnPlatform(platform: Type_SHARE_PLATFORM, url?: string, text?: string): void {
    switch (platform) {
      case Enum_SHARE_PLATFORM.FACEBOOK:
        this.shareOnFacebook(url);
        break;
      case Enum_SHARE_PLATFORM.TWITTER:
        this.shareOnTwitter(url, text);
        break;
      case Enum_SHARE_PLATFORM.LINKEDIN:
        this.shareOnLinkedIn(url, text);
        break;
      case Enum_SHARE_PLATFORM.WHATSAPP:
        this.shareOnWhatsApp(url, text);
        break;
      case Enum_SHARE_PLATFORM.NATIVE:
        this.share(url, text);
        break;
      default:
        this.share(url, text);
    }
  }

  /**
   * @name openShareWindow
   * @description Abre una ventana para compartir
   * @param url - URL a abrir
   * @param width - Ancho de la ventana (opcional, por defecto: 600)
   * @param height - Alto de la ventana (opcional, por defecto: 400)
   */
  private openShareWindow(url: string, width: number = 600, height: number = 400): void {
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    window.open(
      url,
      'share',
      `width=${width},height=${height},left=${left},top=${top},toolbar=0,menubar=0,scrollbars=1,resizable=1`
    );
  }
}

