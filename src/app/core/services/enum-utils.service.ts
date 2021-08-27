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

@Injectable({
  providedIn: "root",
})
export class EnumUtilsService {
  constructor(public translate: TranslateService) {}

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

  public async translateEnum(
    value: any,
    keyFunction: (enumValue: any) => string
  ): Promise<string> {
    let key = keyFunction(value);
    if (key == null) return new Promise((resolve) => resolve(null));
    else return this.translate.get(key).toPromise();
  }

  public async unitTypeToString(value: any): Promise<string> {
    return this.translateEnum(value, this.unitTypeToBunbleString);
  }

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

  public async unitSizeToString(value: any): Promise<string> {
    return this.translateEnum(value, this.unitSizeToBunbleString);
  }

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

  public moveTypeToString(value: any): Promise<string> {
    return this.translateEnum(value, this.moveTypeToBunbleString);
  }

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

  public tacticalRoleToString(value: any): Promise<string> {
    return this.translateEnum(value, this.tacticalRoleToBunbleString);
  }

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

  public weaponTypeToString(value: any): Promise<string> {
    return this.translateEnum(value, this.weaponTypeToBunbleString);
  }

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

  public exposiveWeaponSizeToString(value: any): Promise<string> {
    return this.translateEnum(value, this.exposiveWeaponSizeToBunbleString);
  }

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

  public vehicleTypeToString(value: any): Promise<string> {
    return this.translateEnum(value, this.vehicleTypeToBunbleString);
  }

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
