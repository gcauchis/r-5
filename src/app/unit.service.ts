import { Injectable } from '@angular/core';
import { Unit } from './entities/unit';

@Injectable()
export class UnitService {

  constructor() { }

  public getRunMove(unit:Unit): number {
    return Math.round(unit.tacticalMove * 1.6);
  }

}