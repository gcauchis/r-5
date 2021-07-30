import { Pipe, PipeTransform } from "@angular/core";
import { Weapon } from "./../../core/models/weapon";
import { WeaponService } from "./../../core/services/weapon.service";

@Pipe({
  name: "weaponRulesToString",
})
export class WeaponRulesToStringPipe implements PipeTransform {
  constructor(private weaponService: WeaponService) {}

  transform(weapon: Weapon, useParenthesis: boolean = true): string {
    let rules = this.weaponService.retrieveRules(weapon);
    let result = "";
    if (rules != null) {
      result = rules.join(", ");
      if (useParenthesis) result = "(" + result + ")";
    }
    return result;
  }
}
