import { UnitService } from './../unit.service';
import { Unit } from './../entities/unit';
import { ArmyService } from './../army.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Army } from '../entities/army';

@Component({
  selector: 'app-view-army',
  templateUrl: './view-army.component.html',
  styleUrls: ['./view-army.component.css']
})
export class ViewArmyComponent implements OnInit {

  @Input() army:Army;
  units:Unit[] = [];
  unitsCount: any = {};

  constructor(
    private route: ActivatedRoute,
    public armyService: ArmyService,
    public unitService: UnitService) {

    }

  ngOnInit(): void {
    this.units = [];
    this.unitsCount = {};
    const id = +this.route.snapshot.paramMap.get("idArmy");
    if (id != 0) {
      this.army = this.armyService.get(id);
      if (this.army != null) {
        if (this.army.units != null)
        {
          this.army.units.forEach(link => {
            let unit = this.unitService.get(link.id);
            if (unit != null) {
              this.units.push(unit);
              this.unitsCount[link.id] = link.count;
            }
          })
        }
      }
    }
  }

}
