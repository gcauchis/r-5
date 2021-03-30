import { IdentitfiableInterface } from "../interfaces/identitfiable-interface";
export class Armor implements IdentitfiableInterface {
  /** The id */
  id?: number;
  /** The armor name */
  name: string;
  /** The protection of the armor on D6 */
  protection: string;
  /** The special rule of the armor */
  rule: string = "";
}
