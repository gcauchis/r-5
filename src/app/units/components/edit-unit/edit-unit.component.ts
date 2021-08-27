import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Dice } from "./../../../core/enums/dice.enum";
import { MoveType } from "./../../../core/enums/move-type.enum";
import { TacticalRole } from "./../../../core/enums/tactical-role.enum";
import { UnitSize } from "./../../../core/enums/unit-size.enum";
import { UnitType } from "./../../../core/enums/unit-type.enum";
import { Unit } from "./../../../core/models/unit";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";
import { UnitService } from "./../../../core/services/unit.service";
import { UtilsService } from "./../../../core/services/utils.service";

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
  unitTypes: Promise<any[]>;
  unitSizes: Promise<any[]>;
  moveTypes: Promise<any[]>;
  tacticalRoles: Promise<any[]>;
  /** Pas terrible mais donne acces dans le template */
  TacticalRole = TacticalRole;

  factions: string[];
  factionsControl = new FormControl();
  factionsFilteredOptions: Observable<string[]>;

  public form: FormGroup;

  constructor(
    private utils: UtilsService,
    private enumUtils: EnumUtilsService,
    private unitService: UnitService,
    private fb: FormBuilder,
    public translate: TranslateService
  ) {
    this.dices = this.utils.enumToKeyValue(Dice, enumUtils.diceToString);
    this.unitTypes = this.utils.enumToKeyValueTranslate(
      this.translate,
      UnitType,
      this.enumUtils.unitTypeToBunbleString
    );
    this.unitSizes = this.utils.enumToKeyValueTranslate(
      this.translate,
      UnitSize,
      this.enumUtils.unitSizeToBunbleString
    );
    this.moveTypes = this.utils.enumToKeyValueTranslate(
      this.translate,
      MoveType,
      this.enumUtils.moveTypeToBunbleString
    );
    this.tacticalRoles = this.utils.enumToKeyValueTranslate(
      this.translate,
      TacticalRole,
      this.enumUtils.tacticalRoleToBunbleString
    );
  }

  ngOnInit(): void {
    this.unitService.factions.subscribe((res) => (this.factions = res));
    this.factionsFilteredOptions = this.factionsControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterFaction(value))
    );

    this.form = this.fb.group({
      id: [this.unit.id],
      name: [this.unit.name, [Validators.required, Validators.minLength(2)]],
      faction: [this.unit.faction],
      desc: [this.unit.desc],
      dqm: [this.unit.dqm],
      dc: [this.unit.dc],
      pv: [this.unit.pv],
      unitType: [this.unit.unitType],
      size: [this.unit.size],
      moveType: [this.unit.moveType],
      tacticalMove: [this.unit.tacticalMove],
      tacticalRole: [this.unit.tacticalRole],
      mageLevel: [this.unit.mageLevel],
      weapons: [this.unit.weapons],
      armor: [this.unit.armor],
      imgBase64: [this.unit.imgBase64],
    });
  }

  private _filterFaction(value: string): string[] {
    const filterFaction = value.toLowerCase();
    return this.factions.filter((faction) =>
      faction.toLowerCase().includes(filterFaction)
    );
  }

  onChangeTacticalRole() {
    if (this.form.controls.tacticalRole.value == TacticalRole.Civilian) {
      this.form.controls.dqm.setValue(Dice.D6);
      this.form.controls.dc.setValue(Dice.D6);
    }
    if (this.form.controls.tacticalRole.value == TacticalRole.Mage) {
      this.form.controls.mageLevel.setValue(1);
    } else {
      this.form.controls.mageLevel.setValue(0);
    }
  }

  submit(): void {
    this.submited.emit(new Unit(this.form.value));
  }

  cancel(): void {
    this.canceled.emit();
  }
}
