import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Army } from "./../../../core/models/army";
import { ArmyService } from "./../../../core/services/army.service";

@Component({
  selector: "app-edit-army",
  templateUrl: "./edit-army.component.html",
  styleUrls: ["./edit-army.component.css"],
})
export class EditArmyComponent implements OnInit {
  @Input() army: Army;
  @Output() submited: EventEmitter<Army> = new EventEmitter<Army>();
  @Output() canceled: EventEmitter<any> = new EventEmitter<any>();

  constructor(private armyService: ArmyService) {}

  ngOnInit(): void {}

  submit(): void {
    this.submited.emit(this.army);
  }

  cancel(): void {
    this.canceled.emit();
  }
}
