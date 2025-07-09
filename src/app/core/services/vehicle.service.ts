import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Vehicle } from "./../models/vehicle";
import { AbstractCrudService } from "./abstract-crud-service";
import { FactionService } from "./faction.service";
import { LocalStorageService } from "./local-storage.service";

const LOCAL_KEY: string = "vehicles";

/**
 * Service for managing vehicles.
 * Provides CRUD operations, faction extraction, and utility methods for Vehicle objects.
 * Extends AbstractCrudService to inherit common collection management logic.
 */
@Injectable({
  providedIn: "root",
})
export class VehicleService extends AbstractCrudService<Vehicle> {
  /**
   * BehaviorSubject holding the list of unique factions for all vehicles.
   */
  private factions$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  /**
   * Creates an instance of VehicleService.
   * @param localStorage The local storage service used for persistence.
   * @param factionService The service used to extract factions from vehicles.
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
   * Converts imported data to an array of Vehicle objects.
   * @param data The data to convert.
   * @returns The converted array of Vehicle objects.
   */
  protected convertData(data: any): Vehicle[] {
    let result: Vehicle[] = [];
    Object.assign(result, data);
    return result;
  }

  /**
   * Loads the base data for vehicles.
   * @returns An empty array (no base data by default).
   */
  protected loadBaseData(): Vehicle[] {
    return [];
  }

  /**
   * Gets the minimum allowed ID for a Vehicle.
   * @returns The minimum ID (100).
   */
  protected get minId(): number {
    return 100;
  }

  /**
   * Calculates the run move value for a vehicle.
   * @param vehicle The vehicle to calculate for.
   * @returns The run move value (rounded).
   */
  public getRunMove(vehicle: Vehicle): number {
    return Math.round(vehicle.tacticalMove * 1.6);
  }

  /**
   * Gets the observable list of unique factions for all vehicles.
   * @returns A Subject emitting the list of factions.
   */
  public get factions(): Subject<string[]> {
    return this.factions$;
  }

  /**
   * Casts a JSON object to a Vehicle instance.
   * @param obj The object to cast.
   * @returns The cast Vehicle object.
   */
  protected castJsonObject(obj: Vehicle): Vehicle {
    return new Vehicle(obj);
  }
}
