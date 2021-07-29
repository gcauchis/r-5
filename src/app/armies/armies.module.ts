import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "./../shared/shared.module";
import { UnitsModule } from "./../units/units.module";
import { VehiclesModule } from "./../vehicles/vehicles.module";
import { ArmiesRoutingModule } from "./armies-routing.module";
import { PageEditArmyComponent } from "./pages/page-edit-army/page-edit-army.component";
import { PageListArmiesComponent } from "./pages/page-list-armies/page-list-armies.component";
import { PageViewArmyComponent } from "./pages/page-view-army/page-view-army.component";
import { ViewArmyComponent } from './components/view-army/view-army.component';
import { EditArmyComponent } from './components/edit-army/edit-army.component';
import { ListArmiesComponent } from './components/list-armies/list-armies.component';

@NgModule({
  declarations: [
    PageListArmiesComponent,
    PageEditArmyComponent,
    PageViewArmyComponent,
    ViewArmyComponent,
    EditArmyComponent,
    ListArmiesComponent,
  ],
  imports: [
    CommonModule,
    ArmiesRoutingModule,
    SharedModule,
    UnitsModule,
    VehiclesModule,
  ],
  exports: [
    PageListArmiesComponent,
    PageEditArmyComponent,
    PageViewArmyComponent,
    UnitsModule,
    VehiclesModule,
    EditArmyComponent,
    ListArmiesComponent,
  ],
})
export class ArmiesModule {}
