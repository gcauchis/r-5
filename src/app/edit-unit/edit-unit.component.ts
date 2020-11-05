import { Weapon } from './../entities/weapon';
import { Unit } from './../entities/unit';
import { UnitService } from './../unit.service';
import { Component, OnInit, Output } from "@angular/core";
import { UtilsService } from "../utils.service";
import { Dice } from "../entities/dice.enum";
import { UnitType } from "../entities/unit-type.enum";
import { UnitSize } from "../entities/unit-size.enum";
import { MoveType } from "../entities/move-type.enum";
import { TacticalRole } from "../entities/tactical-role.enum";
import { EnumUtilsService } from "../enum-utils.service";
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { FormControl, Validators } from '@angular/forms';
import { MaxSizeValidator } from '@angular-material-components/file-input';
import { WeaponType } from '../entities/weapon-type.enum';

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

  accept: string = "image/*";

  displayedWeaponColumns: string[] = [ 'weapon', 'remove' ];

  fileControl: FormControl;
  
  maxSize= 16 * 1024;
  imgPath: string;

  constructor(
              private route: ActivatedRoute,
              private utils: UtilsService,
              public enumUtils:EnumUtilsService,
              private unitService: UnitService,
              private location: Location) {
    
    this.dices = this.utils.enumToKeyValue(Dice, enumUtils.diceToString);
    this.unitTypes = this.utils.enumToKeyValue(UnitType,  enumUtils.unitTypeToString);
    this.unitSizes = this.utils.enumToKeyValue(UnitSize,  enumUtils.unitSizeToString);
    this.moveTypes = this.utils.enumToKeyValue(MoveType,  enumUtils.moveTypeToString);
    this.tacticalRoles = this.utils.enumToKeyValue(TacticalRole,enumUtils.tacticalRoleToString);
    
    this.fileControl = new FormControl(this.imgPath, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024)
    ])
  }

  ngOnInit() {
    this.getUnit();
    
    this.fileControl.valueChanges.subscribe((file: any) => {
      this.imgPath = file;
      let fileReader: FileReader = new FileReader();
      let self = this;
      fileReader.onloadend = function (x) {
        let blob = new Blob([fileReader.result], {type: file.type});
        var readerBlob = new FileReader();
        readerBlob.readAsDataURL(blob); 
        readerBlob.onloadend = function() {
            self.unit.imgBase64 = readerBlob.result;
        }
      }
      fileReader.readAsArrayBuffer(file);
    })
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
    this.unit.weapons = this.unit.weapons.filter(r => r != weapon);
  }

  saveUnit(): void {
    this.unitService.save(this.unit);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

}
