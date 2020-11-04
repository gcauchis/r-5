import { Identitfiable } from './identitfiable';
export class Armor extends Identitfiable {
  /** The armor name */
  name: string;
  /** The protection of the armor on D6 */
  protection: string;
  /** The special rule of the armor */
  rule: string = "";
}