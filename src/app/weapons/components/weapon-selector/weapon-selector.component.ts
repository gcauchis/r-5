import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { TranslateService } from "@ngx-translate/core";
import { CombatUnitInterface } from "../../../core/interfaces/combat-unit-interface";
import { WeaponType } from "./../../../core/enums/weapon-type.enum";
import { Weapon } from "./../../../core/models/weapon";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";
import { UtilsService } from "./../../../core/services/utils.service";
import { WeaponService } from "./../../../core/services/weapon.service";

@Component({
  selector: "app-weapon-selector",
  templateUrl: "./weapon-selector.component.html",
  styleUrls: ["./weapon-selector.component.css"],
})
export class WeaponSelectorComponent implements OnInit {
  @Output() askAddWeapon = new EventEmitter<Weapon>();
  @Input() priceable!: CombatUnitInterface;
  @Input() enableEdit: boolean = true;
  @Input() enableAdd: boolean = false;
  currentWeaponType: WeaponType;

  /** Pas terrible mais donne acces dans le template */
  WeaponType = WeaponType;

  displayedColumns: string[] = [];
  dataSourceWeapons: MatTableDataSource<Weapon>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  nameFilter: string;
  _filter = (data: Weapon, filter: string) =>
    this.nameFilter == null || this.nameFilter.trim() == ""
      ? true
      : data.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) != -1;

  weaponTypes: Promise<any[]>;

  constructor(
    private weaponService: WeaponService,
    private utils: UtilsService,
    private enumUtils: EnumUtilsService,
    public translate: TranslateService
  ) {
    this.currentWeaponType = WeaponType.Melee;
    this.weaponTypes = this.utils.enumToKeyValueTranslate(
      this.translate,
      WeaponType,
      this.enumUtils.weaponTypeToBunbleString
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
    this.askAddWeapon.emit(weaponToAdd);
  }

  removeWeapon(weapon: Weapon) {
    this.weaponService.remove(weapon);
    this.onChangecurrentWeaponType();
  }

  onChangecurrentWeaponType() {
    this.weaponService.getWeapons(this.currentWeaponType).subscribe((res) => {
      this.dataSourceWeapons = new MatTableDataSource<Weapon>(res);
      this.dataSourceWeapons.paginator = this.paginator;
      this.dataSourceWeapons.filterPredicate = this._filter;
      this.nameFilter = "";
      this.updateDisplayedColumns();
    });
  }

  onChangeFilter() {
    this.dataSourceWeapons.filter = this.nameFilter;
  }

  updateDisplayedColumns(): void {
    switch (this.currentWeaponType) {
      case WeaponType.Melee:
        this.displayedColumns = ["type", "power", "rules"];
        break;
      case WeaponType.Shoot:
        this.displayedColumns = ["type", "range", "power", "rules"];
        break;
      case WeaponType.Explosive:
      case WeaponType.Grenade:
      default:
        this.displayedColumns = ["type", "range", "power", "rules", "size"];
        break;
    }
    if (this.priceable != null) {
      // Not realy dynamic for now
      // this.displayedColumns.push("price");
      if (this.enableAdd) {
        this.displayedColumns.push("actionAdd");
      }
    } else if (this.enableEdit) {
      this.displayedColumns.push("actionEdit");
    }
  }
}
