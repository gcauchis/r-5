import { Location } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Dice } from "./../../../core/enums/dice.enum";
import { MoveType } from "./../../../core/enums/move-type.enum";
import { VehicleType } from "./../../../core/enums/vehicle-type.enum";
import { Vehicle } from "./../../../core/models/vehicle";
import { Weapon } from "./../../../core/models/weapon";
import { EnumUtilsService } from "./../../../core/services/enum-utils.service";
import { UtilsService } from "./../../../core/services/utils.service";
import { VehicleService } from "./../../../core/services/vehicle.service";
import { BasicDialogComponent } from "./../../../shared/components/basic-dialog/basic-dialog.component";
import { DialogRulesSelectorComponent } from "./../../../weapons/components/dialog-rules-selector/dialog-rules-selector.component";

@Component({
  selector: "app-edit-vehicle",
  templateUrl: "./edit-vehicle.component.html",
  styleUrls: ["./edit-vehicle.component.css"],
})
export class EditVehicleComponent implements OnInit {
  @Input() vehicle: Vehicle;
  @Output() submited: EventEmitter<Vehicle> = new EventEmitter<Vehicle>();
  vehicleType: any[];
  moveTypes: any[];
  dices: any[];

  /** Pas terrible mais donne acces dans le template */
  VehicleType = VehicleType;

  factions: string[];
  factionsControl = new FormControl();
  factionsFilteredOptions: Observable<string[]>;

  displayedWeaponColumns: string[] = ["weapon", "remove"];

  constructor(
    private route: ActivatedRoute,
    private utils: UtilsService,
    public enumUtils: EnumUtilsService,
    private location: Location,
    private vehicleService: VehicleService,
    public dialog: MatDialog
  ) {
    this.vehicleType = this.utils.enumToKeyValue(
      VehicleType,
      enumUtils.vehicleTypeToString
    );
    this.moveTypes = this.utils.enumToKeyValue(
      MoveType,
      enumUtils.moveTypeToString
    );
    this.dices = this.utils.enumToKeyValue(Dice, enumUtils.diceToString);
  }

  ngOnInit(): void {
    this.factions = this.vehicleService.getFactions();
    this.factionsFilteredOptions = this.factionsControl.valueChanges.pipe(
      startWith(""),
      map((value) => this._filterFaction(value))
    );
  }

  private _filterFaction(value: string): string[] {
    const filterFaction = value.toLowerCase();
    return this.factions.filter((faction) =>
      faction.toLowerCase().includes(filterFaction)
    );
  }

  removeWeapon(weapon: Weapon): void {
    this.vehicle.weapons = this.vehicle.weapons.filter((r) => r != weapon);
  }

  addWeapon(weapon: Weapon) {
    if (this.vehicle.weapons.length >= this.vehicle.crew) {
      this.dialog.open(BasicDialogComponent, {
        data: {
          title: "Armes",
          message: `Pas plus de ${this.vehicle.crew} armes`,
          cancel: false,
          ok: true,
        },
      });
    } else {
      if (weapon.rule && weapon.rule.length > 0) {
        const dialogRef = this.dialog.open(DialogRulesSelectorComponent, {
          data: {
            title: `Choisisez les règles pour ${weapon.name}`,
            rules: weapon.rule,
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
            weapon.rule = result;
            this.vehicle.weapons.push(weapon);
          }
        });
      } else {
        this.vehicle.weapons.push(weapon);
      }
    }
  }

  save(): void {
    this.submited.emit(this.vehicle);
  }

  goBack(): void {
    this.location.back();
  }
}
