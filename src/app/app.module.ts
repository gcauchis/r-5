import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";

@NgModule({
  imports: [CoreModule, MatIconModule, MatMenuModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
