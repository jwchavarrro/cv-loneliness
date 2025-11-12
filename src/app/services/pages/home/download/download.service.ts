import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  /**
   * @name downloadPdf
   * @description Descarga el PDF del CV desde la carpeta public/pdfs
   * @param filename - Nombre del archivo PDF a descargar (opcional, por defecto: 'cv-maria-soledad-duero.pdf')
   */
  downloadPdf(filename: string = 'cv-maria-soledad-duero.pdf'): void {
    const pdfUrl = `/pdfs/${filename}`;
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

