import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { Unit } from "./../models/unit";
import { AbstractCrudService } from "./abstract-crud-service";
import { FactionService } from "./faction.service";
import { LocalStorageService } from "./local-storage.service";

const LOCAL_KEY: string = "units";

@Injectable({
  providedIn: "root",
})
export class UnitService extends AbstractCrudService<Unit> {
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

  public get factions(): Subject<string[]> {
    return this.factions$;
  }

  protected castJsonObject(obj: Unit): Unit {
    return new Unit(obj);
  }
}
