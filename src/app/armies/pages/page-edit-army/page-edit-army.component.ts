import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Army } from "./../../../core/models/army";
import { ArmyService } from "./../../../core/services/army.service";

@Component({
  selector: "app-page-edit-army",
  templateUrl: "./page-edit-army.component.html",
  styleUrls: ["./page-edit-army.component.css"],
})
export class PageEditArmyComponent implements OnInit {
  army$: Observable<Army>;

  constructor(
    private route: ActivatedRoute,
    private armyService: ArmyService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getArmy();
  }

  getArmy(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id == 0) {
      this.army$ = new Observable((obs) => {
        obs.next(this.buildBaseArmy());
        obs.complete();
      });
    } else {
      this.army$ = this.armyService.get(id, this.buildBaseArmy());
    }
  }

  private buildBaseArmy(): Army {
    let army = new Army();
    army.name = "Nouvelle armée";
    army.units = [];
    army.vehicles = [];
    return army;
  }

  save(army: Army): void {
    this.armyService.save(army);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
