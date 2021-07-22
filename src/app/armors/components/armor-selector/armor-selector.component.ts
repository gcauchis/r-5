import { Component, Input, OnInit } from "@angular/core";
import { Armor } from "./../../../core/models/armor";
import { Unit } from "./../../../core/models/unit";
import { ArmorService } from "./../../../core/services/armor.service";

@Component({
  selector: "app-armor-selector",
  templateUrl: "./armor-selector.component.html",
  styleUrls: ["./armor-selector.component.scss"],
})
export class ArmorSelectorComponent implements OnInit {
  @Input() unit: Unit;
  selectableArmors: Armor[];
  displayedColumns: string[] = ["name", "protection", "rule", "affect"];

  constructor(private armorService: ArmorService) {}

  ngOnInit() {
    this.armorService.collection.subscribe(
      (res) => (this.selectableArmors = res)
    );
  }

  setArmor(armor: Armor) {
    this.unit.armor = armor;
  }
}
