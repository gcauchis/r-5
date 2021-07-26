import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Unit } from "./../../../core/models/unit";
import { UnitService } from "./../../../core/services/unit.service";

@Component({
  selector: "app-page-view-unit",
  templateUrl: "./page-view-unit.component.html",
  styleUrls: ["./page-view-unit.component.css"],
})
export class PageViewUnitComponent implements OnInit {
  unit$: Observable<Unit>;

  constructor(
    private route: ActivatedRoute,
    private unitService: UnitService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get("idUnit");
    if (id != 0) {
      this.unit$ = this.unitService.get(id);
    }
  }
}
