import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { Unit } from "../entities/unit";
import { Dice } from "../entities/dice.enum";
import { UnitType } from "../entities/unit-type.enum";
import { TacticalRole } from "../entities/tactical-role.enum";
import { UnitSize } from "../entities/unit-size.enum";
import { MoveType } from "../entities/move-type.enum";
import { EnumUtilsService } from "../enum-utils.service";
import { PriceService } from "../price.service";
import { UnitService } from "../unit.service";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import htmlToPdfmake from "html-to-pdfmake";

@Component({
  selector: "app-view-unit",
  templateUrl: "./view-unit.component.html",
  styleUrls: ["./view-unit.component.css"]
})
export class ViewUnitComponent implements OnInit {
  @Input() unit: Unit = {
    id: 1,
    name: "Name1",
    desc: "Embedded",
    dqm: Dice.D6,
    dc: Dice.D6,
    pv: 5,
    unitType: UnitType.Alive,
    size: UnitSize.Standard,
    moveType: MoveType.Ground,
    tacticalMove: 8,
    tacticalRole: TacticalRole.Troop,
    mageLevel: 0,
    weapons: null
  };

  @ViewChild("unitCard") unitCard: ElementRef;

  constructor(
    public enumUtils: EnumUtilsService,
    public priceService: PriceService,
    public unitService: UnitService
  ) {}

  ngOnInit() {}

  public openPDF(): void {
    var html = htmlToPdfmake(this.unitCard.nativeElement.innerHTML, {
      window: window,
      tableAutoSize: true
    });
    console.log(JSON.stringify(html, null, 2));
    pdfMake
      .createPdf({
        content: html,
        styles: {
          "unit-title": {
            bold: true
          }
        }
      })
      .open();
  }
}
