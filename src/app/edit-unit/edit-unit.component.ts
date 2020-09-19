import { Component, OnInit, Output } from "@angular/core";
import { Unit } from "../entities/unit";
import { UtilsService } from "../utils.service";
import { Dice } from "../entities/dice.enum";
import { UnitType } from "../entities/unit-type.enum";
import { UnitSize } from "../entities/unit-size.enum";
import { MoveType } from "../entities/move-type.enum";
import { TacticalRole } from "../entities/tactical-role.enum";
import { EnumUtilsService } from "../enum-utils.service";

@Component({
  selector: "app-edit-unit",
  templateUrl: "./edit-unit.component.html",
  styleUrls: ["./edit-unit.component.css"]
})
export class EditUnitComponent implements OnInit {
  @Output() unit: Unit;
  dices;
  unitTypes;
  unitSizes;
  moveTypes;
  tacticalRoles;
  /** Pas terrible mais donne acces dans le template */
  TacticalRole = TacticalRole;

  constructor(private utils: UtilsService,
              public enumUtils:EnumUtilsService) {
    this.unit = new Unit();
    this.unit.dqm = Dice.D8;
    this.unit.dc = Dice.D8;
    
    this.dices = this.utils.enumToKeyValue(Dice, enumUtils.diceToString);
    this.unitTypes = this.utils.enumToKeyValue(UnitType,  enumUtils.unitTypeToString);
    this.unitSizes = this.utils.enumToKeyValue(UnitSize,  enumUtils.unitSizeToString);
    this.moveTypes = this.utils.enumToKeyValue(MoveType,  enumUtils.moveTypeToString);
    this.tacticalRoles = this.utils.enumToKeyValue(TacticalRole,enumUtils.tacticalRoleToString);
  }

  ngOnInit() {}

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
