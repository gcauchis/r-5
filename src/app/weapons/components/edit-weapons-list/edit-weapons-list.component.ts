import { Component, Input, OnInit, Output } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject } from "rxjs";
import { CombatUnitInterface } from "./../../../core/interfaces/combat-unit-interface";
import { Weapon } from "./../../../core/models/weapon";
import { DialogRulesSelectorComponent } from "./../dialog-rules-selector/dialog-rules-selector.component";

@Component({
  selector: "app-edit-weapons-list",
  templateUrl: "./edit-weapons-list.component.html",
  styleUrls: ["./edit-weapons-list.component.scss"],
})
export class EditWeaponsListComponent implements OnInit {
  @Input() public combatUnit: CombatUnitInterface;
  @Output() public onWeaponsChanged: BehaviorSubject<Weapon[]> =
    new BehaviorSubject([]);

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    if (this.combatUnit) this.onWeaponsChanged.next(this.combatUnit.weapons);
  }

  removeWeapon(weapon: Weapon): void {
    this.onWeaponsChanged.next(
      this.onWeaponsChanged.value.filter((r) => r != weapon)
    );
  }

  addWeapon(weapon: Weapon) {
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
          this.onWeaponsChanged.value.push(weapon);
          this.onWeaponsChanged.next(this.onWeaponsChanged.value);
        }
      });
    } else {
      this.onWeaponsChanged.value.push(weapon);
      this.onWeaponsChanged.next(this.onWeaponsChanged.value);
    }
  }
}
