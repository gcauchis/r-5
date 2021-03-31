import { Component, Input, OnInit } from "@angular/core";
import { CombatUnitInterface } from "../../../core/interfaces/combat-unit-interface";
import { WeaponType } from "./../../../core/enums/weapon-type.enum";
import { Weapon } from "./../../../core/models/weapon";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";

@Component({
  selector: "app-page-view-weapon",
  templateUrl: "./page-view-weapon.component.html",
  styleUrls: ["./page-view-weapon.component.css"],
})
export class PageViewWeaponComponent implements OnInit {
  @Input() weapon: Weapon;
  @Input() priceable: CombatUnitInterface;
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
