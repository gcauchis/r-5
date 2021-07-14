import { Pipe, PipeTransform } from "@angular/core";
import { EnumUtilsService } from "./../../core/services/enum-utils.service";

@Pipe({
  name: "vehicleTypeToString",
})
export class VehicleTypeToStringPipe implements PipeTransform {
  constructor(private util: EnumUtilsService) {}

  transform(value: any): string {
    return this.util.vehicleTypeToString(value);
  }
}
