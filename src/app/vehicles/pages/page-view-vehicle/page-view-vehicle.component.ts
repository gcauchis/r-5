import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { VehicleType } from "./../../../core/enums/vehicle-type.enum";
import { Vehicle } from "./../../../core/models/vehicle";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";
import { PriceService } from "./../../../core/services/price.service";
import { VehicleService } from "./../../../core/services/vehicle.service";

@Component({
  selector: "app-page-view-vehicle",
  templateUrl: "./page-view-vehicle.component.html",
  styleUrls: ["./page-view-vehicle.component.css"],
})
export class PageViewVehicleComponent implements OnInit {
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
