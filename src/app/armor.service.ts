import { LocalStorageService } from "./local-storage.service";
import { Injectable } from "@angular/core";
import { Armor } from "./entities/armor";

import jsonArmors from "./resources/armors.json";
import { AbstractCrudService } from './abstract-crud-service';

const LOCAL_KEY: string = "armors";

@Injectable()
export class ArmorService extends AbstractCrudService<Armor>{

  constructor(localStorage: LocalStorageService) {
    super(localStorage, LOCAL_KEY);
  }

  protected loadBaseData(): Armor[] {
    return this.convertData(jsonArmors);
  }

  protected convertData(data:any): Armor[] {
    let result: Armor[] = [];
    Object.assign(result, data);
    return result;
  }

  protected get minId(): number {
    return 100
  }

  public getArmors(): Armor[] {
    return this.storedData;
  }

}
