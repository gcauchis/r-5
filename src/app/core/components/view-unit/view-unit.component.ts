import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WeaponType } from "./../../enums/weapon-type.enum";
import { Unit } from "./../../models/unit";
import { Weapon } from "./../../models/weapon";
import { EnumUtilsService } from "./../../services/enum-utils.service";
import { PriceService } from "./../../services/price.service";
import { UnitService } from "./../../services/unit.service";

@Component({
  selector: "app-view-unit",
  templateUrl: "./view-unit.component.html",
  styleUrls: ["./view-unit.component.scss"],
})
export class ViewUnitComponent implements OnInit {
  @Input() unit: Unit;
  @Input() showPdfButton: boolean = false;
  @Input() unitCount: number;

  constructor(
    private route: ActivatedRoute,
    public enumUtils: EnumUtilsService,
    public priceService: PriceService,
    public unitService: UnitService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("idUnit");
    if (id != 0) {
      this.unit = this.unitService.get(id);
    }
  }

  get meleeWeapons(): Weapon[] {
    let result =
      this.unit.weapons == null
        ? null
        : this.unit.weapons.filter((w) => w.weaponType == WeaponType.Melee);
    return result == null || result.length <= 0 ? null : result;
  }

  get shootWeapons(): Weapon[] {
    let result =
      this.unit.weapons == null
        ? null
        : this.unit.weapons.filter((w) => w.weaponType == WeaponType.Shoot);
    return result == null || result.length <= 0 ? null : result;
  }

  get explosiveWeapons(): Weapon[] {
    let result =
      this.unit.weapons == null
        ? null
        : this.unit.weapons.filter((w) => w.weaponType == WeaponType.Explosive);
    return result == null || result.length <= 0 ? null : result;
  }

  get grenadeWeapons(): Weapon[] {
    let result =
      this.unit.weapons == null
        ? null
        : this.unit.weapons.filter((w) => w.weaponType == WeaponType.Grenade);
    return result == null || result.length <= 0 ? null : result;
  }
}
