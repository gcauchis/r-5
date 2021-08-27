import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { TranslateModule } from "@ngx-translate/core";
import { IconsModule } from "./../icons/icons.module";
import { MaterialModule } from "./../material/material.module";
import { TemplatesModule } from "./../templates/templates.module";
import { WeaponsRoutingModule } from "./../weapons/weapons-routing.module";
import { BasicDialogComponent } from "./components/basic-dialog/basic-dialog.component";
import { EditImageComponent } from "./components/edit-image/edit-image.component";
import { ShowPdfComponent } from "./components/show-pdf/show-pdf.component";
import { ViewImagedComponent } from "./components/view-imaged/view-imaged.component";
import { DiceToStringPipe } from "./pipes/dice-to-string.pipe";
import { ExplosiveWeaponSizeToStringPipe } from "./pipes/explosive-weapon-size-to-string.pipe";
import { MoveTypeToStringPipe } from "./pipes/move-type-to-string.pipe";
import { PriceArmyPipe } from "./pipes/price-army.pipe";
import { PriceCombatUnitPipe } from "./pipes/price-combat-unit.pipe";
import { PriceWeaponPipe } from "./pipes/price-weapon.pipe";
import { TacticalRoleToStringPipe } from "./pipes/tactical-role-to-string.pipe";
import { UnitRunMovePipe } from "./pipes/unit-run-move.pipe";
import { UnitSizeToStringPipe } from "./pipes/unit-size-to-string.pipe";
import { UnitTypeToStringPipe } from "./pipes/unit-type-to-string.pipe";
import { VehicleRunMovePipe } from "./pipes/vehicle-run-move.pipe";
import { VehicleTypeToStringPipe } from "./pipes/vehicle-type-to-string.pipe";
import { WeaponRulesToStringPipe } from "./pipes/weapon-rules-to-string.pipe";
import { WeaponTypeToStringPipe } from "./pipes/weapon-type-to-string.pipe";
import { ChangeLanguageComponent } from './components/change-language/change-language.component';

@NgModule({
  declarations: [
    ViewImagedComponent,
    EditImageComponent,
    PriceCombatUnitPipe,
    PriceWeaponPipe,
    ShowPdfComponent,
    BasicDialogComponent,
    DiceToStringPipe,
    UnitTypeToStringPipe,
    UnitSizeToStringPipe,
    MoveTypeToStringPipe,
    TacticalRoleToStringPipe,
    WeaponTypeToStringPipe,
    ExplosiveWeaponSizeToStringPipe,
    VehicleTypeToStringPipe,
    PriceArmyPipe,
    UnitRunMovePipe,
    VehicleRunMovePipe,
    WeaponRulesToStringPipe,
    ChangeLanguageComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    TemplatesModule,
    TranslateModule,
  ],
  exports: [
    CommonModule,
    BrowserModule,
    IconsModule,
    TemplatesModule,
    WeaponsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ViewImagedComponent,
    EditImageComponent,
    PriceCombatUnitPipe,
    PriceWeaponPipe,
    ShowPdfComponent,
    DiceToStringPipe,
    UnitTypeToStringPipe,
    UnitSizeToStringPipe,
    MoveTypeToStringPipe,
    TacticalRoleToStringPipe,
    WeaponTypeToStringPipe,
    ExplosiveWeaponSizeToStringPipe,
    VehicleTypeToStringPipe,
    PriceArmyPipe,
    UnitRunMovePipe,
    VehicleRunMovePipe,
    WeaponRulesToStringPipe,
    TranslateModule,
    ChangeLanguageComponent,
  ],
})
export class SharedModule {}
