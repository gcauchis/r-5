import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
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
  private rules$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor(localStorage: LocalStorageService) {
    super(localStorage, LOCAL_KEY);
    this.collection.subscribe((weapons) =>
      this.rules$.next(
        weapons
          .reduce((acc, value) => acc.concat(value.rule), [])
          .filter(
            (value, index, self) => value != "" && self.indexOf(value) === index
          )
          .sort()
      )
    );
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

  public get rules(): Subject<string[]> {
    return this.rules$;
  }

  public getWeapons(type: WeaponType = null): Observable<Weapon[]> {
    if (type != null) {
      return this.collection.pipe(
        map((res) => res.filter((w) => w.weaponType == type))
      );
    } else {
      return this.collection.asObservable();
    }
  }

  public save(weapon: Weapon): void {
    if (weapon.editable) {
      super.save(weapon);
    }
  }

  public get exportableData(): Weapon[] {
    return this.storedData.filter((w) => w.editable);
  }

  protected castJsonObject(obj: Weapon): Weapon {
    return new Weapon(obj);
  }

  public retrieveRules(weapon: Weapon): string[] {
    let rules = [];
    if (weapon) {
      if (weapon.assault) rules.push("Assaut");
      if (weapon.heavy) rules.push("Lourd");
      if (weapon.cover) rules.push("Couverture");
      if (weapon.nonLethal) rules.push("Non mortelle");
      if (weapon.rule) weapon.rule.forEach((rule) => rules.push(rule));
    }
    if (rules.length <= 0) rules = null;
    return rules;
  }
}
