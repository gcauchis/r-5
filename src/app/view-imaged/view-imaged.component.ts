import { element } from 'protractor';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ImageContainer } from './../entities/image-container';
import { Component, Input, OnInit } from '@angular/core';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import htmlToPdfmake from "html-to-pdfmake";

@Component({
  selector: 'app-view-imaged',
  templateUrl: './view-imaged.component.html',
  styleUrls: ['./view-imaged.component.css']
})
export class ViewImagedComponent implements OnInit {
  
  @Input() imageContainer: ImageContainer

  @Input() showPdfButton: boolean = false;
  @Input() pdfName: string = "file";
  @ViewChild("imgCard") imgCard: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }
  
  public openPDF(): void {
    var html = htmlToPdfmake(this.imgCard.nativeElement.innerHTML, {
      window: window,
      tableAutoSize: true
    });

    console.log(html);
    // on retire la bordure du tableau
    html[0].layout = 'noBorders';
    // on fait tenir l'image dans une caree de 150
    html[0].table.body[0][1].stack[0].fit = [150, 150];
  
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
      .download(this.pdfName + ".pdf");
  }

}
