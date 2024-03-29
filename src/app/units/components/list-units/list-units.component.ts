import { Component, Input, OnInit, Output, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject } from "rxjs";
import { Army } from "./../../../core/models/army";
import { ArmyLink } from "./../../../core/models/army-link";
import { Unit } from "./../../../core/models/unit";
import { UnitService } from "./../../../core/services/unit.service";

@Component({
  selector: "app-list-units",
  templateUrl: "./list-units.component.html",
  styleUrls: ["./list-units.component.css"],
})
export class ListUnitsComponent implements OnInit {
  displayedColumns: string[] = [];
  dataSourceUnits: MatTableDataSource<Unit>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() army: Army;
  links: any = {};
  armyLinks: ArmyLink[] = [];
  @Output() onLinksChange: BehaviorSubject<ArmyLink[]> = new BehaviorSubject(
    this.armyLinks
  );

  nameFilter: string;
  factionFilter: string;

  _filter = (data: Unit, filter: string) => {
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

  constructor(private unitService: UnitService) {}

  ngOnInit() {
    if (this.army) this.armyLinks = this.army.units.filter((r) => r != null);
    this.onLinksChange.next(this.armyLinks);
    this.unitService.collection.subscribe((res) => {
      this.dataSourceUnits = new MatTableDataSource<Unit>(res);
      this.dataSourceUnits.filterPredicate = this._filter;
      if (this.army == null) {
        this.displayedColumns = ["unit", "edit", "view", "remove"];
      } else {
        res.forEach((u) => (this.links[u.id] = 0));
        this.armyLinks.forEach((l) => (this.links[l.id] = l.count));
        this.displayedColumns = ["unit", "army", "edit"];
        this.onLinksChange.next(this.armyLinks);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSourceUnits.paginator = this.paginator;
  }

  onChangeFilter() {
    this.dataSourceUnits.filter = this.nameFilter + this.factionFilter;
  }

  updateLinks(id: number, value: number): void {
    this.links[id] = value;
    this.armyLinks = [];
    this.unitService.collection.asObservable().subscribe((res) => {
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

  remove(unit: Unit): void {
    this.unitService.remove(unit);
  }
}
