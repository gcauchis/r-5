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
    let armors: Armor[] = [];
    Object.assign(armors, jsonArmors);
    return armors
  }
  
  protected get minId(): number {
    return 100
  }

  public getArmors(): Armor[] {
    return this.soredData;
  }

}
