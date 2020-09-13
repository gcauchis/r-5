import { Injectable } from "@angular/core";
import { Weapon } from "./entities/weapon";
import { WeaponType } from "./entities/weapon-type.enum";
import { Unit } from "./entities/unit";

import jsonWeapons from './resources/weapons.json'; 

@Injectable()
export class WeaponService {

  private weapons: Weapon[] = [];

  constructor() {
    Object.assign(this.weapons, jsonWeapons);
  }

  public getWeapons(type: WeaponType = null): Weapon[] {
    if (type) {
      return this.weapons.filter(w => w.weaponType == type);
    } else {
      return this.weapons;
    }
  }
}
