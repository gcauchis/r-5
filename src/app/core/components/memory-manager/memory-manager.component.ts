import { Component } from "@angular/core";
import { VehicleService } from "../../services/vehicle.service";
import { ArmyService } from "./../../services/army.service";
import { UnitService } from "./../../services/unit.service";
import { WeaponService } from "./../../services/weapon.service";

@Component({
  selector: "app-memory-manager",
  templateUrl: "./memory-manager.component.html",
  styleUrls: ["./memory-manager.component.scss"],
})
export class MemoryManagerComponent {
  constructor(
    public weaponService: WeaponService,
    public unitService: UnitService,
    public vehicleService: VehicleService,
    public armyService: ArmyService
  ) {}
}
