import { Component, Input, OnInit } from "@angular/core";
import { WeaponType } from "./../../../core/enums/weapon-type.enum";
import { CombatUnitInterface } from "./../../../core/interfaces/combat-unit-interface";
import { Weapon } from "./../../../core/models/weapon";

@Component({
  selector: "app-view-weapon",
  templateUrl: "./view-weapon.component.html",
  styleUrls: ["./view-weapon.component.css"],
})
export class ViewWeaponComponent implements OnInit {
  @Input() weapon: Weapon;
  @Input() combatUnit: CombatUnitInterface;
  @Input() showRules: boolean = true;

  /** Pas terrible mais donne acces dans le template */
  WeaponType = WeaponType;

  constructor() {}

  ngOnInit(): void {}

  get hasRange(): boolean {
    return (
      this.weapon.range &&
      this.weapon.range > 0 &&
      this.weapon.weaponType != WeaponType.Melee
    );
  }
}
