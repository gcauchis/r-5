import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from "pdf-lib";
import { PdfDrawContextInterface } from "./../interfaces/pdf-draw-context-interface";

export class PdfDrawContext implements PdfDrawContextInterface {
  _document!: PDFDocument;
  _currentPage!: PDFPage;
  pageWidth!: number;
  pageHeight!: number;
  _pageMargin = 40;
  font!: PDFFont;
  fontBold!: PDFFont;
  fontSize = 12;
  foreground = rgb(0, 0, 0);
  currentX: number;
  currentY: number;
  _curentFont: PDFFont;
  interLine = 2;

  public static create(
    obj?: Partial<PdfDrawContextInterface>
  ): Promise<PdfDrawContext> {
    return new Promise((resolve, reject) => {
      const result = new PdfDrawContext(obj);
      PDFDocument.create()
        .then((document) => (result.document = document))
        .then(() => result.document.embedFont(StandardFonts.TimesRoman))
        .then((font) => (result.font = font))
        .then(() => result.document.embedFont(StandardFonts.TimesRomanBold))
        .then((font) => (result.fontBold = font))
        .then(() => resolve(result));
    });
  }

  private constructor(obj?: Partial<PdfDrawContextInterface>) {
    if (obj) {
      Object.assign(this, obj);
      if (!this._curentFont && this.font) {
        this._curentFont = this.font;
      }
    }
  }

  public get curentFont(): PDFFont {
    return this._curentFont;
  }

  public set curentFont(value: PDFFont) {
    this._curentFont = value;
  }

  public get document(): PDFDocument {
    return this._document;
  }

  public set document(value: PDFDocument) {
    this._document = value;
    this.addPage();
  }

  public addPage(): void {
    if (this._document) {
      this.currentPage = this._document.addPage();
    }
  }

  public get currentPage(): PDFPage {
    return this._currentPage;
  }

  public set currentPage(value: PDFPage) {
    this._currentPage = value;
    if (this._currentPage) {
      let size = this._currentPage.getSize();
      this.pageWidth = size.width;
      this.pageHeight = size.height;
    }
    this.initPagePointerLocation();
  }

  public get pageMargin(): number {
    return this._pageMargin;
  }

  public set pageMargin(value: number) {
    this._pageMargin = value;
    this.initPagePointerLocation();
  }

  public initPagePointerLocation(): void {
    this.currentX = this._pageMargin;
    this.currentY = this.pageHeight - this._pageMargin;
  }

  public get drawStringContext(): any {
    return {
      x: this.currentX,
      y: this.currentY,
      size: this.fontSize,
      font: this.curentFont,
      color: this.foreground,
    };
  }

  public basicDrawTestLine(text: string, bold?: boolean): void {
    this.drawText(text, bold);
    this.lineBreak();
  }

  public lineBreak(): void {
    this.currentX = this._pageMargin;
    this.currentY = this.currentY - this.fontSize - this.interLine;
  }

  public drawText(text: string, bold?: boolean): void {
    this.curentFont = bold ? this.fontBold : this.font;
    this._currentPage.drawText(text, this.drawStringContext);
    this.currentX += this.curentFont.widthOfTextAtSize(text, this.fontSize);
  }

  public addVerticalGap(gap: number): void {
    this.currentY = this.currentY - gap;
  }

  public addHorizontalGap(gap: number): void {
    this.currentX = this.currentX + gap;
  }

  public save(): Promise<Uint8Array> {
    // Serialize the PDFDocument to bytes (a Uint8Array)
    return this._document.save();
  }
}
