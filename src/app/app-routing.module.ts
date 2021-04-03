import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PageEditArmyComponent } from "./armies/pages/page-edit-army/page-edit-army.component";
import { PageListArmiesComponent } from "./armies/pages/page-list-armies/page-list-armies.component";
import { PageViewArmyComponent } from "./armies/pages/page-view-army/page-view-army.component";
import { MemoryManagerComponent } from "./core/components/memory-manager/memory-manager.component";
import { PageNotFoundComponent } from "./page-not-found/pages/page-not-found/page-not-found.component";
import { PageEditUnitComponent } from "./units/pages/page-edit-unit/page-edit-unit.component";
import { PageListUnitsComponent } from "./units/pages/page-list-units/page-list-units.component";
import { PageViewUnitComponent } from "./units/pages/page-view-unit/page-view-unit.component";
import { PageEditVehicleComponent } from "./vehicles/pages/page-edit-vehicle/page-edit-vehicle.component";
import { PageListVehiclesComponent } from "./vehicles/pages/page-list-vehicles/page-list-vehicles.component";
import { PageViewVehicleComponent } from "./vehicles/pages/page-view-vehicle/page-view-vehicle.component";
import { WeaponSelectorComponent } from "./weapons/components/weapon-selector/weapon-selector.component";
import { PageEditWeaponComponent } from "./weapons/pages/page-edit-weapon/page-edit-weapon.component";

const routes: Routes = [
  { path: "", redirectTo: "/armies", pathMatch: "full" },
  { path: "editUnit", component: PageEditUnitComponent },
  { path: "editUnit/:id", component: PageEditUnitComponent },
  { path: "viewUnit/:idUnit", component: PageViewUnitComponent },
  { path: "editArmy", component: PageEditArmyComponent },
  { path: "editArmy/:id", component: PageEditArmyComponent },
  { path: "viewArmy/:idArmy", component: PageViewArmyComponent },
  { path: "weapons", component: WeaponSelectorComponent },
  { path: "weapons/edit", component: PageEditWeaponComponent },
  { path: "weapons/edit/:id", component: PageEditWeaponComponent },
  { path: "armies", component: PageListArmiesComponent },
  { path: "units", component: PageListUnitsComponent },
  { path: "vehicles", component: PageListVehiclesComponent },
  { path: "editVehicle", component: PageEditVehicleComponent },
  { path: "editVehicle/:id", component: PageEditVehicleComponent },
  { path: "viewVehicle/:id", component: PageViewVehicleComponent },
  { path: "manageMemory", component: MemoryManagerComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: false, // <-- debugging purposes only as true
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
