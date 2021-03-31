import { CombatUnitInterface } from "../interfaces/combat-unit-interface";
import { IdentitfiableInterface } from "../interfaces/identitfiable-interface";
import { ImageContainerInterface } from "../interfaces/image-container-interface";
import { Dice } from "./../enums/dice.enum";
import { MoveType } from "./../enums/move-type.enum";
import { TacticalRole } from "./../enums/tactical-role.enum";
import { UnitSize } from "./../enums/unit-size.enum";
import { UnitType } from "./../enums/unit-type.enum";
import { FactionableInterface } from "./../interfaces/factionable-interface";
import { Armor } from "./armor";
import { Weapon } from "./weapon";

/** The representation of a figurine. */
export class Unit
  implements
    IdentitfiableInterface,
    ImageContainerInterface,
    CombatUnitInterface,
    FactionableInterface {
  /** The id */
  id?: number;
  /** The name (60 char) */
  name: string;
  /** The faction (500 char) */
  faction?: string;
  /** The description (500 char) */
  desc: string;
  /** Dice Martial quality (DQM) */
  dqm: Dice = Dice.D6;
  /** Combat dice (DC) */
  dc: Dice = Dice.D6;
  /** Life point (PV) 1 to 5 */
  pv: number = 1;
  /** Type of unit */
  unitType: UnitType = UnitType.Alive;
  /** The size */
  size: UnitSize = UnitSize.Standard;
  /** The type of move. */
  moveType: MoveType = MoveType.Ground;
  /** The tactical move in inch for 0 to 100 */
  tacticalMove: number = 0;
  /** The tactical role */
  tacticalRole: TacticalRole = TacticalRole.Troop;
  /** The mage level if TacticalRole is TacticalRole.Mage */
  mageLevel: number = 0;
  /** The list of weapon */
  weapons: Weapon[] = [];
  /** The unit armor */
  armor: Armor;
  /** The image in base64 format for direct insertion in img src. */
  imgBase64?: any;
  constructor(param?: Partial<Unit>) {
    if (param) {
      Object.assign(this, param);
    }
  }
}
