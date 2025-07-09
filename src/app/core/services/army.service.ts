import { Injectable } from "@angular/core";
import { Army } from "../models/army";
import { AbstractCrudService } from "./abstract-crud-service";
import { LocalStorageService } from "./local-storage.service";

const LOCAL_KEY: string = "armies";

/**
 * Service for managing army data.
 * Provides CRUD operations and local storage support for Army objects.
 * Extends AbstractCrudService to inherit common collection management logic.
 */
@Injectable({
  providedIn: "root",
})
export class ArmyService extends AbstractCrudService<Army> {
  /**
   * Creates an instance of ArmyService.
   * @param localStorage The local storage service used for persistence.
   */
  constructor(localStorage: LocalStorageService) {
    super(localStorage, LOCAL_KEY);
  }

  /**
   * Loads the base data for armies.
   * @returns An empty array (no base data by default).
   */
  protected loadBaseData(): Army[] {
    return [];
  }

  /**
   * Converts imported data to an array of Army objects.
   * @param data The data to convert.
   * @returns The converted array of Army objects.
   */
  protected convertData(data: any): Army[] {
    let result: Army[] = [];
    Object.assign(result, data);
    return result;
  }

  /**
   * Gets the minimum allowed ID for an Army.
   * @returns The minimum ID (100).
   */
  protected get minId(): number {
    return 100;
  }

  /**
   * Casts a JSON object to an Army instance.
   * @param obj The object to cast.
   * @returns The cast Army object.
   */
  protected castJsonObject(obj: Army): Army {
    return new Army(obj);
  }
}
