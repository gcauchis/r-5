import { PDFDocument, PDFFont, PDFPage, RGB } from "pdf-lib";

export interface PdfDrawContextInterface {
  document: PDFDocument;
  currentPage: PDFPage;
  pageWidth: number;
  pageHeight: number;
  pageMargin: number;
  font: PDFFont;
  fontSize: number;
  foreground: RGB;
  currentX: number;
  currentY: number;
}
