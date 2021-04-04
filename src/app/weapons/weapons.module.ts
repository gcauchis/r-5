import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "./../shared/shared.module";
import { ViewWeaponComponent } from "./components/view-weapon/view-weapon.component";
import { ViewWeaponsComponent } from "./components/view-weapons/view-weapons.component";
import { WeaponSelectorComponent } from "./components/weapon-selector/weapon-selector.component";
import { PageEditWeaponComponent } from "./pages/page-edit-weapon/page-edit-weapon.component";

@NgModule({
  declarations: [
    PageEditWeaponComponent,
    WeaponSelectorComponent,
    ViewWeaponsComponent,
    ViewWeaponComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [WeaponSelectorComponent, ViewWeaponsComponent, ViewWeaponComponent],
})
export class WeaponsModule {}
