import { Pipe, PipeTransform } from "@angular/core";
import { EnumUtilsService } from "./../../core/services/enum-utils.service";

@Pipe({
  name: "explosiveWeaponSizeToString",
})
export class ExplosiveWeaponSizeToStringPipe implements PipeTransform {
  constructor(private util: EnumUtilsService) {}

  transform(value: any): Promise<string> {
    return this.util.exposiveWeaponSizeToString(value);
  }
}
