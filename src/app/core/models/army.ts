import { IdentitfiableInterface } from "../interfaces/identitfiable-interface";
import { ArmyLink } from "./army-link";
export class Army implements IdentitfiableInterface {
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

  constructor(param?: Partial<Army>) {
    if (param) {
      Object.assign(this, param);
    }
  }
}
