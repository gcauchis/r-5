import { IdentitfiableInterface } from "../interfaces/identitfiable-interface";
import { ImageContainerInterface } from "../interfaces/image-container-interface";
import { Dice } from "./../enums/dice.enum";
import { MoveType } from "./../enums/move-type.enum";
import { VehicleType } from "./../enums/vehicle-type.enum";
import { FactionableInterface } from "./../interfaces/factionable-interface";
import { PriceableInterface } from "./../interfaces/priceable-interface";
import { Weapon } from "./weapon";

/** The representation of a vehicle */
export class Vehicle
  implements
    IdentitfiableInterface,
    ImageContainerInterface,
    PriceableInterface,
    FactionableInterface {
  /** The id */
  id?: number;
  /** The name (50 char) */
  name: string;
  /** The faction (500 char) */
  faction?: string;
  /** The tyep */
  type: VehicleType;
  /** The type of move. */
  moveType: MoveType = MoveType.Ground;
  /** The tactical move in inch from 0 to 100 */
  tacticalMove: number = 0;
  /** The struucture point from 1 to 10 */
  structure: number;
  /** The armor (blindage) */
  armor: Dice;
  /** Combat dice (DC) */
  dc: Dice = Dice.D6;
  /** The crew from 1 to 6*/
  crew: number = 1;
  /** For type TroopTransport number of toop in the vehicle. */
  transportSpace?: number;
  /** The vehicle weapons max one by crewmate */
  weapons?: Weapon[] = [];
  /** The image in base64 format for direct insertion in img src. */
  imgBase64?: any;
}
