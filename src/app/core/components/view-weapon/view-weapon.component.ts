import { Component, Input, OnInit } from "@angular/core";
import { WeaponType } from "./../../enums/weapon-type.enum";
import { Unit } from "./../../models/unit";
import { Weapon } from "./../../models/weapon";
import { EnumUtilsService } from "./../../services/enum-utils.service";

@Component({
  selector: "app-view-weapon",
  templateUrl: "./view-weapon.component.html",
  styleUrls: ["./view-weapon.component.css"],
})
export class ViewWeaponComponent implements OnInit {
  @Input() weapon: Weapon;
  @Input() unit: Unit;
  @Input() showRules: boolean = true;

  /** Pas terrible mais donne acces dans le template */
  WeaponType = WeaponType;

  constructor(public enumUtils: EnumUtilsService) {}

  ngOnInit(): void {}

  get hasRange(): boolean {
    return (
      this.weapon.range &&
      this.weapon.range > 0 &&
      this.weapon.weaponType != WeaponType.Melee
    );
  }

  get hasRule(): boolean {
    return this.showRules && this.weapon.rule && this.weapon.rule.length > 0;
  }
}
