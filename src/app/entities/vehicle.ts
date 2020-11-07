import { ImageContainer } from './image-container';
import { Weapon } from './weapon';
import { Dice } from './dice.enum';
import { MoveType } from './move-type.enum';
import { VehicleType } from './vehicle-type.enum';
import { Identitfiable } from './identitfiable';

/** The representation of a vehicle */
export class Vehicle implements Identitfiable, ImageContainer {
  /** The id */
  id?: number;
  /** The name (50 char) */
  name: string;
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
  /** The crew from 1 to 6*/
  crew: number = 1;
  /** For type TroopTransport number of toop in the vehicle. */
  transportSpace?: number;
  /** The vehicle weapons max one by crewmate */
  weapons?:Weapon[];
  /** The image in base64 format for direct insertion in img src. */
  imgBase64?: any;
}
