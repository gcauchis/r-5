import { Dice } from "../enums/dice.enum";
import { Weapon } from "../models/weapon";
export interface CombatUnitInterface {
  /** Combat dice (DC) */
  dc?: Dice;
  /** The list of weapon */
  weapons?: Weapon[];
}
