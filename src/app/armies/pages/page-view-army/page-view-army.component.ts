import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Army } from "./../../../core/models/army";
import { ArmyService } from "./../../../core/services/army.service";

@Component({
  selector: "app-page-view-army",
  templateUrl: "./page-view-army.component.html",
  styleUrls: ["./page-view-army.component.css"],
})
export class PageViewArmyComponent implements OnInit {
  army$: Observable<Army>;

  constructor(
    private route: ActivatedRoute,
    private armyService: ArmyService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("idArmy");
    if (id != 0) {
      this.army$ = this.armyService.get(id);
    }
  }
}
