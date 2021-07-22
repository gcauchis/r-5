import { Pipe, PipeTransform } from "@angular/core";
import { Vehicle } from "./../../core/models/vehicle";
import { VehicleService } from "./../../core/services/vehicle.service";

@Pipe({
  name: "vehicleRunMove",
})
export class VehicleRunMovePipe implements PipeTransform {
  constructor(private vehicleService: VehicleService) {}

  transform(vehicle: Vehicle): number {
    return this.vehicleService.getRunMove(vehicle);
  }
}
