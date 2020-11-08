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

  displayedColumns: string[] = [ 'unit', 'edit', 'view' ];
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
      this.dataSourceUnits.data.forEach(u => this.links[u.id] = 0);
      this.army.units.forEach(l => this.links[l.id] = l.count);
      this.displayedColumns = [ 'unit', 'army', 'edit' ];
    }
  }

  ngAfterViewInit() {
    this.dataSourceUnits.paginator = this.paginator;
  }

  updateLinks(): void {
    console.log(this.links);
    this.army.units = [];
    this.unitService.storedData.forEach(unit => {
      if (this.links[unit.id] > 0) {
        console.log("add " + unit.id + " to army (" + this.links[unit.id] +")");
        let link = new ArmyLink();
        link.id = unit.id;
        link.count = this.links[unit.id];
        this.army.units.push(link)
      }
    });
  }

}
