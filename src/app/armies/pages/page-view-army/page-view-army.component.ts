import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PdfDrawContext } from "src/app/core/models/pdf-draw-context";
import { Army } from "./../../../core/models/army";
import { Unit } from "./../../../core/models/unit";
import { Vehicle } from "./../../../core/models/vehicle";
import { ArmyService } from "./../../../core/services/army.service";
import { PdfService } from "./../../../core/services/pdf.service";
import { UnitService } from "./../../../core/services/unit.service";
import { VehicleService } from "./../../../core/services/vehicle.service";

@Component({
  selector: "app-page-view-army",
  templateUrl: "./page-view-army.component.html",
  styleUrls: ["./page-view-army.component.css"],
})
export class PageViewArmyComponent implements OnInit {
  @Input() army: Army;
  units: Unit[] = [];
  unitsCount: any = {};
  vehicles: Vehicle[] = [];
  vehiclesCount: any = {};

  @ViewChild("armyCard") armyCard: ElementRef;
  public pdfDrawContext: PdfDrawContext;

  constructor(
    private route: ActivatedRoute,
    public armyService: ArmyService,
    public unitService: UnitService,
    public vehicleService: VehicleService,
    private pdfService: PdfService
  ) {}

  ngOnInit(): void {
    this.units = [];
    this.unitsCount = {};
    this.vehicles = [];
    this.vehiclesCount = {};
    const id = +this.route.snapshot.paramMap.get("idArmy");
    if (id != 0) {
      this.army = this.armyService.get(id);
      if (this.army != null) {
        if (this.army.units != null) {
          this.army.units.forEach((link) => {
            let unit = this.unitService.get(link.id);
            if (unit != null) {
              this.units.push(unit);
              this.unitsCount[link.id] = link.count;
            }
          });
        }
        if (this.army.vehicles != null) {
          this.army.vehicles.forEach((link) => {
            let vehicle = this.vehicleService.get(link.id);
            if (vehicle != null) {
              this.vehicles.push(vehicle);
              this.vehiclesCount[link.id] = link.count;
            }
          });
        }
      }
    }
    this.pdfService
      .printArmy(this.army)
      .then((res) => (this.pdfDrawContext = res));
  }
}
