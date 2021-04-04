import { Injectable } from "@angular/core";
import { Army } from "../models/army";
import { AbstractCrudService } from "./abstract-crud-service";
import { LocalStorageService } from "./local-storage.service";

const LOCAL_KEY: string = "armies";

@Injectable({
  providedIn: "root",
})
export class ArmyService extends AbstractCrudService<Army> {
  constructor(localStorage: LocalStorageService) {
    super(localStorage, LOCAL_KEY);
  }

  protected loadBaseData(): Army[] {
    return [];
  }

  protected convertData(data: any): Army[] {
    let result: Army[] = [];
    Object.assign(result, data);
    return result;
  }

  protected get minId(): number {
    return 100;
  }

  protected castJsonObject(obj: Army): Army {
    return new Army(obj);
  }
}
