import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ArmorsModule } from "./../armors/armors.module";
import { SharedModule } from "./../shared/shared.module";
import { WeaponsModule } from "./../weapons/weapons.module";
import { PageEditUnitComponent } from "./pages/page-edit-unit/page-edit-unit.component";
import { PageListUnitsComponent } from "./pages/page-list-units/page-list-units.component";
import { PageViewUnitComponent } from "./pages/page-view-unit/page-view-unit.component";
import { UnitsRoutingModule } from "./units-routing.module";
import { ViewUnitComponent } from './components/view-unit/view-unit.component';
import { EditUnitComponent } from './components/edit-unit/edit-unit.component';
import { ListUnitsComponent } from './components/list-units/list-units.component';

@NgModule({
  declarations: [
    PageEditUnitComponent,
    PageViewUnitComponent,
    PageListUnitsComponent,
    ViewUnitComponent,
    EditUnitComponent,
    ListUnitsComponent,
  ],
  imports: [
    CommonModule,
    UnitsRoutingModule,
    SharedModule,
    WeaponsModule,
    ArmorsModule,
  ],
  exports: [
    PageEditUnitComponent,
    PageViewUnitComponent,
    PageListUnitsComponent,
    WeaponsModule,
    ArmorsModule,
    ViewUnitComponent,
    ListUnitsComponent,
  ],
})
export class UnitsModule {}
