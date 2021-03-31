import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { ArmiesModule } from "../armies/armies.module";
import { IconsModule } from "./../icons/icons.module";
import { PageNotFoundModule } from "./../page-not-found/page-not-found.module";
import { SharedModule } from "./../shared/shared.module";
import { TemplatesModule } from "./../templates/templates.module";
import { WeaponsModule } from "./../weapons/weapons.module";
import { MemoryManagerComponent } from "./components/memory-manager/memory-manager.component";
import { MemoryOfServiceComponent } from "./components/memory-of-service/memory-of-service.component";
import { NavComponent } from "./components/nav/nav.component";

@NgModule({
  declarations: [
    MemoryOfServiceComponent,
    MemoryManagerComponent,
    NavComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    IconsModule,
    ArmiesModule,
  ],
  exports: [
    MemoryOfServiceComponent,
    MemoryManagerComponent,
    NavComponent,
    WeaponsModule,
    TemplatesModule,
    PageNotFoundModule,
    ArmiesModule,
  ],
})
export class CoreModule {}
