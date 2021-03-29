import { Location } from "@angular/common";
import { Component, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Dice } from "../../enums/dice.enum";
import { MoveType } from "./../../enums/move-type.enum";
import { TacticalRole } from "./../../enums/tactical-role.enum";
import { UnitSize } from "./../../enums/unit-size.enum";
import { UnitType } from "./../../enums/unit-type.enum";
import { Unit } from "./../../models/unit";
import { Weapon } from "./../../models/weapon";
import { EnumUtilsService } from "./../../services/enum-utils.service";
import { UnitService } from "./../../services/unit.service";
import { UtilsService } from "./../../services/utils.service";

@Component({
  selector: "app-edit-unit",
  templateUrl: "./edit-unit.component.html",
  styleUrls: ["./edit-unit.component.scss"],
})
export class EditUnitComponent implements OnInit {
  @Output() unit: Unit;
  dices: any[];
  unitTypes: any[];
  unitSizes: any[];
  moveTypes: any[];
  tacticalRoles: any[];
  /** Pas terrible mais donne acces dans le template */
  TacticalRole = TacticalRole;

  factions: string[];
  factionsControl = new FormControl();
  factionsFilteredOptions: Observable<string[]>;

  displayedWeaponColumns: string[] = ["weapon", "remove"];

  constructor(
    private route: ActivatedRoute,
    private utils: UtilsService,
    public enumUtils: EnumUtilsService,
    private unitService: UnitService,
    private location: Location
  ) {
    this.dices = this.utils.enumToKeyValue(Dice, enumUtils.diceToString);
    this.unitTypes = this.utils.enumToKeyValue(
      UnitType,
      enumUtils.unitTypeToString
    );
    this.unitSizes = this.utils.enumToKeyValue(
      UnitSize,
      enumUtils.unitSizeToString
    );
    this.moveTypes = this.utils.enumToKeyValue(
      MoveType,
      enumUtils.moveTypeToString
    );
    this.tacticalRoles = this.utils.enumToKeyValue(
      TacticalRole,
      enumUtils.tacticalRoleToString
    );
  }

  ngOnInit() {
    this.getUnit();
    this.factions = this.unitService.getFactions();
    this.factionsFilteredOptions = this.factionsControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterFaction(value))
    );
  }

  private _filterFaction(value: string): string[] {
    const filterFaction = value.toLowerCase();
    return this.factions.filter((faction) =>
      faction.toLowerCase().includes(filterFaction)
    );
  }

  getUnit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id == 0) {
      this.unit = this.buildBaseUnit();
    } else {
      this.unit = this.unitService.get(id);
      if (this.unit == null) {
        this.unit = this.buildBaseUnit();
      }
    }
  }

  private buildBaseUnit(): Unit {
    let unit = new Unit();
    unit.dqm = Dice.D8;
    unit.dc = Dice.D8;
    return unit;
  }

  onChangeTacticalRole() {
    if (this.unit.tacticalRole == TacticalRole.Civilian) {
      this.unit.dqm = Dice.D6;
      this.unit.dc = Dice.D6;
    }
    if (this.unit.tacticalRole == TacticalRole.Mage) {
      this.unit.mageLevel = 1;
    } else {
      this.unit.mageLevel = 0;
    }
  }

  removeWeapon(weapon: Weapon): void {
    this.unit.weapons = this.unit.weapons.filter((r) => r != weapon);
  }

  saveUnit(): void {
    this.unitService.save(this.unit);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
