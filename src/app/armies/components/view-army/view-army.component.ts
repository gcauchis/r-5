import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Army } from "./../../../core/models/army";
import { PdfDrawContext } from "./../../../core/models/pdf-draw-context";
import { Unit } from "./../../../core/models/unit";
import { Vehicle } from "./../../../core/models/vehicle";
import { PdfService } from "./../../../core/services/pdf.service";
import { UnitService } from "./../../../core/services/unit.service";
import { VehicleService } from "./../../../core/services/vehicle.service";

@Component({
  selector: "app-view-army",
  templateUrl: "./view-army.component.html",
  styleUrls: ["./view-army.component.css"],
})
export class ViewArmyComponent {
  @Input() army: Army;
  units: Unit[] = [];
  unitsCount: any = {};
  vehicles: Vehicle[] = [];
  vehiclesCount: any = {};

  @Input() showPdf: boolean = false;

  @ViewChild("armyCard") armyCard: ElementRef;
  public pdfDrawContext: PdfDrawContext;

  constructor(
    private unitService: UnitService,
    private vehicleService: VehicleService,
    private pdfService: PdfService
  ) {}

  ngOnChanges() {
    if (this.army) {
      this.units = [];
      this.unitsCount = {};
      this.vehicles = [];
      this.vehiclesCount = {};
      if (this.army.units != null) {
        this.army.units.forEach((link) => {
          this.unitService.get(link.id).subscribe((unit) => {
            if (unit != null) {
              this.units.push(unit);
              this.unitsCount[link.id] = link.count;
            }
          });
        });
      }
      if (this.army.vehicles != null) {
        this.army.vehicles.forEach((link) => {
          this.vehicleService.get(link.id).subscribe((vehicle) => {
            if (vehicle != null) {
              this.vehicles.push(vehicle);
              this.vehiclesCount[link.id] = link.count;
            }
          });
        });
      }
      this.pdfService
        .printArmy(this.army)
        .then((res) => (this.pdfDrawContext = res));
    }
  }
}
