import { LocalStorageService } from "./local-storage.service";
import { Injectable } from "@angular/core";
import { Armor } from "./entities/armor";

import jsonArmors from "./resources/armors.json";

const LOCAL_KEY: string = "armors";

@Injectable()
export class ArmorService {
  private armors: Armor[] = [];

  constructor(localStorage: LocalStorageService) {
    if (localStorage.isLocalStorageSupported) {
      let tmpArmors = localStorage.get(LOCAL_KEY);
      if (tmpArmors == null) {
        console.log(
          "Armors not found localy, retrieve from base configuration"
        );
        Object.assign(this.armors, jsonArmors);
        this.storeArmors();
      } else {
        console.log("Armors retrieved");
        this.armors = tmpArmors;
      }
    } else {
      console.log("Armors from base configuration (no local persistance)");
      Object.assign(this.armors, jsonArmors);
    }
  }

  public getArmors(): Armor[] {
    return this.armors;
  }

  private storeArmors(): void {
    if (localStorage.isLocalStorageSupported) {
      localStorage.set(LOCAL_KEY, this.armors);
      console.log("Armors stored");
    }
  }

  private resetArmors(): void {
    if (localStorage.isLocalStorageSupported) {
      console.log("Reset Armors");
      localStorage.remove(LOCAL_KEY);
      console.log("Armors from base configuration");
      Object.assign(this.armors, jsonArmors);
      this.storeArmors();
    }
  }
}
