import { Dice } from "./dice.enum";
import { UnitType } from "./unit-type.enum";
import { UnitSize } from "./unit-size.enum";
import { MoveType } from "./move-type.enum";
import { TacticalRole } from "./tactical-role.enum";
import { Weapon } from "./weapon";

/** The representation of a figurine. */
export class Unit {
  /** The id */
  id: number;
  /** The name (60 char) */
  name: string;
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

}