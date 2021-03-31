import { Pipe, PipeTransform } from "@angular/core";
import { CombatUnitInterface } from "./../../core/interfaces/combat-unit-interface";
import { PriceService } from "./../../core/services/price.service";

@Pipe({
  name: "priceCombatUnit",
})
export class PriceCombatUnitPipe implements PipeTransform {
  constructor(private priceService: PriceService) {}

  transform(item: CombatUnitInterface): number {
    return this.priceService.compute(item);
  }
}
