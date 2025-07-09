import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import jsonWeapons from "../../resources/weapons.json";
import { WeaponType } from "./../enums/weapon-type.enum";
import { Weapon } from "./../models/weapon";
import { AbstractCrudService } from "./abstract-crud-service";
import { LocalStorageService } from "./local-storage.service";

const LOCAL_KEY: string = "weapons";

/**
 * Service for managing weapons.
 * Provides CRUD operations, rule extraction, and utility methods for Weapon objects.
 * Extends AbstractCrudService to inherit common collection management logic.
 */
@Injectable({
  providedIn: "root",
})
export class WeaponService extends AbstractCrudService<Weapon> {
  /**
   * BehaviorSubject holding the list of unique rules for all weapons.
   */
  private rules$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  /**
   * Creates an instance of WeaponService.
   * @param localStorage The local storage service used for persistence.
   * @param translate The translation service.
   */
  constructor(
    localStorage: LocalStorageService,
    public translate: TranslateService
  ) {
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

  /**
   * Loads the base data for weapons from JSON.
   * @returns The array of Weapon objects.
   */
  protected loadBaseData(): Weapon[] {
    return this.convertData(jsonWeapons);
  }

  /**
   * Converts imported data to an array of Weapon objects.
   * @param data The data to convert.
   * @returns The converted array of Weapon objects.
   */
  protected convertData(data: any): Weapon[] {
    let result: Weapon[] = [];
    Object.assign(result, data);
    return result;
  }

  /**
   * Gets the minimum allowed ID for a Weapon.
   * @returns The minimum ID (5000).
   */
  protected get minId(): number {
    return 5000;
  }

  /**
   * Gets the observable list of unique rules for all weapons.
   * @returns A Subject emitting the list of rules.
   */
  public get rules(): Subject<string[]> {
    return this.rules$;
  }

  /**
   * Retrieves weapons filtered by type.
   * @param type The weapon type to filter by (optional).
   * @returns An observable emitting the filtered list of weapons.
   */
  public getWeapons(type: WeaponType = null): Observable<Weapon[]> {
    if (type != null) {
      return this.collection.pipe(
        map((res) => res.filter((w) => w.weaponType == type))
      );
    } else {
      return this.collection.asObservable();
    }
  }

  /**
   * Saves a weapon if it is editable.
   * @param weapon The weapon to save.
   */
  public save(weapon: Weapon): void {
    if (weapon.editable) {
      super.save(weapon);
    }
  }

  /**
   * Gets the exportable data (editable weapons only).
   * @returns The array of exportable Weapon objects.
   */
  public get exportableData(): Weapon[] {
    return this.storedData.filter((w) => w.editable);
  }

  /**
   * Casts a JSON object to a Weapon instance.
   * @param obj The object to cast.
   * @returns The cast Weapon object.
   */
  protected castJsonObject(obj: Weapon): Weapon {
    return new Weapon(obj);
  }

  /**
   * Retrieves the translated rules for a weapon.
   * @param weapon The weapon to retrieve rules for.
   * @returns A promise resolving to an array of translated rule strings.
   */
  public async retrieveRules(weapon: Weapon): Promise<string[]> {
    let rules = [];
    if (weapon) {
      if (weapon.assault)
        rules.push(await this.translate.get("Label.Assault").toPromise());
      if (weapon.heavy)
        rules.push(await this.translate.get("Label.Heavy").toPromise());
      if (weapon.cover)
        rules.push(await this.translate.get("Label.Cover").toPromise());
      if (weapon.nonLethal)
        rules.push(await this.translate.get("Label.NonLethal").toPromise());
      if (weapon.rule) weapon.rule.forEach((rule) => rules.push(rule));
    }
    if (rules.length <= 0) rules = null;
    return Promise.resolve(rules);
  }
}
