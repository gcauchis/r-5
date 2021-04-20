import { NgxMatFileInputModule } from "@angular-material-components/file-input";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatMenuModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    NgxMatFileInputModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "fill" },
    },
  ],
})
export class MaterialModule {}
