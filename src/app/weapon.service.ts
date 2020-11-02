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

  public getRules(): string[] {
    return this.weapons.flatMap(w => w.rule).filter((value, index, self) => self.indexOf(value) === index).sort();
  }

  public getWeapons(type: WeaponType = null): Weapon[] {
    if (type != null) {
      return this.weapons.filter(w => w.weaponType == type);
    } else {
      return this.weapons;
    }
  }

  public getWeapon(id: number): Weapon {
    if (id != null) {
      return this.weapons.find(w => w.id == id);
    } else {
      return null;
    }
  }

  public saveWeapon(weapon: Weapon): void {
    if (weapon.editable) {
      if (weapon.id) {
        let found: Weapon = this.getWeapon(weapon.id);
        if (found) {
          Object.assign(found, weapon);
        } else {
          this.weapons.push(weapon);
        }
      } else {
        weapon.id = this.genId();
        this.weapons.push(weapon);
      }
      this.storeWeapons();
   }
  }

  private genId(): number {
    return this.weapons.length > 0 ? Math.max(...this.weapons.map(w => w.id)) + 1 : 5000;
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
