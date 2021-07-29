import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "./../shared/shared.module";
import { WeaponsModule } from "./../weapons/weapons.module";
import { PageEditVehicleComponent } from "./pages/page-edit-vehicle/page-edit-vehicle.component";
import { PageListVehiclesComponent } from "./pages/page-list-vehicles/page-list-vehicles.component";
import { PageViewVehicleComponent } from "./pages/page-view-vehicle/page-view-vehicle.component";
import { VehiclesRoutingModule } from "./vehicles-routing.module";
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { EditVehicleComponent } from './components/edit-vehicle/edit-vehicle.component';
import { ListVehiclesComponent } from './components/list-vehicles/list-vehicles.component';

@NgModule({
  declarations: [
    PageEditVehicleComponent,
    PageViewVehicleComponent,
    PageListVehiclesComponent,
    ViewVehicleComponent,
    EditVehicleComponent,
    ListVehiclesComponent,
  ],
  imports: [CommonModule, VehiclesRoutingModule, SharedModule, WeaponsModule],
  exports: [
    PageEditVehicleComponent,
    PageViewVehicleComponent,
    PageListVehiclesComponent,
    WeaponsModule,
    ViewVehicleComponent,
    ListVehiclesComponent,
  ],
})
export class VehiclesModule {}
