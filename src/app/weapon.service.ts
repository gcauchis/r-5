import { LocalStorageService } from "./local-storage.service";
import { Injectable } from "@angular/core";
import { Weapon } from "./entities/weapon";
import { WeaponType } from "./entities/weapon-type.enum";

import jsonWeapons from "./resources/weapons.json";
import { AbstractCrudService } from './abstract-crud-service';

const LOCAL_KEY: string = "weapons";

@Injectable()
export class WeaponService extends AbstractCrudService<Weapon>{

  constructor(localStorage: LocalStorageService) {
    super(localStorage, LOCAL_KEY);
  }
  
  protected loadBaseData(): Weapon[] {
    let result: Weapon[] = [];
    Object.assign(result, jsonWeapons);
    return result;
  }

  protected get minId(): number {
    return 5000;
  }

  public getRules(): string[] {
    return this.storedData.flatMap(w => w.rule)
              .filter((value, index, self) => value != "" && self.indexOf(value) === index)
              .sort();
  }

  public getWeapons(type: WeaponType = null): Weapon[] {
    if (type != null) {
      return this.storedData.filter(w => w.weaponType == type);
    } else {
      return this.storedData;
    }
  }

  public getWeapon(id: number): Weapon {
      return this.get(id);
  }

  public save(weapon: Weapon): void {
    if (weapon.editable) {
      super.save(weapon)
   }
  }
}
