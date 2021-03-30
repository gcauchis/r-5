import { Injectable } from "@angular/core";
import { Vehicle } from "./../models/vehicle";
import { AbstractCrudService } from "./abstract-crud-service";
import { LocalStorageService } from "./local-storage.service";

const LOCAL_KEY: string = "vehicles";

@Injectable({
  providedIn: "root",
})
export class VehicleService extends AbstractCrudService<Vehicle> {
  constructor(localStorage: LocalStorageService) {
    super(localStorage, LOCAL_KEY);
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
}