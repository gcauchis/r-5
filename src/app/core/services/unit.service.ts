import { Injectable } from "@angular/core";
import { Unit } from "./../models/unit";
import { AbstractCrudService } from "./abstract-crud-service";
import { FactionService } from "./faction.service";
import { LocalStorageService } from "./local-storage.service";

const LOCAL_KEY: string = "units";

@Injectable({
  providedIn: "root",
})
export class UnitService extends AbstractCrudService<Unit> {
  constructor(
    localStorage: LocalStorageService,
    private factionService: FactionService
  ) {
    super(localStorage, LOCAL_KEY);
  }

  protected loadBaseData(): Unit[] {
    return [];
  }

  protected convertData(data: any): Unit[] {
    let result: Unit[] = [];
    Object.assign(result, data);
    return result;
  }
  protected get minId(): number {
    return 1000;
  }

  public getRunMove(unit: Unit): number {
    return Math.round(unit.tacticalMove * 1.6);
  }

  public getFactions(): string[] {
    return this.factionService.getFactions(this.storedData);
  }
}
