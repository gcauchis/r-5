import { Injectable } from "@angular/core";
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

  public unitTypeToString(value: any): string {
    switch (value) {
      case UnitType.Alive:
        return $localize`:@@Label.Alive:Alive`;
      case UnitType.Droid:
        return $localize`:@@Label.Droid:Droid`;
      case UnitType.Robot:
        return $localize`:@@Label.Robot:Robot`;
      case UnitType.FightDrone:
        return $localize`:@@Label.FightDrone:Fight drone`;
      case UnitType.AI:
        return $localize`:@@Label.AI:AI`;
      default:
        return null;
    }
  }

  public unitSizeToString(value: any): string {
    switch (value) {
      case UnitSize.Small:
        return $localize`:@@Label.Small:Small`;
      case UnitSize.Standard:
        return $localize`:@@Label.Standard:Standard`;
      case UnitSize.Big:
        return $localize`:@@Label.Big:Big`;
      default:
        return null;
    }
  }

  public moveTypeToString(value: any): string {
    switch (value) {
      case MoveType.Ground:
        return $localize`:@@Label.Ground:Ground`;
      case MoveType.Fly:
        return $localize`:@@Label.Fly:Fly`;
      default:
        return null;
    }
  }

  public tacticalRoleToString(value: any): string {
    switch (value) {
      case TacticalRole.Troop:
        return $localize`:@@Label.Troop:Troop`;
      case TacticalRole.TacticalSupport:
        return $localize`:@@Label.TacticalSupport:Tactical support`;
      case TacticalRole.Officer:
        return $localize`:@@Label.Officer:Officer`;
      case TacticalRole.Mage:
        return $localize`:@@Label.Mage:Mage`;
      case TacticalRole.Civilian:
        return $localize`:@@Label.Civilian:Civilian`;
      default:
        return null;
    }
  }

  public weaponTypeToString(value: any): string {
    switch (value) {
      case WeaponType.Melee:
        return $localize`:@@Label.Melee:Melee`;
      case WeaponType.Shoot:
        return $localize`:@@Label.Shoot:Shoot`;
      case WeaponType.Explosive:
        return $localize`:@@Label.Explosive:Explosive`;
      case WeaponType.Grenade:
        return $localize`:@@Label.Grenade:Grenade`;
      default:
        return null;
    }
  }

  public exposiveWeaponSizeToString(value: any): string {
    switch (value) {
      case ExposiveWeaponSize.Small:
        return $localize`:@@Label.Small:Small`;
      case ExposiveWeaponSize.Medium:
        return $localize`:@@Label.Medium:Medium`;
      case ExposiveWeaponSize.Big:
        return $localize`:@@Label.Big:Big`;
      case ExposiveWeaponSize.Cone:
        return $localize`:@@Label.Cone:Cone`;
      default:
        return null;
    }
  }

  public vehicleTypeToString(value: any): string {
    switch (value) {
      case VehicleType.TroopTransport:
        return $localize`:@@Label.TroopTransport:Troop transport`;
      case VehicleType.Tank:
        return $localize`:@@Label.Tank:Tank`;
      case VehicleType.Individual:
        return $localize`:@@Label.Individual:Individual`;
      default:
        return null;
    }
  }
}
