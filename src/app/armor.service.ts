import { Injectable } from "@angular/core";
import { Armor } from "./entities/armor";

import jsonArmors from "./resources/armors.json";

@Injectable()
export class ArmorService {
  private armors: Armor[] = [];

  constructor() {
    Object.assign(this.armors, jsonArmors);
  }

  public getArmors(): Armor[] {
    return this.armors;
  }
}
