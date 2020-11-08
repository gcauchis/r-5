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
import { ExposiveWeaponSize } from "./entities/exposive-weapon-size.enum";
import { Vehicle } from './entities/vehicle';

const DICE_VALUE: number = 10;

@Injectable()
export class PriceService {
  constructor(private unitService: UnitService) {}

  public computeDQM(dice: Dice): number {
    let result = DICE_VALUE;
    switch (dice) {
      case Dice.D6:
        result *= 3 / 6;
        break;
      case Dice.D8:
        result *= 5 / 8;
        break;
      case Dice.D10:
        result *= 7 / 10;
        break;
      case Dice.D12:
        result *= 9 / 12;
        break;
      default:
        result = 0;
        break;
    }
    return result;
  }

  public computeDC(dice: Dice): number {
    return this.computeDQM(dice) * 1.2;
  }

  public computeBase(unit: Unit): number {
    let dqmPrice = this.computeDQM(unit.dqm);
    let dcPrive = this.computeDC(unit.dc);
    let baseUnit = dqmPrice + dcPrive;
    let pvPrice = baseUnit * unit.pv;
    let movePrice =
      (unit.tacticalMove + this.unitService.getRunMove(unit)) * 10;
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
        if (weapon.rangeMin)
          baseExp -= Math.pow(weapon.rangeMin, 2) * Math.PI;
        let baseSize = 0;
        switch (weapon.size) {
          case ExposiveWeaponSize.Small:
            baseSize = 3.14;//(Math.pow(1, 2) * Math.PI);
            break;
          case ExposiveWeaponSize.Medium:
            baseSize = 13.53;//(Math.pow(2, 2) * Math.PI);
            break;
          case ExposiveWeaponSize.Big:
            baseSize = (Math.pow(3, 2) * Math.PI);
            break;
          case ExposiveWeaponSize.Cone:
            baseSize = 17;
            break;

          default:
            break;
        }
        let baseVp = 0;
        // Se base sur la regle et mon unit
        if (!weapon.nonLethal)
          baseVp = this.computeDC(unit.dc);

        result = baseSize * baseVp * powerCoef + baseExp * unitBase;
        break;
      default:
        break;
    }
    return Math.round(result);
  }

  public compute(item: any): number {
    let price = 0
    if (item instanceof Unit) {
      price = this.computeBase(item);
      for (let weapon of item.weapons) price += this.getPrice(weapon, item);
    }
    return price;
  }
}
