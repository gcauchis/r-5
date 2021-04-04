import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ExposiveWeaponSize } from "./../../../core/enums/exposive-weapon-size.enum";
import { WeaponType } from "./../../../core/enums/weapon-type.enum";
import { Weapon } from "./../../../core/models/weapon";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";
import { UtilsService } from "./../../../core/services/utils.service";
import { WeaponService } from "./../../../core/services/weapon.service";

@Component({
  selector: "app-page-edit-weapon",
  templateUrl: "./page-edit-weapon.component.html",
  styleUrls: ["./page-edit-weapon.component.css"],
})
export class PageEditWeaponComponent implements OnInit {
  /** Pas terrible mais donne acces dans le template */
  WeaponType = WeaponType;

  weaponTypes: any[];
  weaponSizes: any[];
  rules$: Subject<string[]>;
  currentRules$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  currentRule: string;

  rulesControl = new FormControl();
  rulesFilteredOptions: Observable<string[]>;

  weapon$: Observable<Weapon>;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private utils: UtilsService,
    public enumUtils: EnumUtilsService,
    private location: Location
  ) {
    this.weaponTypes = this.utils.enumToKeyValue(
      WeaponType,
      enumUtils.weaponTypeToString
    );
    this.weaponSizes = this.utils.enumToKeyValue(
      ExposiveWeaponSize,
      enumUtils.exposiveWeaponSizeToString
    );
  }

  ngOnInit() {
    this.getWeapon();
    this.rules$ = this.weaponService.getRules();
    this.rulesFilteredOptions = this.rulesControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  private refreshCurrentRules(): void {
    this.rules$.subscribe((rules) => this.currentRules$.next());
  }

  private _filter(value: string): string[] {
    const filterRule = value.toLowerCase();
    return this.rules.filter((rule) => rule.toLowerCase().includes(filterRule));
  }

  addRule(): void {
    this.weapon.rule.push(this.currentRule);
    this.currentRule = "";
  }

  removeRule(rule: string): void {
    this.weapon.rule = this.weapon.rule.filter((r) => r != rule);
  }

  getWeapon(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id == 0) {
      this.weapon = new Weapon();
      this.onChangecurrentWeaponType();
      this.weapon.editable = true;
    } else {
      this.weapon = this.weaponService.getWeapon(id);
      if (this.weapon == null) {
        this.weapon = new Weapon();
        this.onChangecurrentWeaponType();
        this.weapon.editable = true;
      }
    }
  }

  saveWeapon(): void {
    if (!this.weapon.nonLethal) {
      this.weapon.nonLethal = null;
    }
    this.weaponService.save(this.weapon);
    this.goBack();
  }

  onChangecurrentWeaponType() {
    if (this.weapon.weaponType == WeaponType.Melee) {
      delete this.weapon.range;
      delete this.weapon.rangeMin;
      delete this.weapon.assault;
      delete this.weapon.heavy;
      delete this.weapon.cover;
    }
    if (this.weapon.weaponType != WeaponType.Explosive) {
      delete this.weapon.size;
    }
    this.weapon.rule = [];
  }

  goBack(): void {
    this.location.back();
  }
}
