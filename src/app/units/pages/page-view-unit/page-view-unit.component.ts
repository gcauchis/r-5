import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { WeaponType } from "./../../../core/enums/weapon-type.enum";
import { Unit } from "./../../../core/models/unit";
import { Weapon } from "./../../../core/models/weapon";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";
import { PriceService } from "./../../../core/services/price.service";
import { UnitService } from "./../../../core/services/unit.service";

@Component({
  selector: "app-page-view-unit",
  templateUrl: "./page-view-unit.component.html",
  styleUrls: ["./page-view-unit.component.css"],
})
export class PageViewUnitComponent implements OnInit {
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
