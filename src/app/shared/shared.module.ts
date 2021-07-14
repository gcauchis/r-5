import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
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
import { PriceCombatUnitPipe } from "./pipes/price-combat-unit.pipe";
import { PriceWeaponPipe } from "./pipes/price-weapon.pipe";
import { TacticalRoleToStringPipe } from "./pipes/tactical-role-to-string.pipe";
import { UnitSizeToStringPipe } from "./pipes/unit-size-to-string.pipe";
import { UnitTypeToStringPipe } from "./pipes/unit-type-to-string.pipe";
import { VehicleTypeToStringPipe } from "./pipes/vehicle-type-to-string.pipe";
import { WeaponTypeToStringPipe } from "./pipes/weapon-type-to-string.pipe";

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
  ],
  imports: [
    CommonModule,
    MaterialModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
    TemplatesModule,
  ],
  exports: [
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
  ],
})
export class SharedModule {}
