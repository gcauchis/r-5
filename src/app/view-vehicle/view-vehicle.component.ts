import { VehicleType } from './../entities/vehicle-type.enum';
import { VehicleService } from './../vehicle.service';
import { PriceService } from './../price.service';
import { EnumUtilsService } from './../enum-utils.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Vehicle } from '../entities/vehicle';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  
  @Input() vehicle: Vehicle;
  @Input() showPdfButton: boolean = false;

  VehicleType = VehicleType;


  constructor(
    private route: ActivatedRoute,
    public enumUtils: EnumUtilsService,
    public priceService: PriceService,
    public vehicleService: VehicleService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    if (id != 0) {
      this.vehicle = this.vehicleService.get(id);
    }
  }

}
