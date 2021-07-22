import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "./../shared/shared.module";
import { DialogRulesSelectorComponent } from "./components/dialog-rules-selector/dialog-rules-selector.component";
import { EditWeaponComponent } from "./components/edit-weapon/edit-weapon.component";
import { EditWeaponsListComponent } from "./components/edit-weapons-list/edit-weapons-list.component";
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
    EditWeaponComponent,
    DialogRulesSelectorComponent,
    EditWeaponsListComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [
    WeaponSelectorComponent,
    ViewWeaponsComponent,
    ViewWeaponComponent,
    DialogRulesSelectorComponent,
    EditWeaponsListComponent,
  ],
})
export class WeaponsModule {}
