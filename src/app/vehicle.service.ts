import { LocalStorageService } from './local-storage.service';
import { Injectable } from '@angular/core';
import { AbstractCrudService } from './abstract-crud-service';
import { Vehicle } from './entities/vehicle';

const LOCAL_KEY: string = "vehicles";

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends AbstractCrudService<Vehicle> {

  constructor(localStorage: LocalStorageService) {
    super(localStorage, LOCAL_KEY);
   }
   
  protected loadBaseData(): Vehicle[] {
    return [];
  }

  protected get minId(): number {
    return 100;
  }
}
