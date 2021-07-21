import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Dice } from "./../../../core/enums/dice.enum";
import { VehicleType } from "./../../../core/enums/vehicle-type.enum";
import { Vehicle } from "./../../../core/models/vehicle";
import { VehicleService } from "./../../../core/services/vehicle.service";

@Component({
  selector: "app-page-edit-vehicle",
  templateUrl: "./page-edit-vehicle.component.html",
  styleUrls: ["./page-edit-vehicle.component.css"],
})
export class PageEditVehicleComponent implements OnInit {
  vehicle: Vehicle;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private vehicleService: VehicleService
  ) {}

  ngOnInit() {
    this.getVehicle();
  }

  getVehicle(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id == 0) {
      this.vehicle = this.buildBaseVehicle();
    } else {
      this.vehicle = this.vehicleService.get(id);
      if (this.vehicle == null) {
        this.vehicle = this.buildBaseVehicle();
      }
    }
  }

  private buildBaseVehicle(): Vehicle {
    let vehicle = new Vehicle();
    vehicle.armor = Dice.D8;
    vehicle.structure = 1;
    vehicle.type = VehicleType.Tank;
    return vehicle;
  }

  save(vehicle: Vehicle): void {
    this.vehicleService.save(vehicle);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
