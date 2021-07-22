import { Component, Input, OnInit } from "@angular/core";
import { CombatUnitInterface } from "./../../../core/interfaces/combat-unit-interface";
import { Weapon } from "./../../../core/models/weapon";

@Component({
  selector: "app-edit-weapons-list",
  templateUrl: "./edit-weapons-list.component.html",
  styleUrls: ["./edit-weapons-list.component.scss"],
})
export class EditWeaponsListComponent implements OnInit {
  @Input() public combatUnit: CombatUnitInterface;

  constructor() {}

  ngOnInit() {}

  removeWeapon(weapon: Weapon): void {
    this.combatUnit.weapons = this.combatUnit.weapons.filter(
      (r) => r != weapon
    );
  }
}
