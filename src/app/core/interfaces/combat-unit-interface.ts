import { Dice } from "../enums/dice.enum";
import { Weapon } from "../models/weapon";
import { FactionableInterface } from "./factionable-interface";
export interface CombatUnitInterface extends FactionableInterface {
  /** The name (60 char) */
  name: string;
  /** Combat dice (DC) */
  dc?: Dice;
  /** The list of weapon */
  weapons?: Weapon[];
}
