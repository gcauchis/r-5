import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Weapon } from "./../../../core/models/weapon";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";
import { WeaponService } from "./../../../core/services/weapon.service";

@Component({
  selector: "app-page-edit-weapon",
  templateUrl: "./page-edit-weapon.component.html",
  styleUrls: ["./page-edit-weapon.component.css"],
})
export class PageEditWeaponComponent implements OnInit {
  weapon$: Observable<Weapon>;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    public enumUtils: EnumUtilsService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getWeapon();
  }

  getWeapon(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id == 0) {
      this.weapon$ = new Observable((obs) => {
        obs.next(this.buildBaseWeapon());
        obs.complete();
      });
    } else {
      this.weapon$ = this.weaponService.get(id, this.buildBaseWeapon());
    }
  }

  buildBaseWeapon(): Weapon {
    let weapon: Weapon = new Weapon();
    weapon.editable = true;
    return weapon;
  }

  saveWeapon(weapon: Weapon): void {
    this.weaponService.save(weapon);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
