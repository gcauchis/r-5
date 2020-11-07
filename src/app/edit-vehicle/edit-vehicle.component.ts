import { ActivatedRoute } from '@angular/router';
import { VehicleService } from './../vehicle.service';
import { UtilsService } from './../utils.service';
import { MoveType } from './../entities/move-type.enum';
import { Dice } from './../entities/dice.enum';
import { Component, OnInit, Output } from '@angular/core';
import { Vehicle } from '../entities/vehicle';
import { EnumUtilsService } from '../enum-utils.service';
import { VehicleType } from '../entities/vehicle-type.enum';
import { Location } from "@angular/common";

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit {

  @Output() vehicle:Vehicle;
  vehicleType:any[];
  moveTypes: any[];
  dices: any[];
  
  /** Pas terrible mais donne acces dans le template */
  VehicleType = VehicleType;

  constructor(
    private route: ActivatedRoute,
    private utils: UtilsService,
    public enumUtils:EnumUtilsService,
    private location: Location,
    private vehicleService:VehicleService) {
      this.vehicleType = this.utils.enumToKeyValue(VehicleType, enumUtils.vehicleTypeToString);
      this.moveTypes = this.utils.enumToKeyValue(MoveType, enumUtils.moveTypeToString);
      this.dices = this.utils.enumToKeyValue(Dice, enumUtils.diceToString);
     }

  ngOnInit() {
    this.getVehicle();
  }

  getVehicle(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id == 0) {
      this.vehicle = this.buildBaseVehicle();
    } else {
      this.vehicle = this.vehicleService.get(id);
      if (this.vehicle == null) {
        this.vehicle = this.buildBaseVehicle();
      }
    }
  }

  private buildBaseVehicle(): Vehicle {
    let vehicle = new Vehicle();
    vehicle.armor = Dice.D8;
    vehicle.structure = 1;
    vehicle.type = VehicleType.Tank;
    return vehicle;
  }

  save(): void {
    this.vehicleService.save(this.vehicle);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }
}
