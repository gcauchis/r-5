import { ArmyService } from './../army.service';
import { Location } from '@angular/common';
import { UnitService } from './../unit.service';
import { EnumUtilsService } from './../enum-utils.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Army } from '../entities/army';

@Component({
  selector: 'app-edit-army',
  templateUrl: './edit-army.component.html',
  styleUrls: ['./edit-army.component.scss']
})
export class EditArmyComponent implements OnInit {

  @Output() army: Army;

  constructor(
    private route: ActivatedRoute,
    public enumUtils:EnumUtilsService,
    private armyService: ArmyService,
    private location: Location) { }

  ngOnInit() {
    this.getArmy();
  }

  getArmy(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id == 0) {
      this.army = this.buildBaseArmy();
    } else {
      this.army = this.armyService.get(id);
      if (this.army == null) {
        this.army = this.buildBaseArmy();
      }
    }
  }

  private buildBaseArmy(): Army {
    let army = new Army();
    army.name = "Nouvelle armée";
    army.units = [];
    army.vehicles = [];
    return army;
  }
  
  save(): void {
    this.armyService.save(this.army);
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

}
