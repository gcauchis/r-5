import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogInterface } from "./../../../core/interfaces/dialog-interface";

@Component({
  selector: "app-basic-dialog",
  templateUrl: "./basic-dialog.component.html",
  styleUrls: ["./basic-dialog.component.css"],
})
export class BasicDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<BasicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogInterface
  ) {}

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }
}
