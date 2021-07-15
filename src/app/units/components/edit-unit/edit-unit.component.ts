import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Dice } from "./../../../core/enums/dice.enum";
import { MoveType } from "./../../../core/enums/move-type.enum";
import { TacticalRole } from "./../../../core/enums/tactical-role.enum";
import { UnitSize } from "./../../../core/enums/unit-size.enum";
import { UnitType } from "./../../../core/enums/unit-type.enum";
import { Unit } from "./../../../core/models/unit";
import { Weapon } from "./../../../core/models/weapon";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";
import { UnitService } from "./../../../core/services/unit.service";
import { UtilsService } from "./../../../core/services/utils.service";
import { DialogRulesSelectorComponent } from "./../../../weapons/components/dialog-rules-selector/dialog-rules-selector.component";

@Component({
  selector: "app-edit-unit",
  templateUrl: "./edit-unit.component.html",
  styleUrls: ["./edit-unit.component.css"],
})
export class EditUnitComponent implements OnInit {
  @Input() unit: Unit;
  @Output() submited: EventEmitter<Unit> = new EventEmitter<Unit>();
  @Output() canceled: EventEmitter<any> = new EventEmitter<any>();
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
    private utils: UtilsService,
    public enumUtils: EnumUtilsService,
    private unitService: UnitService,
    public dialog: MatDialog
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

  ngOnInit(): void {
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

  addWeapon(weapon: Weapon) {
    if (weapon.rule && weapon.rule.length > 0) {
      const dialogRef = this.dialog.open(DialogRulesSelectorComponent, {
        data: {
          title: `Choisisez les règles pour ${weapon.name}`,
          rules: weapon.rule,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          weapon.rule = result;
          this.unit.weapons.push(weapon);
        }
      });
    } else {
      this.unit.weapons.push(weapon);
    }
  }

  submit(): void {
    this.submited.emit(this.unit);
  }

  cancel(): void {
    this.canceled.emit();
  }
}
