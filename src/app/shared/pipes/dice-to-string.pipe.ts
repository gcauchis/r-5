import { Pipe, PipeTransform } from "@angular/core";
import { EnumUtilsService } from "./../../core/services/enum-utils.service";

@Pipe({
  name: "diceToString",
})
export class DiceToStringPipe implements PipeTransform {
  constructor(private util: EnumUtilsService) {}

  transform(value: any): string {
    return this.util.diceToString(value);
  }
}
