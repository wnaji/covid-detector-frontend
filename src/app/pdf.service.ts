import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  pdfMake: any;

  constructor() { }

  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule;
      this.pdfMake.vfs = pdfFontsModule.pdfMake.vfs;
      (window as any).pdfMake.vfs = pdfFontsModule.pdfMake.vfs;
    }
  }
  
  async generatePdf(content: any) {
    await this.loadPdfMaker();
    const def = { content: content };
    this.pdfMake.createPdf(def).open();
    //pour pouvoir générer un nouveau pdf au lieu d'utiliser celui en cache on reload
    setTimeout(() => {
      location.reload();
    }, 500);
  }
}