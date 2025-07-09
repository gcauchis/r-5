import { Injectable } from "@angular/core";
import jsonArmors from "../../resources/armors.json";
import { Armor } from "../models/armor";
import { AbstractCrudService } from "./abstract-crud-service";
import { LocalStorageService } from "./local-storage.service";

const LOCAL_KEY: string = "armors";

/**
 * Service for managing armor data.
 * Extends AbstractCrudService to provide CRUD operations on armor items.
 */
@Injectable({
  providedIn: "root",
})
export class ArmorService extends AbstractCrudService<Armor> {
  /**
   * Constructor.
   * @param localStorage The local storage service for data persistence.
   */
  constructor(localStorage: LocalStorageService) {
    super(localStorage, LOCAL_KEY);
  }

  /**
   * Loads base data from the JSON file.
   * @returns An array of Armor objects.
   */
  protected loadBaseData(): Armor[] {
    return this.convertData(jsonArmors);
  }

  /**
   * Converts raw data into an array of Armor objects.
   * @param data The raw data to convert.
   * @returns An array of Armor objects.
   */
  protected convertData(data: any): Armor[] {
    let result: Armor[] = [];
    Object.assign(result, data);
    return result;
  }

  /**
   * Returns the minimum ID for armor items.
   * @returns The minimum ID (100).
   */
  protected get minId(): number {
    return 100;
  }

  /**
   * Casts a JSON object to an Armor instance.
   * @param obj The JSON object to cast.
   * @returns An Armor instance.
   */
  protected castJsonObject(obj: Armor): Armor {
    return new Armor(obj);
  }
}
