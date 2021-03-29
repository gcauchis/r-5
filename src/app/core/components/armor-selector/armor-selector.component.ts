import { Component, Input, OnInit } from "@angular/core";
import { Armor } from "../../models/armor";
import { ArmorService } from "../../services/armor.service";
import { Unit } from "./../../models/unit";

@Component({
  selector: "app-armor-selector",
  templateUrl: "./armor-selector.component.html",
  styleUrls: ["./armor-selector.component.scss"],
})
export class ArmorSelectorComponent implements OnInit {
  @Input() unit: Unit;
  selectableArmors: Armor[];
  displayedColumns: string[] = ["name", "protection", "rule", "affect"];

  constructor(public armorService: ArmorService) {
    this.selectableArmors = this.armorService.getArmors();
  }

  ngOnInit() {}

  setArmor(armor: Armor) {
    this.unit.armor = armor;
  }
}
