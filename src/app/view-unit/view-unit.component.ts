import { Weapon } from './../entities/weapon';
import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Unit } from "../entities/unit";
import { EnumUtilsService } from "../enum-utils.service";
import { PriceService } from "../price.service";
import { UnitService } from "../unit.service";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import htmlToPdfmake from "html-to-pdfmake";
import { WeaponType } from '../entities/weapon-type.enum';

@Component({
  selector: "app-view-unit",
  templateUrl: "./view-unit.component.html",
  styleUrls: ["./view-unit.component.scss"]
})
export class ViewUnitComponent implements OnInit {
  @Input() unit: Unit;
  @Input() showPdfButton: boolean = false;

  @ViewChild("unitCard") unitCard: ElementRef;


  constructor(
    public enumUtils: EnumUtilsService,
    public priceService: PriceService,
    public unitService: UnitService
  ) {}

  ngOnInit() {}

  get meleeWeapons(): Weapon[] {
    let result = this.unit.weapons == null ? null : this.unit.weapons.filter(w => w.weaponType == WeaponType.Melee);
    return result == null || result.length <= 0 ? null : result;
  }
  
  get shootWeapons(): Weapon[] {
    let result =  this.unit.weapons == null ? null : this.unit.weapons.filter(w => w.weaponType == WeaponType.Shoot);
    return result == null || result.length <= 0 ? null : result;
  }
  
  get explosiveWeapons(): Weapon[] {
    let result =  this.unit.weapons == null ? null : this.unit.weapons.filter(w => w.weaponType == WeaponType.Explosive);
    return result == null || result.length <= 0 ? null : result;
  }
  
  get grenadeWeapons(): Weapon[] {
    let result =  this.unit.weapons == null ? null : this.unit.weapons.filter(w => w.weaponType == WeaponType.Grenade);
    return result == null || result.length <= 0 ? null : result;
  }

  public openPDF(): void {
    var html = htmlToPdfmake(this.unitCard.nativeElement.innerHTML, {
      window: window,
      tableAutoSize: true
    });
    pdfMake
      .createPdf({
        content: html,
        styles: {
          "unit-title": {
            bold: true
          }
        }
      })
      .download();
  }
}
