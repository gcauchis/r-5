import { Injectable } from "@angular/core";
import { Unit } from "./../models/unit";
import { AbstractCrudService } from "./abstract-crud-service";
import { LocalStorageService } from "./local-storage.service";

const LOCAL_KEY: string = "units";

@Injectable()
export class UnitService extends AbstractCrudService<Unit> {
  constructor(localStorage: LocalStorageService) {
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
    return this.storedData
      .map((u) => u.faction)
      .filter(
        (value, index, self) =>
          value && value != "" && self.indexOf(value) === index
      )
      .sort();
  }
}
