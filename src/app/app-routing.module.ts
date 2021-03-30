import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { EditArmyComponent } from "./core/components/edit-army/edit-army.component";
import { EditUnitComponent } from "./core/components/edit-unit/edit-unit.component";
import { EditVehicleComponent } from "./core/components/edit-vehicle/edit-vehicle.component";
import { ListArmyComponent } from "./core/components/list-army/list-army.component";
import { ListUnitsComponent } from "./core/components/list-units/list-units.component";
import { MemoryManagerComponent } from "./core/components/memory-manager/memory-manager.component";
import { ViewArmyComponent } from "./core/components/view-army/view-army.component";
import { ViewUnitComponent } from "./core/components/view-unit/view-unit.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { WeaponSelectorComponent } from "./weapons/components/weapon-selector/weapon-selector.component";
import { PageEditWeaponComponent } from "./weapons/pages/page-edit-weapon/page-edit-weapon.component";

const routes: Routes = [
  { path: "", redirectTo: "/armies", pathMatch: "full" },
  { path: "editUnit", component: EditUnitComponent },
  { path: "editUnit/:id", component: EditUnitComponent },
  { path: "viewUnit/:idUnit", component: ViewUnitComponent },
  { path: "editArmy", component: EditArmyComponent },
  { path: "editArmy/:id", component: EditArmyComponent },
  { path: "viewArmy/:idArmy", component: ViewArmyComponent },
  { path: "weapons", component: WeaponSelectorComponent },
  { path: "weapons/edit", component: PageEditWeaponComponent },
  { path: "weapons/edit/:id", component: PageEditWeaponComponent },
  { path: "armies", component: ListArmyComponent },
  { path: "units", component: ListUnitsComponent },
  { path: "editVehicle", component: EditVehicleComponent },
  { path: "editVehicle/:id", component: EditVehicleComponent },
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
export class AppRoutingModule {
  constructor(private router: Router) {
    // Use a custom replacer to display function names in the route configs
    const replacer = (key: any, value: any) =>
      typeof value === "function" ? value.name : value;
    console.log("Routes: ", JSON.stringify(router.config, replacer, 2));
  }
}
