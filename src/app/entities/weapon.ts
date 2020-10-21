import { WeaponType } from "./weapon-type.enum";
import { ExposiveWeaponSize } from "./exposive-weapon-size.enum";

export class Weapon {
  id?: number;
  /** the type of weapon */
  weaponType: WeaponType = WeaponType.Melee;
  /** The editable status */
  editable?: boolean = false;
  /** The weapon name */
  name: string;
  /** The number of dice */
  power?: number = 1;
  /** The power++ */
  superPower?: boolean = false;
  /** The power++[++ */
  superSuperPower?: boolean = false;
  /** The special rules of the weapon */
  rule: string[] = [];
  /** The minimum range in inch. */
  rangeMin?: number = 0;
  /** The range in inch. */
  range?: number = 0;
  /** Assault weapon */
  assault?: boolean = false;
  /** Heavy weapon */
  heavy?: boolean = false;
  /** Cover weapon */
  cover?: boolean = false;
  /** The gabarit for explosive only */
  size?: ExposiveWeaponSize = null;
  /** If non lethal weapon */
  nonLethal?:boolean;
}
