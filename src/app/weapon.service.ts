import { LocalStorageService } from "./local-storage.service";
import { Injectable } from "@angular/core";
import { Weapon } from "./entities/weapon";
import { WeaponType } from "./entities/weapon-type.enum";

import jsonWeapons from "./resources/weapons.json";

const LOCAL_KEY: string = "weapons";

@Injectable()
export class WeaponService {
  private weapons: Weapon[] = [];

  constructor(localStorage: LocalStorageService) {
    if (localStorage.isLocalStorageSupported) {
      let tmpWeapons = localStorage.get(LOCAL_KEY);
      if (tmpWeapons == null) {
        console.log(
          "Weapons not found localy, retrieve from base configuration"
        );
        Object.assign(this.weapons, jsonWeapons);
        this.storeWeapons();
      } else {
        console.log("Weapons retrieved");
        this.weapons = tmpWeapons;
      }
    } else {
      console.log("Weapons from base configuration (no local persistance)");
      Object.assign(this.weapons, jsonWeapons);
    }
    console.log(this.weapons);
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
      localStorage.set(LOCAL_KEY, this.weapons);
      console.log("Weapons stored");
    }
  }

  private resetWeapons(): void {
    if (localStorage.isLocalStorageSupported) {
      console.log("Reset Weapons");
      localStorage.remove(LOCAL_KEY);
      console.log("Weapons from base configuration");
      Object.assign(this.weapons, jsonWeapons);
      this.storeWeapons();
    }
  }
}
