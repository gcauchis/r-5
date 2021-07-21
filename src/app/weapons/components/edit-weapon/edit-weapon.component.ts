import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { ExposiveWeaponSize } from "./../../../core/enums/exposive-weapon-size.enum";
import { WeaponType } from "./../../../core/enums/weapon-type.enum";
import { Weapon } from "./../../../core/models/weapon";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";
import { UtilsService } from "./../../../core/services/utils.service";
import { WeaponService } from "./../../../core/services/weapon.service";

@Component({
  selector: "app-edit-weapon",
  templateUrl: "./edit-weapon.component.html",
  styleUrls: ["./edit-weapon.component.css"],
})
export class EditWeaponComponent implements OnInit {
  WeaponType = WeaponType;

  weaponTypes: any[];
  weaponSizes: any[];
  rules: string[];
  currentRule: string;

  rulesControl = new FormControl();
  rulesFilteredOptions: Observable<string[]>;

  @Output() submited: EventEmitter<Weapon> = new EventEmitter<Weapon>();
  @Output() canceled: EventEmitter<any> = new EventEmitter<any>();

  @Input() weapon: Weapon;

  constructor(
    private weaponService: WeaponService,
    private utils: UtilsService,
    public enumUtils: EnumUtilsService
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

  ngOnInit(): void {
    this.rules = this.weaponService.getRules();
    this.rulesFilteredOptions = this.rulesControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filter(value))
    );
  }

  ngOnChanges() {}

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

  submit(): void {
    if (!this.weapon.nonLethal) {
      this.weapon.nonLethal = null;
    }
    this.submited.emit(this.weapon);
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

  cancel(): void {
    this.canceled.emit();
  }
}
