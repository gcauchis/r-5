import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { PdfDrawContext } from "./../../../core/models/pdf-draw-context";
import { PdfService } from "./../../../core/services/pdf.service";

@Component({
  selector: "app-show-pdf",
  templateUrl: "./show-pdf.component.html",
  styleUrls: ["./show-pdf.component.scss"],
})
export class ShowPdfComponent {
  @Input() public pdfDrawContext: PdfDrawContext;
  @Input() public pdfName: string;
  @Input() public displayPDF: boolean = true;

  @ViewChild("pdf") pdf: ElementRef;

  constructor(private pdfService: PdfService) {}

  ngOnChanges() {
    if (this.pdfDrawContext) {
      this.pdfService
        .saveAsBase64(this.pdfDrawContext)
        .then((data) => (this.pdf.nativeElement.src = data));
    }
  }

  public openPDF(): void {
    this.pdfService.savePDF(this.pdfDrawContext, this.pdfName);
  }
}
