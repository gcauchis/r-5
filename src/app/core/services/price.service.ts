import { Injectable } from "@angular/core";
import jsonWeaponsRulesValues from "../../resources/weapons-rules-values.json";
import { CombatUnitInterface } from "../interfaces/combat-unit-interface";
import { Dice } from "./../enums/dice.enum";
import { ExposiveWeaponSize } from "./../enums/exposive-weapon-size.enum";
import { MoveType } from "./../enums/move-type.enum";
import { TacticalRole } from "./../enums/tactical-role.enum";
import { UnitSize } from "./../enums/unit-size.enum";
import { UnitType } from "./../enums/unit-type.enum";
import { WeaponType } from "./../enums/weapon-type.enum";
import { Unit } from "./../models/unit";
import { Weapon } from "./../models/weapon";
import { UnitService } from "./unit.service";

const DICE_VALUE: number = 4;
const DICE_D6_VALUE: number = DICE_VALUE * (3 / 6);
const DICE_D8_VALUE: number = DICE_VALUE * (5 / 8);
const DICE_D10_VALUE: number = DICE_VALUE * (7 / 10);
const DICE_D12_VALUE: number = DICE_VALUE * (9 / 12);

const POWER_DICE_COEF: number = 1;
const POWER_SUPER_DICE_COEF: number = 1.2;

const ASSAULT_VALUE: number = 2;
const HEAVY_VALUE: number = 1;
const COVER_VALUE: number = 2;

const SIZE_SMALL: number = 3;
const SIZE_MEDIUM: number = 13;
const SIZE_BIG: number = 28;
const SIZE_CONE: number = 17;

const WEAPONS_RULES_VALUES = jsonWeaponsRulesValues;

@Injectable({
  providedIn: "root",
})
export class PriceService {
  constructor(private unitService: UnitService) {}

  public computeDice(dice: Dice): number {
    switch (dice) {
      case Dice.D6:
        return DICE_D6_VALUE;
      case Dice.D8:
        return DICE_D8_VALUE;
      case Dice.D10:
        return DICE_D10_VALUE;
      case Dice.D12:
        return DICE_D12_VALUE;
      default:
        return DICE_VALUE;
    }
  }

  public computeDQM(dice: Dice): number {
    return this.computeDice(dice);
  }

  public computeDC(dice: Dice): number {
    return this.computeDice(dice);
  }

  public computeBase(combatUnit: CombatUnitInterface): number {
    let dcPrive = this.computeDC(combatUnit.dc);
    let result = 0;
    //console.log(combatUnit);
    if (combatUnit instanceof Unit) {
      let unit = new Unit(combatUnit);

      let dqmPrice = this.computeDQM(unit.dqm);
      let baseUnit = dqmPrice + dcPrive;
      let pvPrice = baseUnit * unit.pv;
      let movePrice = (baseUnit + this.unitService.getRunMove(unit)) * 10;
      result = pvPrice + movePrice;
      switch (unit.size) {
        case UnitSize.Small:
          result += pvPrice / 10;
          break;
        case UnitSize.Big:
          result += pvPrice / 10;
          break;
        default:
          break;
      }
      switch (unit.tacticalRole) {
        case TacticalRole.Officer:
          result += baseUnit * 0.1;
          break;
        default:
          break;
      }
      switch (unit.unitType) {
        case UnitType.Droide:
          result += dcPrive;
          break;
        default:
          break;
      }
      switch (unit.moveType) {
        case MoveType.Fly:
          result += dcPrive;
          break;
        default:
          break;
      }
    }
    return result;
  }

  public getPrice(weapon: Weapon, combatUnit: CombatUnitInterface): number {
    let unitBase = this.computeBase(combatUnit);
    let result = 0;
    let powerCoef = weapon.power;
    if (weapon.superPower) powerCoef *= 2;

    switch (weapon.weaponType) {
      case WeaponType.Melee:
        result = unitBase * powerCoef * (Math.pow(1.5, 2) * Math.PI);
        break;
      case WeaponType.Shoot:
        result = unitBase * powerCoef * (Math.pow(weapon.range, 2) * Math.PI);
        break;
      case WeaponType.Explosive:
        let baseExp = Math.pow(weapon.range, 2) * Math.PI;
        if (weapon.rangeMin) baseExp -= Math.pow(weapon.rangeMin, 2) * Math.PI;
        let baseSize = 0;
        switch (weapon.size) {
          case ExposiveWeaponSize.Small:
            baseSize = 3.14; //(Math.pow(1, 2) * Math.PI);
            break;
          case ExposiveWeaponSize.Medium:
            baseSize = 13.53; //(Math.pow(2, 2) * Math.PI);
            break;
          case ExposiveWeaponSize.Big:
            baseSize = Math.pow(3, 2) * Math.PI;
            break;
          case ExposiveWeaponSize.Cone:
            baseSize = 17;
            break;

          default:
            break;
        }
        let baseVp = 0;
        // Se base sur la regle et mon unit
        if (!weapon.nonLethal) baseVp = this.computeDC(combatUnit.dc);

        result = baseSize * baseVp * powerCoef + baseExp * unitBase;
        break;
      default:
        break;
    }
    return Math.round(result);
  }

  public compute(item: CombatUnitInterface): number {
    let price = this.computeBase(item);
    if (item.weapons) {
      for (let weapon of item.weapons) {
        price += this.getPrice(weapon, item);
      }
    }
    return price;
  }
}
