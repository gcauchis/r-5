import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./../material/material.module";
import { TemplatesModule } from "./../templates/templates.module";
import { WeaponSelectorComponent } from "./components/weapon-selector/weapon-selector.component";
import { PageEditWeaponComponent } from "./pages/page-edit-weapon/page-edit-weapon.component";
import { PageViewWeaponComponent } from "./pages/page-view-weapon/page-view-weapon.component";
import { WeaponsRoutingModule } from "./weapons-routing.module";

@NgModule({
  declarations: [
    PageEditWeaponComponent,
    PageViewWeaponComponent,
    WeaponSelectorComponent,
  ],
  imports: [
    CommonModule,
    WeaponsRoutingModule,
    MaterialModule,
    TemplatesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [WeaponSelectorComponent, PageViewWeaponComponent],
})
export class WeaponsModule {}
