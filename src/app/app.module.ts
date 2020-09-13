import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, ViewUnitComponent, EditUnitComponent, WeaponSelectorComponent ],
  bootstrap:    [ AppComponent ],
  providers: [UnitService, UtilsService, WeaponService, PriceService, EnumUtilsService]
})
export class AppModule { }
