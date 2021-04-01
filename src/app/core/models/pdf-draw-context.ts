import { PDFDocument, PDFFont, PDFPage, rgb, StandardFonts } from "pdf-lib";
import { PdfDrawContextInterface } from "./../interfaces/pdf-draw-context-interface";

export class PdfDrawContext implements PdfDrawContextInterface {
  _document!: PDFDocument;
  _currentPage!: PDFPage;
  pageWidth!: number;
  pageHeight!: number;
  _pageMargin = 40;
  font!: PDFFont;
  fontSize = 12;
  foreground = rgb(0, 0, 0);
  currentX: number;
  currentY: number;

  public static create(
    obj?: Partial<PdfDrawContextInterface>
  ): Promise<PdfDrawContext> {
    return new Promise((resolve, reject) =>
      PDFDocument.create().then((document) =>
        document
          .embedFont(StandardFonts.TimesRoman)
          .then((font) =>
            resolve(new PdfDrawContext({ document: document, font: font }))
          )
      )
    );
  }

  private constructor(obj?: Partial<PdfDrawContextInterface>) {
    if (obj) {
      Object.assign(this, obj);
    }
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
      font: this.font,
      color: this.foreground,
    };
  }

  public basicDrawTestLine(text: string): void {
    if (this._currentPage) {
      this._currentPage.drawText(text, this.drawStringContext);
      this.currentY = this.currentY - this.fontSize;
    }
  }

  public addVerticalGap(gap: number): void {
    this.currentY = this.currentY - gap;
  }

  public save(): Promise<Uint8Array> {
    // Serialize the PDFDocument to bytes (a Uint8Array)
    return this._document.save();
  }
}
