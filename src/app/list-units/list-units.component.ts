import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UnitService } from './../unit.service';
import { Component, OnInit } from '@angular/core';
import { Unit } from "../entities/Unit";

@Component({
  selector: 'app-list-units',
  templateUrl: './list-units.component.html',
  styleUrls: ['./list-units.component.scss']
})
export class ListUnitsComponent implements OnInit {

  displayedColumns: string[] = [ 'unit', 'edit', 'view' ];
  dataSourceUnits: MatTableDataSource<Unit>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public unitService: UnitService) {

  }

  ngOnInit() {
    this.dataSourceUnits = new MatTableDataSource<Unit>(this.unitService.storedData);
  }

  ngAfterViewInit() {
    this.dataSourceUnits.paginator = this.paginator;
  }

}
