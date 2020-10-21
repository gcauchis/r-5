import { LocalStorageService } from "./local-storage.service";
import { Injectable } from "@angular/core";
import { Weapon } from "./entities/weapon";
import { WeaponType } from "./entities/weapon-type.enum";

import jsonWeapons from "./resources/weapons.json";

@Injectable()
export class WeaponService {
  private weapons: Weapon[] = [];

  constructor(localStorage: LocalStorageService) {
    if (localStorage.isLocalStorageSupported) {
      let tmpWeapons = localStorage.get("weapons");
      if (tmpWeapons == null) {
        console.log("Weapons from base configuration");
        Object.assign(this.weapons, jsonWeapons);
        this.storeWeapons();
      } else {
        console.log("Weapons retrieved");
        this.weapons = tmpWeapons;
      }
    } else {
      console.log("Weapons from base configuration");
      Object.assign(this.weapons, jsonWeapons);
    }
  }

  public getWeapons(type: WeaponType = null): Weapon[] {
    if (type) {
      return this.weapons.filter(w => w.weaponType == type);
    } else {
      return this.weapons;
    }
  }

  private storeWeapons(): void {
    if (localStorage.isLocalStorageSupported) {
      localStorage.set("weapons", this.weapons);
      console.log("Weapons stored");
    }
  }
}
