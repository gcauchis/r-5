import { Component, OnInit, Output } from "@angular/core";
import { Unit } from "../entities/unit";
import { UtilsService } from "../utils.service";
import { Dice } from "../entities/dice.enum";
import { UnitType } from "../entities/unit-type.enum";
import { UnitSize } from "../entities/unit-size.enum";
import { MoveType } from "../entities/move-type.enum";
import { TacticalRole } from "../entities/tactical-role.enum";
import { EnumUtilsService } from "../enum-utils.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-edit-unit",
  templateUrl: "./edit-unit.component.html",
  styleUrls: ["./edit-unit.component.scss"]
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

  constructor(
              private route: ActivatedRoute,
              private utils: UtilsService,
              public enumUtils:EnumUtilsService) {
    
    this.dices = this.utils.enumToKeyValue(Dice, enumUtils.diceToString);
    this.unitTypes = this.utils.enumToKeyValue(UnitType,  enumUtils.unitTypeToString);
    this.unitSizes = this.utils.enumToKeyValue(UnitSize,  enumUtils.unitSizeToString);
    this.moveTypes = this.utils.enumToKeyValue(MoveType,  enumUtils.moveTypeToString);
    this.tacticalRoles = this.utils.enumToKeyValue(TacticalRole,enumUtils.tacticalRoleToString);
  }

  ngOnInit() {
    this.getUnit();
  }

  getUnit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    //if (id == 0) {
      this.unit = this.buildBaseUnit();
    /*} else {
      this.unitService.getUnit(id).subscribe(unit => (this.unit = unit));
    }*/
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

  logUnit(){
    console.log(JSON.stringify(this.unit));
  }

}
