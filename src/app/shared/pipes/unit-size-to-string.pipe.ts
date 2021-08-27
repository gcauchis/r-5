import { Pipe, PipeTransform } from "@angular/core";
import { EnumUtilsService } from "./../../core/services/enum-utils.service";

@Pipe({
  name: "unitSizeToString",
})
export class UnitSizeToStringPipe implements PipeTransform {
  constructor(private util: EnumUtilsService) {}

  async transform(value: any): Promise<string> {
    return this.util.unitSizeToString(value);
  }
}
