import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { WeaponService } from "../weapon.service";
import { Weapon } from "../entities/weapon";
import { Unit } from "../entities/unit";
import { WeaponType } from "../entities/weapon-type.enum";
import { UtilsService } from "../utils.service";
import { EnumUtilsService } from "../enum-utils.service";
import { PriceService } from "../price.service";
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: "app-weapon-selector",
  templateUrl: "./weapon-selector.component.html",
  styleUrls: ["./weapon-selector.component.css"]
})
export class WeaponSelectorComponent implements OnInit {
  @Input() unit: Unit;
  @Input() enableEdit: boolean = true;
  @Input() enableAdd: boolean = false;
  currentWeaponType: WeaponType = WeaponType.Melee;

  /** Pas terrible mais donne acces dans le template */
  WeaponType = WeaponType;

  displayedColumns: string[] = [];
  dataSourceWeapons: MatTableDataSource<Weapon>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  nameFilter: string;
  _filter = (data: Weapon, filter: string) => this.nameFilter == null || this.nameFilter.trim() == ""
      ? true : data.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) != -1;

  weaponTypes: any[];

  constructor(
    public weaponService: WeaponService,
    private utils: UtilsService,
    public enumUtils: EnumUtilsService,
    public priceService: PriceService
  ) {
    this.currentWeaponType = WeaponType.Melee;
    this.weaponTypes = this.utils.enumToKeyValue(
      WeaponType,
      enumUtils.weaponTypeToString
    );
  }

  ngOnInit() {
    this.onChangecurrentWeaponType();
    this.updateDisplayedColumns();
  }

  ngAfterViewInit() {
    this.dataSourceWeapons.paginator = this.paginator;
  }

  addWeapon(weapon: Weapon) {
    let weaponToAdd = new Weapon();
    Object.assign(weaponToAdd, weapon);
    weaponToAdd.id = null;
    this.unit.weapons.push(weaponToAdd);
    this.unit.weapons = this.unit.weapons;
  }

  removeWeapon(weapon: Weapon) {
    this.weaponService.remove(weapon);
    this.onChangecurrentWeaponType();
  }

  onChangecurrentWeaponType() {
    this.dataSourceWeapons = new MatTableDataSource<Weapon>(this.weaponService.getWeapons(this.currentWeaponType));
    this.dataSourceWeapons.paginator = this.paginator;
    this.dataSourceWeapons.filterPredicate = this._filter;
    this.nameFilter = "";
    this.updateDisplayedColumns();
  }

  onChangeFilter() {
    this.dataSourceWeapons.filter = this.nameFilter;
  }

  updateDisplayedColumns(): void {
    switch (this.currentWeaponType) {
      case WeaponType.Melee:
        this.displayedColumns = ['type', 'power', 'rules' ];
        break;
      case WeaponType.Shoot:
        this.displayedColumns = ['type', 'range', 'power', 'rules', 'assault', 'heavy', 'cover' ];
        break;
      case WeaponType.Explosive:
      case WeaponType.Grenade:
      default:
        this.displayedColumns = ['type', 'range', 'power', 'rules', 'assault', 'heavy', 'cover', 'size' ];
        break;
    }
    if (this.unit != null) {
      this.displayedColumns.push('price');
      if (this.enableAdd) {
        this.displayedColumns.push('actionAdd');
      }
    } else if (this.enableEdit) {
      this.displayedColumns.push('actionEdit');
    }
  }
}
