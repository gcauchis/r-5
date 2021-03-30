import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "./../shared/shared.module";
import { ArmorsRoutingModule } from "./armors-routing.module";
import { ArmorSelectorComponent } from "./components/armor-selector/armor-selector.component";

@NgModule({
  declarations: [ArmorSelectorComponent],
  imports: [CommonModule, ArmorsRoutingModule, SharedModule],
  exports: [ArmorSelectorComponent],
})
export class ArmorsModule {}
