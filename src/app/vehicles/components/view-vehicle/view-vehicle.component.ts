import { Component, Input, OnInit } from "@angular/core";
import { VehicleType } from "./../../../core/enums/vehicle-type.enum";
import { PdfDrawContext } from "./../../../core/models/pdf-draw-context";
import { Vehicle } from "./../../../core/models/vehicle";
import { PdfService } from "./../../../core/services/pdf.service";

@Component({
  selector: "app-view-vehicle",
  templateUrl: "./view-vehicle.component.html",
  styleUrls: ["./view-vehicle.component.css"],
})
export class ViewVehicleComponent implements OnInit {
  @Input() vehicle: Vehicle;
  @Input() vehicleCount: number;
  @Input() showPdf: boolean = false;
  pdfContext: PdfDrawContext;

  VehicleType = VehicleType;

  constructor(public pdfService: PdfService) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.vehicle) {
      this.pdfService
        .printVehicle(this.vehicle)
        .then((res) => (this.pdfContext = res));
    }
  }
}
