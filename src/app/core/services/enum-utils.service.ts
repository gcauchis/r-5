import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Dice } from "./../enums/dice.enum";
import { ExposiveWeaponSize } from "./../enums/exposive-weapon-size.enum";
import { MoveType } from "./../enums/move-type.enum";
import { TacticalRole } from "./../enums/tactical-role.enum";
import { UnitSize } from "./../enums/unit-size.enum";
import { UnitType } from "./../enums/unit-type.enum";
import { VehicleType } from "./../enums/vehicle-type.enum";
import { WeaponType } from "./../enums/weapon-type.enum";

/**
 * Utility service for handling and translating game enums.
 */
@Injectable({
  providedIn: "root",
})
export class EnumUtilsService {
  /**
   * Constructor.
   * @param translate The translation service (ngx-translate).
   */
  constructor(public translate: TranslateService) {}

  /**
   * Converts a Dice enum value to its string representation.
   * @param value The Dice enum value.
   * @returns The string representation ("D6", "D8", etc.) or null if not found.
   */
  public diceToString(value: any): string {
    switch (value) {
      case Dice.D6:
        return "D6";
      case Dice.D8:
        return "D8";
      case Dice.D10:
        return "D10";
      case Dice.D12:
        return "D12";
      default:
        return null;
    }
  }

  /**
   * Translates an enum value using a key function.
   * @param value The enum value.
   * @param keyFunction A function that maps the enum value to a translation key.
   * @returns The translated string or null if not found.
   */
  public async translateEnum(
    value: any,
    keyFunction: (enumValue: any) => string
  ): Promise<string> {
    const key = keyFunction(value);
    if (key == null) return Promise.resolve(null);
    else return this.translate.get(key).toPromise();
  }

  /**
   * Converts a value to its string representation using a key function.
   * @param value The value to convert.
   * @param keyFunction A function that maps the value to a string.
   * @returns The string representation or null if not found.
   */
  public async unitTypeToString(value: any): Promise<string> {
    return this.translateEnum(value, this.unitTypeToBunbleString);
  }

  /**
   * Maps a UnitType enum value to its translation key.
   * @param value The UnitType enum value.
   * @returns The translation key or null if not found.
   */
  public unitTypeToBunbleString(value: any): string {
    switch (value) {
      case UnitType.Alive:
        return "Label.Alive";
      case UnitType.Droid:
        return "Label.Droid";
      case UnitType.Robot:
        return "Label.Robot";
      case UnitType.FightDrone:
        return "Label.FightDrone";
      case UnitType.AI:
        return "Label.AI";
      default:
        return null;
    }
  }

  /**
   * Converts a UnitSize enum value to its string representation.
   * @param value The UnitSize enum value.
   * @returns The string representation ("Small", "Standard", "Big") or null if not found.
   */
  public async unitSizeToString(value: any): Promise<string> {
    return this.translateEnum(value, this.unitSizeToBunbleString);
  }

  /**
   * Maps a UnitSize enum value to its translation key.
   * @param value The UnitSize enum value.
   * @returns The translation key or null if not found.
   */
  public unitSizeToBunbleString(value: any): string {
    switch (value) {
      case UnitSize.Small:
        return "Label.Small";
      case UnitSize.Standard:
        return "Label.Standard";
      case UnitSize.Big:
        return "Label.Big";
      default:
        return null;
    }
  }

  /**
   * Converts a MoveType enum value to its string representation.
   * @param value The MoveType enum value.
   * @returns The string representation ("Ground", "Fly") or null if not found.
   */
  public moveTypeToString(value: any): Promise<string> {
    return this.translateEnum(value, this.moveTypeToBunbleString);
  }

  /**
   * Maps a MoveType enum value to its translation key.
   * @param value The MoveType enum value.
   * @returns The translation key or null if not found.
   */
  public moveTypeToBunbleString(value: any): string {
    switch (value) {
      case MoveType.Ground:
        return "Label.Ground";
      case MoveType.Fly:
        return "Label.Fly";
      default:
        return null;
    }
  }

  /**
   * Converts a TacticalRole enum value to its string representation.
   * @param value The TacticalRole enum value.
   * @returns The string representation ("Troop", "TacticalSupport", etc.) or null if not found.
   */
  public tacticalRoleToString(value: any): Promise<string> {
    return this.translateEnum(value, this.tacticalRoleToBunbleString);
  }

  /**
   * Maps a TacticalRole enum value to its translation key.
   * @param value The TacticalRole enum value.
   * @returns The translation key or null if not found.
   */
  public tacticalRoleToBunbleString(value: any): string {
    switch (value) {
      case TacticalRole.Troop:
        return "Label.Troop";
      case TacticalRole.TacticalSupport:
        return "Label.TacticalSupport";
      case TacticalRole.Officer:
        return "Label.Officer";
      case TacticalRole.Mage:
        return "Label.Mage";
      case TacticalRole.Civilian:
        return "Label.Civilian";
      default:
        return null;
    }
  }

  /**
   * Converts a WeaponType enum value to its string representation.
   * @param value The WeaponType enum value.
   * @returns The string representation ("Melee", "Shoot", etc.) or null if not found.
   */
  public weaponTypeToString(value: any): Promise<string> {
    return this.translateEnum(value, this.weaponTypeToBunbleString);
  }

  /**
   * Maps a WeaponType enum value to its translation key.
   * @param value The WeaponType enum value.
   * @returns The translation key or null if not found.
   */
  public weaponTypeToBunbleString(value: any): string {
    switch (value) {
      case WeaponType.Melee:
        return "Label.Melee";
      case WeaponType.Shoot:
        return "Label.Shoot";
      case WeaponType.Explosive:
        return "Label.Explosive";
      case WeaponType.Grenade:
        return "Label.Grenade";
      default:
        return null;
    }
  }

  /**
   * Converts an ExposiveWeaponSize enum value to its string representation.
   * @param value The ExposiveWeaponSize enum value.
   * @returns The string representation ("Small", "Medium", "Big", "Cone") or null if not found.
   */
  public exposiveWeaponSizeToString(value: any): Promise<string> {
    return this.translateEnum(value, this.exposiveWeaponSizeToBunbleString);
  }

  /**
   * Maps an ExposiveWeaponSize enum value to its translation key.
   * @param value The ExposiveWeaponSize enum value.
   * @returns The translation key or null if not found.
   */
  public exposiveWeaponSizeToBunbleString(value: any): string {
    switch (value) {
      case ExposiveWeaponSize.Small:
        return "Label.Small";
      case ExposiveWeaponSize.Medium:
        return "Label.Medium";
      case ExposiveWeaponSize.Big:
        return "Label.Big";
      case ExposiveWeaponSize.Cone:
        return "Label.Cone";
      default:
        return null;
    }
  }

  /**
   * Converts a VehicleType enum value to its string representation.
   * @param value The VehicleType enum value.
   * @returns The string representation ("TroopTransport", "Tank", "Individual") or null if not found.
   */
  public vehicleTypeToString(value: any): Promise<string> {
    return this.translateEnum(value, this.vehicleTypeToBunbleString);
  }

  /**
   * Maps a VehicleType enum value to its translation key.
   * @param value The VehicleType enum value.
   * @returns The translation key or null if not found.
   */
  public vehicleTypeToBunbleString(value: any): string {
    switch (value) {
      case VehicleType.TroopTransport:
        return "Label.TroopTransport";
      case VehicleType.Tank:
        return "Label.Tank";
      case VehicleType.Individual:
        return "Label.Individual";
      default:
        return null;
    }
  }
}
