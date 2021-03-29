import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { VehicleType } from "./../../enums/vehicle-type.enum";
import { Vehicle } from "./../../models/vehicle";
import { EnumUtilsService } from "./../../services/enum-utils.service";
import { PriceService } from "./../../services/price.service";
import { VehicleService } from "./../../services/vehicle.service";

@Component({
  selector: "app-view-vehicle",
  templateUrl: "./view-vehicle.component.html",
  styleUrls: ["./view-vehicle.component.css"],
})
export class ViewVehicleComponent implements OnInit {
  @Input() vehicle: Vehicle;
  @Input() showPdfButton: boolean = false;

  VehicleType = VehicleType;

  constructor(
    private route: ActivatedRoute,
    public enumUtils: EnumUtilsService,
    public priceService: PriceService,
    public vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id != 0) {
      this.vehicle = this.vehicleService.get(id);
    }
  }
}
