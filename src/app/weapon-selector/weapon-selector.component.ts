import { Component, OnInit, Input } from "@angular/core";
import { WeaponService } from "../weapon.service";
import { Weapon } from "../entities/weapon";
import { Unit } from "../entities/unit";
import { WeaponType } from "../entities/weapon-type.enum";
import { UtilsService } from "../utils.service";
import { EnumUtilsService } from "../enum-utils.service";
import { PriceService } from "../price.service";

@Component({
  selector: "app-weapon-selector",
  templateUrl: "./weapon-selector.component.html",
  styleUrls: ["./weapon-selector.component.css"]
})
export class WeaponSelectorComponent implements OnInit {
  @Input() unit: Unit;
  currentWeaponType: WeaponType = WeaponType.Melee;

  /** Pas terrible mais donne acces dans le template */
  WeaponType = WeaponType;

  selectableWeapon: Weapon[];
  weaponTypes: any[];

  constructor(
    public weaponService: WeaponService,
    private utils: UtilsService,
    public enumUtils: EnumUtilsService,
    public priceService: PriceService
  ) {
    this.currentWeaponType = WeaponType.Melee;
    this.selectableWeapon = weaponService.getWeapons(this.currentWeaponType);
    this.weaponTypes = this.utils.enumToKeyValue(
      WeaponType,
      enumUtils.weaponTypeToString
    );
  }

  ngOnInit() {}

  addWeapon(weapon: Weapon) {
    let weaponToAdd = new Weapon();
    Object.assign(weaponToAdd, weapon);
    weaponToAdd.id = null;
    this.unit.weapons.push(weaponToAdd);
  }

  onChangecurrentWeaponType() {
    this.selectableWeapon = this.weaponService.getWeapons(
      this.currentWeaponType
    );
  }
}
