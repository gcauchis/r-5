import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Dice } from "./../../../core/enums/dice.enum";
import { Unit } from "./../../../core/models/unit";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";
import { UnitService } from "./../../../core/services/unit.service";
import { UtilsService } from "./../../../core/services/utils.service";

@Component({
  selector: "app-page-edit-unit",
  templateUrl: "./page-edit-unit.component.html",
  styleUrls: ["./page-edit-unit.component.css"],
})
export class PageEditUnitComponent implements OnInit {
  unit: Unit;

  constructor(
    private route: ActivatedRoute,
    private utils: UtilsService,
    public enumUtils: EnumUtilsService,
    private unitService: UnitService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getUnit();
  }

  getUnit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id == 0) {
      this.unit = this.buildBaseUnit();
    } else {
      this.unit = this.unitService.get(id);
      if (this.unit == null) {
        this.unit = this.buildBaseUnit();
      }
    }
  }

  private buildBaseUnit(): Unit {
    let unit = new Unit();
    unit.dqm = Dice.D8;
    unit.dc = Dice.D8;
    return unit;
  }

  saveUnit(unit: Unit): void {
    this.unitService.save(unit);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
