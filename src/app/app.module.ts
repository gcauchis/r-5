import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";

@NgModule({
  imports: [CoreModule, AppRoutingModule, MatIconModule, MatMenuModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
