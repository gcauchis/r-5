import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./../material/material.module";
import { IconDeleteComponent } from "./components/icon-delete/icon-delete.component";
import { IconEditComponent } from "./components/icon-edit/icon-edit.component";
import { IconFolderComponent } from "./components/icon-folder/icon-folder.component";
import { IconNavComponent } from "./components/icon-nav/icon-nav.component";
import { IconSeeComponent } from "./components/icon-see/icon-see.component";

@NgModule({
  declarations: [
    IconDeleteComponent,
    IconEditComponent,
    IconSeeComponent,
    IconNavComponent,
    IconFolderComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    IconDeleteComponent,
    IconEditComponent,
    IconSeeComponent,
    IconNavComponent,
    IconFolderComponent,
  ],
})
export class IconsModule {}
