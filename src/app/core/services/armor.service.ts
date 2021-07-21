import { Injectable } from "@angular/core";
import jsonArmors from "../../resources/armors.json";
import { Armor } from "../models/armor";
import { AbstractCrudService } from "./abstract-crud-service";
import { LocalStorageService } from "./local-storage.service";

const LOCAL_KEY: string = "armors";

@Injectable({
  providedIn: "root",
})
export class ArmorService extends AbstractCrudService<Armor> {
  constructor(localStorage: LocalStorageService) {
    super(localStorage, LOCAL_KEY);
  }

  protected loadBaseData(): Armor[] {
    return this.convertData(jsonArmors);
  }

  protected convertData(data: any): Armor[] {
    let result: Armor[] = [];
    Object.assign(result, data);
    return result;
  }

  protected get minId(): number {
    return 100;
  }

  public getArmors(): Armor[] {
    return this.storedData;
  }

  protected castJsonObject(obj: Armor): Armor {
    return new Armor(obj);
  }
}
