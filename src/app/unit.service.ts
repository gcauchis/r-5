import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { Unit } from './entities/unit';
import { AbstractCrudService } from './abstract-crud-service';

const LOCAL_KEY: string = "units";

@Injectable()
export class UnitService extends AbstractCrudService<Unit> {

  constructor(localStorage: LocalStorageService) {
    super(localStorage, LOCAL_KEY);
  }

  protected loadBaseData(): Unit[] {
    return [];
  }
  protected get minId(): number {
    return 1000;
  }

  public getRunMove(unit: Unit): number {
    return Math.round(unit.tacticalMove * 1.6);
  }

}