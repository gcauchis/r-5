import { Pipe, PipeTransform } from "@angular/core";
import { CombatUnitInterface } from "./../../core/interfaces/combat-unit-interface";
import { Weapon } from "./../../core/models/weapon";
import { PriceService } from "./../../core/services/price.service";

@Pipe({
  name: "priceWeapon",
})
export class PriceWeaponPipe implements PipeTransform {
  constructor(private priceService: PriceService) {}

  transform(weapon: Weapon, combatUnit: CombatUnitInterface): number {
    return this.priceService.getPrice(weapon, combatUnit);
  }
}
