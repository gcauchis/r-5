import { Pipe, PipeTransform } from "@angular/core";
import { EnumUtilsService } from "./../../core/services/enum-utils.service";

@Pipe({
  name: "moveTypeToString",
})
export class MoveTypeToStringPipe implements PipeTransform {
  constructor(private util: EnumUtilsService) {}

  transform(value: any): Promise<string> {
    return this.util.moveTypeToString(value);
  }
}
