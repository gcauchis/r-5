import { ArmyService } from './../army.service';
import { UnitService } from './../unit.service';
import { WeaponService } from './../weapon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-memory-manager',
  templateUrl: './memory-manager.component.html',
  styleUrls: ['./memory-manager.component.scss']
})
export class MemoryManagerComponent implements OnInit {

  constructor(public weaponService:WeaponService,
            public unitService:UnitService,
            public armyService:ArmyService) { }

  ngOnInit() {
  }

}
