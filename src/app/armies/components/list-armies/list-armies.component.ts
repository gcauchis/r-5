import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Army } from "./../../../core/models/army";
import { ArmyService } from "./../../../core/services/army.service";

@Component({
  selector: "app-list-armies",
  templateUrl: "./list-armies.component.html",
  styleUrls: ["./list-armies.component.css"],
})
export class ListArmiesComponent implements OnInit {
  displayedColumns: string[] = ["army", "price", "edit", "view", "remove"];
  dataSourceArmies: MatTableDataSource<Army>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private armyService: ArmyService) {}

  ngOnInit(): void {
    this.armyService.collection.subscribe((res) => {
      this.dataSourceArmies = new MatTableDataSource<Army>(res);
      this.dataSourceArmies.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {
    this.dataSourceArmies.paginator = this.paginator;
  }

  remove(army: Army): void {
    this.armyService.remove(army);
  }
}
