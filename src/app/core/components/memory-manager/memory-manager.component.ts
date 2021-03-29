import { Component, OnInit } from "@angular/core";
import { ArmyService } from "./../../services/army.service";
import { UnitService } from "./../../services/unit.service";
import { WeaponService } from "./../../services/weapon.service";

@Component({
  selector: "app-memory-manager",
  templateUrl: "./memory-manager.component.html",
  styleUrls: ["./memory-manager.component.scss"],
})
export class MemoryManagerComponent implements OnInit {
  constructor(
    public weaponService: WeaponService,
    public unitService: UnitService,
    public armyService: ArmyService
  ) {}

  ngOnInit() {}
}
