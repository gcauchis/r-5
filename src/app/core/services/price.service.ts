import { Injectable } from "@angular/core";
import { PriceableInterface } from "../interfaces/priceable-interface";
import { Dice } from "./../enums/dice.enum";
import { ExposiveWeaponSize } from "./../enums/exposive-weapon-size.enum";
import { MoveType } from "./../enums/move-type.enum";
import { TacticalRole } from "./../enums/tactical-role.enum";
import { UnitSize } from "./../enums/unit-size.enum";
import { UnitType } from "./../enums/unit-type.enum";
import { WeaponType } from "./../enums/weapon-type.enum";
import { Unit } from "./../models/unit";
import { Vehicle } from "./../models/vehicle";
import { Weapon } from "./../models/weapon";
import { UnitService } from "./unit.service";

const DICE_VALUE: number = 10;

@Injectable({
  providedIn: "root",
})
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

  public computeBase(priceable: PriceableInterface): number {
    let dcPrive = this.computeDC(priceable.dc);
    let result = 0;
    if (priceable instanceof Unit) {
      let unit = new Unit(priceable);

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

  public getPrice(weapon: Weapon, priceable: PriceableInterface): number {
    let unitBase = this.computeBase(priceable);
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
        if (!weapon.nonLethal) baseVp = this.computeDC(priceable.dc);

        result = baseSize * baseVp * powerCoef + baseExp * unitBase;
        break;
      default:
        break;
    }
    return Math.round(result);
  }

  public compute(item: any): number {
    let price = 0;
    if (item instanceof Unit) {
      price = this.computeBase(item);
      for (let weapon of item.weapons) price += this.getPrice(weapon, item);
    } else if (item instanceof Vehicle) {
      // TODO
    }
    return price;
  }
}
