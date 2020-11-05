import { Component, OnInit, Input } from "@angular/core";
import { ArmorService } from "../armor.service";
import { Armor } from "../entities/armor";
import { Unit } from "../entities/unit";

@Component({
  selector: "app-armor-selector",
  templateUrl: "./armor-selector.component.html",
  styleUrls: ["./armor-selector.component.scss"]
})
export class ArmorSelectorComponent implements OnInit {
  @Input() unit: Unit;
  selectableArmors: Armor[];
  displayedColumns: string[] = [ 'name', 'protection', 'rule', 'affect' ];

  constructor(public armorService: ArmorService) {
    this.selectableArmors = this.armorService.getArmors();
  }

  ngOnInit() {
  }

  setArmor(armor:Armor) {
    this.unit.armor = armor;
  }
}
