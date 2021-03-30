import { Identitfiable } from "../interfaces/identitfiable";
import { ArmyLink } from "./army-link";
export class Army implements Identitfiable {
  /** The id */
  id?: number;
  /** The name (60 char) */
  name: string;
  /** The description (500 char) */
  desc: string;
  /** The units */
  units: ArmyLink[] = [];
  /** The vehicles */
  vehicles: ArmyLink[] = [];
}
