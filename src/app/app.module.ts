import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ViewUnitComponent } from './view-unit/view-unit.component';
import { UnitService } from './unit.service';
import { EditUnitComponent } from './edit-unit/edit-unit.component';
import { UtilsService } from './utils.service';
import { WeaponService } from './weapon.service';
import { WeaponSelectorComponent } from './weapon-selector/weapon-selector.component';
import { PriceService } from './price.service';
import { EnumUtilsService } from './enum-utils.service';
import { ArmorSelectorComponent } from './armor-selector/armor-selector.component';
import { ArmorService } from './armor.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditWeaponComponent } from './edit-weapon/edit-weapon.component';
import { ListUnitsComponent } from './list-units/list-units.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/units', pathMatch: 'full'  },
  { path: 'editUnit', component: EditUnitComponent },
  { path: 'editUnit/:id', component: EditUnitComponent },
  { path: 'editWeapon', component: EditWeaponComponent },
  { path: 'editWeapon/:id', component: EditWeaponComponent },
  { path: 'units', component: ListUnitsComponent },
  { path: 'weapons', component: WeaponSelectorComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only as true
    ),
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
    NgxMatFileInputModule
  ],
  declarations: [		
    AppComponent,
    HelloComponent,
    ViewUnitComponent,
    EditUnitComponent,
    WeaponSelectorComponent,
    ArmorSelectorComponent,
    PageNotFoundComponent,
    EditWeaponComponent,
    ListUnitsComponent
   ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    UnitService,
    UtilsService,
    WeaponService,
    PriceService,
    EnumUtilsService,
    ArmorService,
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }}
  ]
})
export class AppModule { }
