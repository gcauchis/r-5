import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "./../material/material.module";
import { TemplateContainerComponent } from "./components/template-container/template-container.component";
import { TemplateDialogComponent } from "./components/template-dialog/template-dialog.component";
import { TemplateFullWidthComponent } from "./components/template-full-width/template-full-width.component";

@NgModule({
  declarations: [
    TemplateFullWidthComponent,
    TemplateContainerComponent,
    TemplateDialogComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    TemplateFullWidthComponent,
    TemplateContainerComponent,
    TemplateDialogComponent,
  ],
})
export class TemplatesModule {}
