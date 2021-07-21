import { Pipe, PipeTransform } from "@angular/core";
import { Unit } from "./../../core/models/unit";
import { UnitService } from "./../../core/services/unit.service";

@Pipe({
  name: "unitRunMove",
})
export class UnitRunMovePipe implements PipeTransform {
  constructor(private unitService: UnitService) {}

  transform(unit: Unit): number {
    return this.unitService.getRunMove(unit);
  }
}
