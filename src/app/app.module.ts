import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

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

const appRoutes: Routes = [
  { path: '', redirectTo: '/editUnit', pathMatch: 'full'  },
  { path: 'editUnit', component: EditUnitComponent },
  { path: 'unit', component: ViewUnitComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [BrowserModule, FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserAnimationsModule,
    MatIconModule,
    MatMenuModule],
  declarations: [AppComponent, HelloComponent, ViewUnitComponent, EditUnitComponent, WeaponSelectorComponent, ArmorSelectorComponent, PageNotFoundComponent],
  bootstrap: [AppComponent],
  providers: [UnitService, UtilsService, WeaponService, PriceService, EnumUtilsService, ArmorService]
})
export class AppModule { }
