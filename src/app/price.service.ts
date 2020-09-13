import { Injectable } from "@angular/core";
import { Weapon } from "./entities/weapon";
import { Unit } from "./entities/unit";
import { Dice } from "./entities/dice.enum";
import { WeaponType } from "./entities/weapon-type.enum";
import { UnitSize } from "./entities/unit-size.enum";
import { UnitType } from "./entities/unit-type.enum";
import { TacticalRole } from "./entities/tactical-role.enum";
import { MoveType } from "./entities/move-type.enum";
import { UnitService } from "./unit.service";

const DICE_VALUE: number = 10;

@Injectable()
export class PriceService {
  constructor(private unitService:UnitService) {}

  public computeDQM(dice: Dice): number {
    let result = DICE_VALUE;
    switch (dice) {
      case Dice.D6:
        result *= 3;
        break;
      case Dice.D8:
        result *= 5;
        break;
      case Dice.D10:
        result *= 7;
        break;
      case Dice.D12:
        result *= 9;
        break;
      default:
        result = 0;
        break;
    }
    return result;
  }

  public computeDC(dice: Dice): number {
    return this.computeDQM(dice) * 1.8;
  }

  public computeBase(unit: Unit): number {
    let dqmPrice = this.computeDQM(unit.dqm);
    let dcPrive = this.computeDC(unit.dc);
    let baseUnit = dqmPrice + dcPrive;
    let pvPrice = baseUnit * unit.pv;
    let movePrice = (unit.tacticalMove + this.unitService.getRunMove(unit)) * 10;
    let result = pvPrice + movePrice;
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
    return result;
  }

  public getPrice(weapon: Weapon, unit: Unit): number {
    let unitBase = this.computeBase(unit);
    let result = 0;
    let powerCoef = weapon.power;
    if (weapon.superPower)
      powerCoef *= 2;
    
    switch (weapon.weaponType) {
      case WeaponType.Melee:
        result = (unitBase * powerCoef) / 10;
        break;
      case WeaponType.Shoot:
        let baseShoot = 0;
        // TODO options
        if (weapon.assault)
          baseShoot += 10;
        if (weapon.heavy)
          baseShoot += 10;
        if (weapon.cover)
          baseShoot += 10;
        baseShoot += Math.pow(weapon.range, 2) * Math.PI;
        result = (baseShoot * unitBase) / 1000;
        break;
      case WeaponType.Explosive:
        let baseExp = 0;
        // TODO options
        if (weapon.assault)
          baseExp += 10;
        if (weapon.heavy)
          baseExp += 10;
        if (weapon.cover)
          baseExp += 10;
        baseExp += Math.pow(weapon.range, 2) * Math.PI;
        if (weapon.rangeMin)
          baseExp -= Math.pow(weapon.rangeMin, 2) * Math.PI;
        
        result = (baseExp * unitBase) / 1000;
        break;
      default:
        break;
    }
    return Math.round(result);
  }

  public compute(unit: Unit): number {
    let price = this.computeBase(unit);
    for (let weapon of unit.weapons)
      price += this.getPrice(weapon, unit);
    return price;
  }
}
