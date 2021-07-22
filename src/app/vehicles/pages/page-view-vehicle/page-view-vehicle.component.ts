import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Vehicle } from "./../../../core/models/vehicle";
import { VehicleService } from "./../../../core/services/vehicle.service";

@Component({
  selector: "app-page-view-vehicle",
  templateUrl: "./page-view-vehicle.component.html",
  styleUrls: ["./page-view-vehicle.component.css"],
})
export class PageViewVehicleComponent implements OnInit {
  vehicle$: Observable<Vehicle>;

  constructor(
    private route: ActivatedRoute,
    public vehicleService: VehicleService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id != 0) {
      this.vehicle$ = this.vehicleService.get(id);
    }
  }
}
