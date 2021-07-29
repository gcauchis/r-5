import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Army } from "./../../../core/models/army";

@Component({
  selector: "app-edit-army",
  templateUrl: "./edit-army.component.html",
  styleUrls: ["./edit-army.component.css"],
})
export class EditArmyComponent implements OnInit {
  @Input() army: Army;
  @Output() submited: EventEmitter<Army> = new EventEmitter<Army>();
  @Output() canceled: EventEmitter<any> = new EventEmitter<any>();
  public form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [this.army.id],
      name: [this.army.name, [Validators.required, Validators.minLength(2)]],
      desc: [this.army.desc],
      units: [this.army.units],
      vehicles: [this.army.vehicles],
    });
  }

  submit(): void {
    this.submited.emit(new Army(this.form.value));
  }

  cancel(): void {
    this.canceled.emit();
  }
}
