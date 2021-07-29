import { Component, Input, OnInit, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";
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
  @Output() onArmorSelectionChange: BehaviorSubject<Armor> =
    new BehaviorSubject(null);

  constructor(private armorService: ArmorService) {}

  ngOnInit() {
    this.onArmorSelectionChange.next(this.unit.armor);
    this.armorService.collection.subscribe(
      (res) => (this.selectableArmors = res)
    );
  }

  setArmor(armor: Armor) {
    this.onArmorSelectionChange.next(armor);
  }
}
