import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { AbstractCrudService } from './abstract-crud-service';
import { Army } from './entities/army';

const LOCAL_KEY: string = "armies";

@Injectable({
  providedIn: 'root'
})
export class ArmyService extends AbstractCrudService<Army> {

  constructor(localStorage: LocalStorageService) {
    super(localStorage, LOCAL_KEY);
  }
  
  protected loadBaseData(): Army[] {
    return [];
  }
  protected get minId(): number {
    return 100;
  }
}
