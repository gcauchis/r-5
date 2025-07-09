import { Injectable } from "@angular/core";
import jsonWeaponsRulesValues from "../../resources/weapons-rules-values.json";
import { CombatUnitInterface } from "../interfaces/combat-unit-interface";
import { Army } from "../models/army";
import { Vehicle } from "../models/vehicle";
import { Dice } from "./../enums/dice.enum";
import { ExposiveWeaponSize } from "./../enums/exposive-weapon-size.enum";
import { MoveType } from "./../enums/move-type.enum";
import { TacticalRole } from "./../enums/tactical-role.enum";
import { UnitSize } from "./../enums/unit-size.enum";
import { UnitType } from "./../enums/unit-type.enum";
import { WeaponType } from "./../enums/weapon-type.enum";
import { RuleValue } from "./../interfaces/rule-value";
import { Unit } from "./../models/unit";
import { Weapon } from "./../models/weapon";
import { UnitService } from "./unit.service";
import { VehicleService } from "./vehicle.service";

/**
 * The base value used for dice calculations.
 * @constant
 */
const DICE_VALUE: number = 4;

/**
 * The value for a D6 dice.
 * @constant
 */
const DICE_D6_VALUE: number = DICE_VALUE * (3 / 6);

/**
 * The value for a D8 dice.
 * @constant
 */
const DICE_D8_VALUE: number = DICE_VALUE * (5 / 8);

/**
 * The value for a D10 dice.
 * @constant
 */
const DICE_D10_VALUE: number = DICE_VALUE * (7 / 10);

/**
 * The value for a D12 dice.
 * @constant
 */
const DICE_D12_VALUE: number = DICE_VALUE * (9 / 12);

/**
 * Coefficient for power dice.
 * @constant
 */
const POWER_DICE_COEF: number = 1;

/**
 * Coefficient for super power dice.
 * @constant
 */
const POWER_SUPER_DICE_COEF: number = 1.2;

/**
 * Value added for assault weapons.
 * @constant
 */
const ASSAULT_VALUE: number = 2;

/**
 * Value added for heavy weapons.
 * @constant
 */
const HEAVY_VALUE: number = 1;

/**
 * Value added for cover weapons.
 * @constant
 */
const COVER_VALUE: number = 2;

/**
 * Value for small explosive weapon size.
 * @constant
 */
const SIZE_SMALL: number = 3;

/**
 * Value for medium explosive weapon size.
 * @constant
 */
const SIZE_MEDIUM: number = 13;

/**
 * Value for big explosive weapon size.
 * @constant
 */
const SIZE_BIG: number = 28;

/**
 * Value for cone explosive weapon size.
 * @constant
 */
const SIZE_CONE: number = 17;

/**
 * Array of rule values for weapons loaded from JSON.
 * @constant
 */
const WEAPONS_RULES_VALUES: RuleValue[] = jsonWeaponsRulesValues;

/**
 * Service for calculating prices of units, vehicles, and weapons.
 * Provides methods to compute prices based on stats, dice, and special rules.
 */
@Injectable({
  providedIn: "root",
})
export class PriceService {
  /**
   * Creates an instance of PriceService.
   * @param unitService Service for retrieving units.
   * @param vehicleService Service for retrieving vehicles.
   */
  constructor(
    private unitService: UnitService,
    private vehicleService: VehicleService
  ) {}

  /**
   * Computes the numeric value of a dice.
   * @param dice The dice enum value.
   * @returns The computed value for the dice.
   */
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

  /**
   * Computes the DQM (Quality Dice) value.
   * @param dice The dice enum value.
   * @returns The computed DQM value.
   */
  public computeDQM(dice: Dice): number {
    return this.computeDice(dice);
  }

  /**
   * Computes the DC (Defense Dice) value.
   * @param dice The dice enum value.
   * @returns The computed DC value.
   */
  public computeDC(dice: Dice): number {
    return this.computeDice(dice);
  }

  /**
   * Computes the base price of a combat unit (unit or vehicle).
   * @param combatUnit The combat unit to compute.
   * @returns The base price.
   */
  public computeBase(combatUnit: CombatUnitInterface): number {
    let dcPrive = this.computeDC(combatUnit.dc);
    let result = 0;
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
        case UnitType.Droid:
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
    } else if (combatUnit instanceof Vehicle) {
      result = 42;
    }

    return result;
  }

  /**
   * Calculates the price of a weapon for a given combat unit.
   * @param weapon The weapon to price.
   * @param combatUnit The owning combat unit.
   * @returns The computed price for the weapon.
   */
  public getPrice(weapon: Weapon, combatUnit: CombatUnitInterface): number {
    let unitBase = this.computeBase(combatUnit);
    let result = 0;
    let powerCoef = weapon.power;
    if (weapon.superPower) powerCoef *= POWER_DICE_COEF;
    if (weapon.superSuperPower) powerCoef *= POWER_SUPER_DICE_COEF;
    if (weapon.assault) unitBase += ASSAULT_VALUE;
    if (weapon.heavy) unitBase += HEAVY_VALUE;
    if (weapon.cover) unitBase += COVER_VALUE;

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
            baseSize = SIZE_SMALL;
            break;
          case ExposiveWeaponSize.Medium:
            baseSize = SIZE_MEDIUM;
            break;
          case ExposiveWeaponSize.Big:
            baseSize = SIZE_BIG;
            break;
          case ExposiveWeaponSize.Cone:
            baseSize = SIZE_CONE;
            break;

          default:
            break;
        }
        let baseVp = 0;
        // Se base sur la regle et mon unit
        if (!weapon.nonLethal) baseVp += this.computeDC(combatUnit.dc);

        for (let rule of weapon.rule) {
          let val = WEAPONS_RULES_VALUES.filter((v) => v.rule == rule);
          if (val.length > 0) baseVp += val.pop().value;
        }

        result = baseSize * baseVp * powerCoef + baseExp * unitBase;
        break;
      default:
        break;
    }
    return Math.round(result);
  }

  /**
   * Computes the total price of a combat unit, including its weapons.
   * @param item The combat unit.
   * @returns The total computed price.
   */
  public compute(item: CombatUnitInterface): number {
    let price = this.computeBase(item);
    if (item.weapons) {
      for (let weapon of item.weapons) {
        price += this.getPrice(weapon, item);
      }
    }
    return price;
  }

  /**
   * Computes the total price of an army, including all units and vehicles.
   * @param army The army to compute.
   * @returns A promise resolving to the total price of the army.
   */
  public async computeArmy(army: Army): Promise<number> {
    let result = 0;
    if (army.units) {
      for (let unitlink of army.units) {
        result +=
          unitlink.count *
          this.compute(await this.unitService.get(unitlink.id).toPromise());
      }
    }
    if (army.vehicles) {
      for (let vehiclelink of army.vehicles) {
        result +=
          vehiclelink.count *
          this.compute(
            await this.vehicleService.get(vehiclelink.id).toPromise()
          );
      }
    }
    return result;
  }
}
