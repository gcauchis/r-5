import { LocalStorageService } from './local-storage.service';
import { Injectable } from "@angular/core";
import { Weapon } from "./entities/weapon";
import { WeaponType } from "./entities/weapon-type.enum";

import jsonWeapons from './resources/weapons.json';

@Injectable()
export class WeaponService {

  private weapons: Weapon[] = [];

  constructor(localStorage: LocalStorageService) {
    if (localStorage.isLocalStorageSupported) {
      let tmpWeapon = localStorage.get("weapons");
      if (tmpWeapon == null) {
        console.log("Weapons from base configuration");
        Object.assign(this.weapons, jsonWeapons);
        localStorage.set("weapons", this.weapons);
        console.log("Weapons stored");
      } else {
        console.log("Weapons retrieved")
        this.weapons = tmpWeapon;
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
}
