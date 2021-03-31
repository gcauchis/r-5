export class ArmyLink {
  /** The linked id */
  id: number;
  /** Number of linked items */
  count: number;

  constructor(param?: Partial<ArmyLink>) {
    if (param) {
      Object.assign(this, param);
    }
  }
}
