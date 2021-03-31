import { Injectable } from "@angular/core";
import jsonWeapons from "../../resources/weapons.json";
import { WeaponType } from "./../enums/weapon-type.enum";
import { Weapon } from "./../models/weapon";
import { AbstractCrudService } from "./abstract-crud-service";
import { LocalStorageService } from "./local-storage.service";

const LOCAL_KEY: string = "weapons";

@Injectable({
  providedIn: "root",
})
export class WeaponService extends AbstractCrudService<Weapon> {
  constructor(localStorage: LocalStorageService) {
    super(localStorage, LOCAL_KEY);
  }

  protected loadBaseData(): Weapon[] {
    return this.convertData(jsonWeapons);
  }

  protected convertData(data: any): Weapon[] {
    let result: Weapon[] = [];
    Object.assign(result, data);
    return result;
  }

  protected get minId(): number {
    return 5000;
  }

  public getRules(): string[] {
    return this.storedData
      .reduce((acc, value) => acc.concat(value.rule), [])
      .filter(
        (value, index, self) => value != "" && self.indexOf(value) === index
      )
      .sort();
  }

  public getWeapons(type: WeaponType = null): Weapon[] {
    if (type != null) {
      return this.storedData.filter((w) => w.weaponType == type);
    } else {
      return this.storedData;
    }
  }

  public getWeapon(id: number): Weapon {
    return this.get(id);
  }

  public save(weapon: Weapon): void {
    if (weapon.editable) {
      super.save(weapon);
    }
  }

  public get exportableData(): Weapon[] {
    return this.storedData.filter((w) => w.editable);
  }
}
