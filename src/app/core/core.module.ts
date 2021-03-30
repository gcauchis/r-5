import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { IconsModule } from "./../icons/icons.module";
import { MaterialModule } from "./../material/material.module";
import { PageNotFoundComponent } from "./../page-not-found/page-not-found.component";
import { TemplatesModule } from "./../templates/templates.module";
import { WeaponsModule } from "./../weapons/weapons.module";
import { ArmorSelectorComponent } from "./components/armor-selector/armor-selector.component";
import { EditArmyComponent } from "./components/edit-army/edit-army.component";
import { EditImageComponent } from "./components/edit-image/edit-image.component";
import { EditUnitComponent } from "./components/edit-unit/edit-unit.component";
import { EditVehicleComponent } from "./components/edit-vehicle/edit-vehicle.component";
import { ListArmyComponent } from "./components/list-army/list-army.component";
import { ListUnitsComponent } from "./components/list-units/list-units.component";
import { MemoryManagerComponent } from "./components/memory-manager/memory-manager.component";
import { MemoryOfServiceComponent } from "./components/memory-of-service/memory-of-service.component";
import { NavComponent } from "./components/nav/nav.component";
import { ViewArmyComponent } from "./components/view-army/view-army.component";
import { ViewImagedComponent } from "./components/view-imaged/view-imaged.component";
import { ViewUnitComponent } from "./components/view-unit/view-unit.component";
import { ViewVehicleComponent } from "./components/view-vehicle/view-vehicle.component";
import { ArmorService } from "./services/armor.service";
import { EnumUtilsService } from "./services/enum-utils.service";
import { PriceService } from "./services/price.service";
import { UnitService } from "./services/unit.service";
import { UtilsService } from "./services/utils.service";
import { WeaponService } from "./services/weapon.service";

@NgModule({
  declarations: [
    ViewUnitComponent,
    EditUnitComponent,
    ArmorSelectorComponent,
    PageNotFoundComponent,
    ListUnitsComponent,
    EditVehicleComponent,
    EditImageComponent,
    ViewImagedComponent,
    ViewVehicleComponent,
    EditArmyComponent,
    ListArmyComponent,
    ViewArmyComponent,
    MemoryOfServiceComponent,
    MemoryManagerComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    IconsModule,
    MaterialModule,
    WeaponsModule,
  ],
  exports: [
    ViewUnitComponent,
    EditUnitComponent,
    ArmorSelectorComponent,
    PageNotFoundComponent,
    ListUnitsComponent,
    EditVehicleComponent,
    EditImageComponent,
    ViewImagedComponent,
    ViewVehicleComponent,
    EditArmyComponent,
    ListArmyComponent,
    ViewArmyComponent,
    MemoryOfServiceComponent,
    MemoryManagerComponent,
    NavComponent,
    WeaponsModule,
    TemplatesModule,
  ],
  providers: [
    UnitService,
    UtilsService,
    WeaponService,
    PriceService,
    EnumUtilsService,
    ArmorService,
  ],
})
export class CoreModule {}
