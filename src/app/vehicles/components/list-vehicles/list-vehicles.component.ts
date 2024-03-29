import { Component, Input, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject } from "rxjs";
import { Army } from "./../../../core/models/army";
import { ArmyLink } from "./../../../core/models/army-link";
import { Vehicle } from "./../../../core/models/vehicle";
import { VehicleService } from "./../../../core/services/vehicle.service";

@Component({
  selector: "app-list-vehicles",
  templateUrl: "./list-vehicles.component.html",
  styleUrls: ["./list-vehicles.component.css"],
})
export class ListVehiclesComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSourceVehicle: MatTableDataSource<Vehicle>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() army: Army;
  links: any = {};
  armyLinks: ArmyLink[] = [];
  @Output() onLinksChange: BehaviorSubject<ArmyLink[]> = new BehaviorSubject(
    this.armyLinks
  );

  nameFilter: string;
  factionFilter: string;
  constructor(public vehicleService: VehicleService) {}

  ngOnInit(): void {
    if (this.army) this.armyLinks = this.army.vehicles.filter((r) => r != null);
    this.onLinksChange.next(this.armyLinks);
    this.vehicleService.collection.subscribe((vehicles) => {
      this.dataSourceVehicle = new MatTableDataSource<Vehicle>(vehicles);
      this.dataSourceVehicle.filterPredicate = this._filter;
      if (this.army == null) {
        this.displayedColumns = ["vehicle", "edit", "view", "remove"];
      } else {
        vehicles.forEach((u) => (this.links[u.id] = 0));
        this.armyLinks.forEach((l) => (this.links[l.id] = l.count));
        this.displayedColumns = ["vehicle", "army", "edit"];
        this.onLinksChange.next(this.armyLinks);
      }
    });
  }

  _filter = (data: Vehicle, filter: string) => {
    let nameMatch =
      this.nameFilter == null || this.nameFilter.trim() == ""
        ? true
        : data.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) != -1;
    let factionMatch =
      this.factionFilter == null || this.factionFilter.trim() == ""
        ? true
        : data.faction != null &&
          data.faction
            .toLowerCase()
            .indexOf(this.factionFilter.toLowerCase()) != -1;
    return nameMatch && factionMatch;
  };

  ngAfterViewInit() {
    this.dataSourceVehicle.paginator = this.paginator;
  }

  onChangeFilter() {
    this.dataSourceVehicle.filter = this.nameFilter + this.factionFilter;
  }

  updateLinks(id: number, value: number): void {
    this.links[id] = value;
    this.armyLinks = [];
    this.vehicleService.collection.asObservable().subscribe((res) => {
      res.forEach((unit) => {
        if (this.links[unit.id] > 0) {
          let link = new ArmyLink();
          link.id = unit.id;
          link.count = this.links[unit.id];
          this.armyLinks.push(link);
        }
      });
      this.onLinksChange.next(this.armyLinks);
    });
  }

  remove(vehicle: Vehicle): void {
    this.vehicleService.remove(vehicle);
  }
}
