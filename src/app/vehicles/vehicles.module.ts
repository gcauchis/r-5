import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "./../shared/shared.module";
import { PageEditVehicleComponent } from "./pages/page-edit-vehicle/page-edit-vehicle.component";
import { PageListVehiclesComponent } from "./pages/page-list-vehicles/page-list-vehicles.component";
import { PageViewVehicleComponent } from "./pages/page-view-vehicle/page-view-vehicle.component";
import { VehiclesRoutingModule } from "./vehicles-routing.module";

@NgModule({
  declarations: [
    PageEditVehicleComponent,
    PageViewVehicleComponent,
    PageListVehiclesComponent,
  ],
  imports: [CommonModule, VehiclesRoutingModule, SharedModule],
  exports: [
    PageEditVehicleComponent,
    PageViewVehicleComponent,
    PageListVehiclesComponent,
  ],
})
export class VehiclesModule {}
