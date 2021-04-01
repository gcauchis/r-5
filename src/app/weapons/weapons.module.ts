import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "./../shared/shared.module";
import { WeaponSelectorComponent } from "./components/weapon-selector/weapon-selector.component";
import { PageEditWeaponComponent } from "./pages/page-edit-weapon/page-edit-weapon.component";
import { PageViewWeaponComponent } from "./pages/page-view-weapon/page-view-weapon.component";
import { ViewWeaponsComponent } from './components/view-weapons/view-weapons.component';

@NgModule({
  declarations: [
    PageEditWeaponComponent,
    PageViewWeaponComponent,
    WeaponSelectorComponent,
    ViewWeaponsComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [WeaponSelectorComponent, PageViewWeaponComponent, ViewWeaponsComponent],
})
export class WeaponsModule {}
