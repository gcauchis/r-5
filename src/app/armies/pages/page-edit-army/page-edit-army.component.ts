import { Location } from "@angular/common";
import { Component, OnInit, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Army } from "./../../../core/models/army";
import { ArmyService } from "./../../../core/services/army.service";

@Component({
  selector: "app-page-edit-army",
  templateUrl: "./page-edit-army.component.html",
  styleUrls: ["./page-edit-army.component.css"],
})
export class PageEditArmyComponent implements OnInit {
  @Output() army: Army;

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
      this.army = this.buildBaseArmy();
    } else {
      this.army = this.armyService.get(id);
      if (this.army == null) {
        this.army = this.buildBaseArmy();
      }
    }
  }

  private buildBaseArmy(): Army {
    let army = new Army();
    army.name = "Nouvelle armée";
    army.units = [];
    army.vehicles = [];
    return army;
  }

  save(): void {
    this.armyService.save(this.army);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
