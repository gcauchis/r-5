import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Dice } from "./../../../core/enums/dice.enum";
import { MoveType } from "./../../../core/enums/move-type.enum";
import { VehicleType } from "./../../../core/enums/vehicle-type.enum";
import { Vehicle } from "./../../../core/models/vehicle";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";
import { UtilsService } from "./../../../core/services/utils.service";
import { VehicleService } from "./../../../core/services/vehicle.service";

@Component({
  selector: "app-edit-vehicle",
  templateUrl: "./edit-vehicle.component.html",
  styleUrls: ["./edit-vehicle.component.css"],
})
export class EditVehicleComponent implements OnInit {
  @Input() vehicle: Vehicle;
  @Output() submited: EventEmitter<Vehicle> = new EventEmitter<Vehicle>();
  @Output() canceled: EventEmitter<any> = new EventEmitter<any>();
  public form: FormGroup;
  vehicleType: any[];
  moveTypes: any[];
  dices: any[];

  /** Pas terrible mais donne acces dans le template */
  VehicleType = VehicleType;

  factions: string[];
  factionsControl = new FormControl();
  factionsFilteredOptions: Observable<string[]>;

  constructor(
    private utils: UtilsService,
    private enumUtils: EnumUtilsService,
    private vehicleService: VehicleService,
    private fb: FormBuilder
  ) {
    this.vehicleType = this.utils.enumToKeyValue(
      VehicleType,
      this.enumUtils.vehicleTypeToString
    );
    this.moveTypes = this.utils.enumToKeyValue(
      MoveType,
      this.enumUtils.moveTypeToString
    );
    this.dices = this.utils.enumToKeyValue(Dice, this.enumUtils.diceToString);
  }

  ngOnInit(): void {
    this.vehicleService.factions.subscribe((res) => (this.factions = res));
    this.factionsFilteredOptions = this.factionsControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterFaction(value))
    );
    this.form = this.fb.group({
      id: [this.vehicle.id],
      name: [this.vehicle.name],
      faction: [this.vehicle.faction],
      type: [this.vehicle.type],
      moveType: [this.vehicle.moveType],
      tacticalMove: [this.vehicle.tacticalMove],
      structure: [this.vehicle.structure],
      armor: [this.vehicle.armor],
      dc: [this.vehicle.dc],
      crew: [this.vehicle.crew],
      transportSpace: [this.vehicle.transportSpace],
      weapons: [this.vehicle.weapons],
      imgBase64: [this.vehicle.imgBase64],
    });
  }

  private _filterFaction(value: string): string[] {
    const filterFaction = value.toLowerCase();
    return this.factions.filter((faction) =>
      faction.toLowerCase().includes(filterFaction)
    );
  }

  submit(): void {
    this.submited.emit(new Vehicle(this.form.value));
  }

  cancel(): void {
    this.canceled.emit();
  }
}
