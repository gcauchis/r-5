import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Army } from "./../../../core/models/army";
import { ArmyService } from "./../../../core/services/army.service";

@Component({
  selector: "app-page-list-armies",
  templateUrl: "./page-list-armies.component.html",
  styleUrls: ["./page-list-armies.component.css"],
})
export class PageListArmiesComponent implements OnInit {
  displayedColumns: string[] = ["army", "edit", "view", "remove"];
  dataSourceArmies: MatTableDataSource<Army>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private armyService: ArmyService) {}

  ngOnInit(): void {
    this.dataSourceArmies = new MatTableDataSource<Army>(
      this.armyService.storedData
    );
  }

  ngAfterViewInit() {
    this.dataSourceArmies.paginator = this.paginator;
  }

  remove(army: Army): void {
    this.armyService.remove(army);
    this.dataSourceArmies = new MatTableDataSource<Army>(
      this.armyService.storedData
    );
    this.dataSourceArmies.paginator = this.paginator;
  }
}
