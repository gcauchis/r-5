import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WeaponSelectorComponent } from "./components/weapon-selector/weapon-selector.component";
import { PageEditWeaponComponent } from "./pages/page-edit-weapon/page-edit-weapon.component";
import { PageViewWeaponComponent } from "./pages/page-view-weapon/page-view-weapon.component";

const routes: Routes = [
  { path: "", component: WeaponSelectorComponent },
  { path: "edit", component: PageEditWeaponComponent },
  { path: "edit/:id", component: PageEditWeaponComponent },
  { path: "view/:id", component: PageViewWeaponComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeaponsRoutingModule {}
