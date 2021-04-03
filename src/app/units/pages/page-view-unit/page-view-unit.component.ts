import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PdfDrawContext } from "src/app/core/models/pdf-draw-context";
import { Unit } from "./../../../core/models/unit";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";
import { PdfService } from "./../../../core/services/pdf.service";
import { PriceService } from "./../../../core/services/price.service";
import { UnitService } from "./../../../core/services/unit.service";

@Component({
  selector: "app-page-view-unit",
  templateUrl: "./page-view-unit.component.html",
  styleUrls: ["./page-view-unit.component.css"],
})
export class PageViewUnitComponent implements OnInit {
  @Input() unit: Unit;
  @Input() unitCount: number;
  @Input() showPdf: boolean = false;
  pdfContext: PdfDrawContext;

  constructor(
    private route: ActivatedRoute,
    public enumUtils: EnumUtilsService,
    public priceService: PriceService,
    public unitService: UnitService,
    public pdfService: PdfService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("idUnit");
    if (id != 0) {
      this.unit = this.unitService.get(id);
    }
    if (this.unit) {
      this.pdfService
        .printUnit(this.unit)
        .then((res) => (this.pdfContext = res));
    }
  }
}
