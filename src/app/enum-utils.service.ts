import { Injectable } from '@angular/core';
import { Dice } from './entities/dice.enum';
import { UnitType } from './entities/unit-type.enum';
import { UnitSize } from './entities/unit-size.enum';
import { MoveType } from './entities/move-type.enum';
import { TacticalRole } from './entities/tactical-role.enum';
import { WeaponType } from './entities/weapon-type.enum';
import { ExposiveWeaponSize } from './entities/exposive-weapon-size.enum';

@Injectable()
export class EnumUtilsService {

  constructor() { }

  public diceToString(value:any) : string {
      switch(value) {
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

  public unitTypeToString(value:any) : string {
      switch(value) {
        case UnitType.Alive:
          return "Vivant";
        case UnitType.Droide:
          return "Droïde";
        case UnitType.Robot:
          return "Robot";
        case UnitType.FightDrone:
          return "FightDrone";
        case UnitType.IA:
          return "IA";
        default:
          return null;
      }
  }

  public unitSizeToString(value:any) : string {
      switch(value) {
        case UnitSize.Small:
          return "Petit";
        case UnitSize.Standard:
          return "Standard";
        case UnitSize.Big:
          return "Grand";
        default:
          return null;
      }
  }

  public moveTypeToString(value:any) : string {
      switch(value) {
        case MoveType.Ground:
          return "Sol";
        case MoveType.Fly:
          return "Vol";
        default:
          return null;
      }
  }

  public tacticalRoleToString(value:any) : string {
      switch(value) {
        case TacticalRole.Troop:
          return "Troupe";
        case TacticalRole.TacticalSupport:
          return "Soutient tactique";
        case TacticalRole.Officer:
          return "Officier supérieur";
        case TacticalRole.Mage:
          return "Mage";
        case TacticalRole.Civilian:
          return "Civile";
        default:
          return null;
      }
  }

  public weaponTypeToString(value:any) : string {
      switch(value) {
        case WeaponType.Melee:
          return "Mélée";
        case WeaponType.Shoot:
          return "Tir";
        case WeaponType.Explosive:
          return "Explosif";
        default:
          return null;
      }
  }

   public exposiveWeaponSizeToString(value:any) : string {
      switch(value) {
        case ExposiveWeaponSize.Small:
          return "Petit";
        case ExposiveWeaponSize.Medium:
          return "Moyen";
        case ExposiveWeaponSize.Big:
          return "Grand";
        case ExposiveWeaponSize.Cone:
          return "Cône";
        default:
          return null;
      }
  }

}