import { WeaponService } from './../weapon.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Weapon } from '../entities/weapon';
import { WeaponType } from '../entities/weapon-type.enum';
import { UtilsService } from '../utils.service';
import { EnumUtilsService } from '../enum-utils.service';
import { ExposiveWeaponSize } from '../entities/exposive-weapon-size.enum';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-edit-weapon',
  templateUrl: './edit-weapon.component.html',
  styleUrls: ['./edit-weapon.component.scss']
})
export class EditWeaponComponent implements OnInit {

  /** Pas terrible mais donne acces dans le template */
  WeaponType = WeaponType;

  weaponTypes: any[];
  weaponSizes: any[];
  rules: string[];

  rulesControl = new FormControl();
  rulesFilteredOptions: Observable<string[]>;

  weapon: Weapon;

  constructor(
    private route: ActivatedRoute,
    private weaponService: WeaponService,
    private utils: UtilsService,
    public enumUtils: EnumUtilsService) {
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
    this.rules = this.weaponService.getRules();
    this.rulesFilteredOptions = this.rulesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.rules.filter(option => option.toLowerCase().includes(filterValue));
  }


  getWeapon() {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id == 0) {
      this.weapon = new Weapon();
      this.weapon.editable = true;
    } else {
      this.weapon = this.weaponService.getWeapon(id);
      if (this.weapon == null) {
        this.weapon = new Weapon();
        this.weapon.editable = true;
      }
    }
  }

  saveWeapon(): void {
    if (!this.weapon.nonLethal) {
      this.weapon.nonLethal = null;
    }
    this.weaponService.saveWeapon(this.weapon);
  }

  onChangecurrentWeaponType() {
    if (this.weapon.weaponType == WeaponType.Melee) {
      this.weapon.range = null;
      this.weapon.rangeMin = null;
      this.weapon.assault = null;
      this.weapon.heavy = null;
      this.weapon.cover = null;
    }
    if (this.weapon.weaponType != WeaponType.Explosive) {
      this.weapon.size = null;
    }
    this.weapon.rule = [];
  }

}
