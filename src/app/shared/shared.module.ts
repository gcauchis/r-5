import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { IconsModule } from "./../icons/icons.module";
import { MaterialModule } from "./../material/material.module";
import { TemplatesModule } from "./../templates/templates.module";
import { WeaponsRoutingModule } from "./../weapons/weapons-routing.module";
import { EditImageComponent } from "./components/edit-image/edit-image.component";
import { ViewImagedComponent } from "./components/view-imaged/view-imaged.component";
import { PriceCombatUnitPipe } from "./pipes/price-combat-unit.pipe";
import { PriceWeaponPipe } from "./pipes/price-weapon.pipe";
import { ShowPdfComponent } from './components/show-pdf/show-pdf.component';

@NgModule({
  declarations: [
    ViewImagedComponent,
    EditImageComponent,
    PriceCombatUnitPipe,
    PriceWeaponPipe,
    ShowPdfComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    IconsModule,
    FormsModule,
    ReactiveFormsModule,
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
  ],
})
export class SharedModule {}
