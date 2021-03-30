import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  //  { path: "", component: WeaponSelectorComponent },
  //  { path: "edit", component: PageEditWeaponComponent },
  //  { path: "edit/:id", component: PageEditWeaponComponent },
  //  { path: "view/:id", component: PageViewWeaponComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeaponsRoutingModule {}
