import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { UnitService } from './../unit.service';
import { Unit } from './../entities/unit';
import { ArmyService } from './../army.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { Army } from '../entities/army';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import htmlToPdfmake from "html-to-pdfmake";

@Component({
  selector: 'app-view-army',
  templateUrl: './view-army.component.html',
  styleUrls: ['./view-army.component.css']
})
export class ViewArmyComponent implements OnInit {

  @Input() army:Army;
  units:Unit[] = [];
  unitsCount: any = {};
  
  @ViewChild("armyCard") armyCard: ElementRef;

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

  
  
  public openPDF(): void {
    var html = htmlToPdfmake(this.armyCard.nativeElement.innerHTML, {
      window: window,
      tableAutoSize: true
    });

    console.log(html);
    // on retire la bordure du tableau
    //html[0].layout = 'noBorders';
    // on fait tenir l'image dans une caree de 150
    //html[0].table.body[0][1].stack[0].fit = [150, 150];
  
    pdfMake
      .createPdf({
        content: html,
        styles: {
          "unit-title": {
            bold: true
          },
          "unitcard": {
            width: "100%",
            layout: 'noBorders'
          },
          "unitimg": {
            fit: ['25%', '25%']
          }
        }
      })
      .download(this.army.name + ".pdf");
  }

}
