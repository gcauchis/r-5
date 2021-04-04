import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Vehicle } from "./../models/vehicle";
import { AbstractCrudService } from "./abstract-crud-service";
import { FactionService } from "./faction.service";
import { LocalStorageService } from "./local-storage.service";

const LOCAL_KEY: string = "vehicles";

@Injectable({
  providedIn: "root",
})
export class VehicleService extends AbstractCrudService<Vehicle> {
  private factions$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    []
  );

  constructor(
    localStorage: LocalStorageService,
    private factionService: FactionService
  ) {
    super(localStorage, LOCAL_KEY);
    this.collection.subscribe((res) =>
      this.factions$.next(this.factionService.getFactions(res))
    );
  }

  protected convertData(data: any): Vehicle[] {
    let result: Vehicle[] = [];
    Object.assign(result, data);
    return result;
  }

  protected loadBaseData(): Vehicle[] {
    return [];
  }

  protected get minId(): number {
    return 100;
  }

  public getRunMove(vehicle: Vehicle): number {
    return Math.round(vehicle.tacticalMove * 1.6);
  }

  public get factions(): Subject<string[]> {
    return this.factions$;
  }
}
