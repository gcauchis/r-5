import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: "app-dialog-rules-selector",
  templateUrl: "./dialog-rules-selector.component.html",
  styleUrls: ["./dialog-rules-selector.component.css"],
})
export class DialogRulesSelectorComponent implements OnInit {
  rules: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogRulesSelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.rule) {
      data.rule.array.forEach((r) => {
        this.rules.push(r);
      });
    }
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

  ruleSelection(rule: string, checked: boolean) {
    if (checked) this.rules.push(rule);
    else this.rules = this.rules.filter((r) => r != rule);
  }
}
