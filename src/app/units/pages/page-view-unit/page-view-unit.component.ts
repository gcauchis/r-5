import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Unit } from "./../../../core/models/unit";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";
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

  constructor(
    private route: ActivatedRoute,
    public enumUtils: EnumUtilsService,
    public priceService: PriceService,
    public unitService: UnitService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("idUnit");
    if (id != 0) {
      this.unit = this.unitService.get(id);
    }
  }
}
