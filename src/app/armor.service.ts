import { LocalStorageService } from "./local-storage.service";
import { Injectable } from "@angular/core";
import { Armor } from "./entities/armor";

import jsonArmors from "./resources/armors.json";

@Injectable()
export class ArmorService {
  private armors: Armor[] = [];

  constructor(localStorage: LocalStorageService) {
    if (localStorage.isLocalStorageSupported) {
      let tmpArmors = localStorage.get("armors");
      if (tmpArmors == null) {
        console.log("Armors from base configuration");
        Object.assign(this.armors, jsonArmors);
        this.storeWeapons();
      } else {
        console.log("Armors retrieved");
        this.armors = tmpArmors;
      }
    } else {
      console.log("Armors from base configuration");
      Object.assign(this.armors, jsonArmors);
    }
  }

  public getArmors(): Armor[] {
    return this.armors;
  }

  private storeWeapons(): void {
    if (localStorage.isLocalStorageSupported) {
      localStorage.set("armors", this.armors);
      console.log("Armors stored");
    }
  }
}
