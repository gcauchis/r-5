import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Unit } from "./../models/unit";
import { AbstractCrudService } from "./abstract-crud-service";
import { FactionService } from "./faction.service";
import { LocalStorageService } from "./local-storage.service";

const LOCAL_KEY: string = "units";

/**
 * Service for managing units.
 * Provides CRUD operations, faction extraction, and utility methods for Unit objects.
 * Extends AbstractCrudService to inherit common collection management logic.
 */
@Injectable({
  providedIn: "root",
})
export class UnitService extends AbstractCrudService<Unit> {
  /**
   * BehaviorSubject holding the list of unique factions for all units.
   */
  private factions$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  /**
   * Creates an instance of UnitService.
   * @param localStorage The local storage service used for persistence.
   * @param factionService The service used to extract factions from units.
   */
  constructor(
    localStorage: LocalStorageService,
    private factionService: FactionService
  ) {
    super(localStorage, LOCAL_KEY);

    this.collection.subscribe((res) =>
      this.factions$.next(this.factionService.getFactions(res))
    );
  }

  /**
   * Loads the base data for units.
   * @returns An empty array (no base data by default).
   */
  protected loadBaseData(): Unit[] {
    return [];
  }

  /**
   * Converts imported data to an array of Unit objects.
   * @param data The data to convert.
   * @returns The converted array of Unit objects.
   */
  protected convertData(data: any): Unit[] {
    let result: Unit[] = [];
    Object.assign(result, data);
    return result;
  }

  /**
   * Gets the minimum allowed ID for a Unit.
   * @returns The minimum ID (1000).
   */
  protected get minId(): number {
    return 1000;
  }

  /**
   * Calculates the run move value for a unit.
   * @param unit The unit to calculate for.
   * @returns The run move value (rounded).
   */
  public getRunMove(unit: Unit): number {
    return Math.round(unit.tacticalMove * 1.6);
  }

  /**
   * Gets the observable list of unique factions for all units.
   * @returns A Subject emitting the list of factions.
   */
  public get factions(): Subject<string[]> {
    return this.factions$;
  }

  /**
   * Casts a JSON object to a Unit instance.
   * @param obj The object to cast.
   * @returns The cast Unit object.
   */
  protected castJsonObject(obj: Unit): Unit {
    return new Unit(obj);
  }
}
