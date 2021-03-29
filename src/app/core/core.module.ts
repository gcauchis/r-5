import { NgxMatFileInputModule } from "@angular-material-components/file-input";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { PageNotFoundComponent } from "./../page-not-found/page-not-found.component";
import { ArmorSelectorComponent } from "./components/armor-selector/armor-selector.component";
import { EditArmyComponent } from "./components/edit-army/edit-army.component";
import { EditImageComponent } from "./components/edit-image/edit-image.component";
import { EditUnitComponent } from "./components/edit-unit/edit-unit.component";
import { EditVehicleComponent } from "./components/edit-vehicle/edit-vehicle.component";
import { EditWeaponComponent } from "./components/edit-weapon/edit-weapon.component";
import { ListArmyComponent } from "./components/list-army/list-army.component";
import { ListUnitsComponent } from "./components/list-units/list-units.component";
import { MemoryManagerComponent } from "./components/memory-manager/memory-manager.component";
import { MemoryOfServiceComponent } from "./components/memory-of-service/memory-of-service.component";
import { NavComponent } from "./components/nav/nav.component";
import { ViewArmyComponent } from "./components/view-army/view-army.component";
import { ViewImagedComponent } from "./components/view-imaged/view-imaged.component";
import { ViewUnitComponent } from "./components/view-unit/view-unit.component";
import { ViewVehicleComponent } from "./components/view-vehicle/view-vehicle.component";
import { ViewWeaponComponent } from "./components/view-weapon/view-weapon.component";
import { WeaponSelectorComponent } from "./components/weapon-selector/weapon-selector.component";
import { ArmorService } from "./services/armor.service";
import { EnumUtilsService } from "./services/enum-utils.service";
import { PriceService } from "./services/price.service";
import { UnitService } from "./services/unit.service";
import { UtilsService } from "./services/utils.service";
import { WeaponService } from "./services/weapon.service";

const appRoutes: Routes = [
  { path: "", redirectTo: "/armies", pathMatch: "full" },
  { path: "editUnit", component: EditUnitComponent },
  { path: "editUnit/:id", component: EditUnitComponent },
  { path: "viewUnit/:idUnit", component: ViewUnitComponent },
  { path: "editArmy", component: EditArmyComponent },
  { path: "editArmy/:id", component: EditArmyComponent },
  { path: "viewArmy/:idArmy", component: ViewArmyComponent },
  { path: "editWeapon", component: EditWeaponComponent },
  { path: "editWeapon/:id", component: EditWeaponComponent },
  { path: "armies", component: ListArmyComponent },
  { path: "units", component: ListUnitsComponent },
  { path: "weapons", component: WeaponSelectorComponent },
  { path: "editVehicle", component: EditVehicleComponent },
  { path: "editVehicle/:id", component: EditVehicleComponent },
  { path: "manageMemory", component: MemoryManagerComponent },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    ViewUnitComponent,
    EditUnitComponent,
    WeaponSelectorComponent,
    ArmorSelectorComponent,
    PageNotFoundComponent,
    EditWeaponComponent,
    ListUnitsComponent,
    ViewWeaponComponent,
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
    MatIconModule,
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    NgxMatFileInputModule,
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only as true
    ),
  ],
  exports: [
    ViewUnitComponent,
    EditUnitComponent,
    WeaponSelectorComponent,
    ArmorSelectorComponent,
    PageNotFoundComponent,
    EditWeaponComponent,
    ListUnitsComponent,
    ViewWeaponComponent,
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
  providers: [
    UnitService,
    UtilsService,
    WeaponService,
    PriceService,
    EnumUtilsService,
    ArmorService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "fill" },
    },
  ],
})
export class CoreModule {}
