import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { UiModule } from "./ui/ui.module";

@NgModule({
  imports: [CoreModule, AppRoutingModule, UiModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
