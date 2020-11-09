import { ArmyLink } from './../entities/army-link';
import { Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UnitService } from './../unit.service';
import { Component, OnInit } from '@angular/core';
import { Unit } from "../entities/unit";
import { Army } from '../entities/army';

@Component({
  selector: 'app-list-units',
  templateUrl: './list-units.component.html',
  styleUrls: ['./list-units.component.scss']
})
export class ListUnitsComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSourceUnits: MatTableDataSource<Unit>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() army:Army
  links:any = {};

  constructor(public unitService: UnitService) {

  }

  ngOnInit() {
    this.dataSourceUnits = new MatTableDataSource<Unit>(this.unitService.storedData);
    if (this.army == null) {
      this.displayedColumns = [ 'unit', 'edit', 'view' ];
    } else {
      this.unitService.storedData.forEach(u => this.links[u.id] = 0);
      this.army.units.forEach(l => this.links[l.id] = l.count);
      this.displayedColumns = [ 'unit', 'army', 'edit' ];
    }
  }

  ngAfterViewInit() {
    this.dataSourceUnits.paginator = this.paginator;
  }

  updateLinks(id:number, value:number): void {
    this.links[id] = value;
    this.army.units = [];
    this.unitService.storedData.forEach(unit => {
      if (this.links[unit.id] > 0) {
        let link = new ArmyLink();
        link.id = unit.id;
        link.count = this.links[unit.id];
        this.army.units.push(link)
      }
    });
  }

}
