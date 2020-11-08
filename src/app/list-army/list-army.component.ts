import { ArmyService } from './../army.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { Army } from '../entities/army';

@Component({
  selector: 'app-list-army',
  templateUrl: './list-army.component.html',
  styleUrls: ['./list-army.component.css']
})
export class ListArmyComponent implements OnInit {

  displayedColumns: string[] = [ 'army', 'edit', 'remove'];
  dataSourceArmies: MatTableDataSource<Army>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private armyService:ArmyService) { }

  ngOnInit(): void {
    this.dataSourceArmies = new MatTableDataSource<Army>(this.armyService.storedData);
  }

  ngAfterViewInit() {
    this.dataSourceArmies.paginator = this.paginator;
  }
  
  remove(army: Army):void {
    this.armyService.remove(army);
    this.dataSourceArmies = new MatTableDataSource<Army>(this.armyService.storedData);
    this.dataSourceArmies.paginator = this.paginator;
  }

}
