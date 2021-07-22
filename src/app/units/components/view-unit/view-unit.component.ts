import { Component, Input, OnInit } from "@angular/core";
import { PdfDrawContext } from "./../../../core/models/pdf-draw-context";
import { Unit } from "./../../../core/models/unit";
import { PdfService } from "./../../../core/services/pdf.service";

@Component({
  selector: "app-view-unit",
  templateUrl: "./view-unit.component.html",
  styleUrls: ["./view-unit.component.css"],
})
export class ViewUnitComponent implements OnInit {
  @Input() unit: Unit;
  @Input() unitCount: number;
  @Input() showPdf: boolean = false;
  pdfContext: PdfDrawContext;

  constructor(private pdfService: PdfService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.unit) {
      this.pdfService
        .printUnit(this.unit)
        .then((res) => (this.pdfContext = res));
    }
  }
}
