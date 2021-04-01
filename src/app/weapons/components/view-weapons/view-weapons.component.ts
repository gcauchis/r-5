import { Component, Input, OnInit } from "@angular/core";
import { WeaponType } from "./../../../core/enums/weapon-type.enum";
import { CombatUnitInterface } from "./../../../core/interfaces/combat-unit-interface";
import { Weapon } from "./../../../core/models/weapon";

@Component({
  selector: "app-view-weapons",
  templateUrl: "./view-weapons.component.html",
  styleUrls: ["./view-weapons.component.css"],
})
export class ViewWeaponsComponent implements OnInit {
  @Input() combatUnit: CombatUnitInterface;

  constructor() {}

  ngOnInit(): void {}

  get meleeWeapons(): Weapon[] {
    let result =
      this.combatUnit.weapons == null
        ? null
        : this.combatUnit.weapons.filter(
            (w) => w.weaponType == WeaponType.Melee
          );
    return result == null || result.length <= 0 ? null : result;
  }

  get shootWeapons(): Weapon[] {
    let result =
      this.combatUnit.weapons == null
        ? null
        : this.combatUnit.weapons.filter(
            (w) => w.weaponType == WeaponType.Shoot
          );
    return result == null || result.length <= 0 ? null : result;
  }

  get explosiveWeapons(): Weapon[] {
    let result =
      this.combatUnit.weapons == null
        ? null
        : this.combatUnit.weapons.filter(
            (w) => w.weaponType == WeaponType.Explosive
          );
    return result == null || result.length <= 0 ? null : result;
  }

  get grenadeWeapons(): Weapon[] {
    let result =
      this.combatUnit.weapons == null
        ? null
        : this.combatUnit.weapons.filter(
            (w) => w.weaponType == WeaponType.Grenade
          );
    return result == null || result.length <= 0 ? null : result;
  }
}
