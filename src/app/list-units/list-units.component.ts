import { UnitService } from './../unit.service';
import { Component, OnInit } from '@angular/core';
import { Unit } from '../entities/unit';

@Component({
  selector: 'app-list-units',
  templateUrl: './list-units.component.html',
  styleUrls: ['./list-units.component.scss']
})
export class ListUnitsComponent implements OnInit {

  units: Unit[];
  displayedColumns: string[] = [ 'unit', 'edit' ];

  constructor(public unitService: UnitService) {

  }

  ngOnInit() {
    this.units = this.unitService.storedData;
  }

}
