import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogInterface } from "./../../../core/interfaces/dialog-interface";

@Component({
  selector: "app-basic-dialog",
  templateUrl: "./basic-dialog.component.html",
})
export class BasicDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BasicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInterface
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
