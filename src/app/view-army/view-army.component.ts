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

    // console.log(html);
    this.changeHtmlPdfValueRecursively(html);
    // console.log(html);
    
    pdfMake
      .createPdf({
        content: html,
        styles: {
          "unit-title": {
            bold: true
          },
          "unit-number": {
            margin: [ 80, 0, 0, 0]
          }/*,
          "unit-div": {
            margin: [ 0, 0, 0, 30]
          }*/
        }
      })
      .download(this.army.name + ".pdf");
  }

  /**
   * Format the given pdfMake html content recursively.
   * 
   * @param html an array of elements
   */
  private changeHtmlPdfValueRecursively(html: any): void {
    for (const props in html) {
      let element = html[props];
      if (element.nodeName) {

        if (element.style && element.style instanceof Array) {
          let styles: string[] = element.style;
          if (styles.indexOf("imgcard") >= 0 && element.nodeName == "TABLE") {
            element.layout = 'noBorders';
          }
          if (styles.indexOf("imgview") >= 0 && element.nodeName == "IMG") {
            element.fit = [150, 150];
          }
          /*if (styles.indexOf("unit-number") >= 0) {
            element.margin = [80, 0, 0, 0];
          }
          if (styles.indexOf("unit-div") >= 0 && element.nodeName == "DIV") {
            element.margin = [0, 0, 0, 30];
          }*/
        }
        if (element.stack) {
          this.changeHtmlPdfValueRecursively(element.stack);
        } else if (element.text) {
          this.changeHtmlPdfValueRecursively(element.text);
        }
        // two dim tab
        if (element.table && element.table.body) {
          for (const bodyProps in element.table.body) {
            this.changeHtmlPdfValueRecursively(element.table.body[bodyProps]);
          }
        }
      }
    }
  }

}
