import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { ImageContainer } from "./../../models/image-container";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: "app-view-imaged",
  templateUrl: "./view-imaged.component.html",
  styleUrls: ["./view-imaged.component.css"],
})
export class ViewImagedComponent implements OnInit {
  @Input() imageContainer: ImageContainer;

  @Input() showPdfButton: boolean = false;
  @Input() pdfName: string = "file";
  @ViewChild("imgCard") imgCard: ElementRef;

  constructor() {}

  ngOnInit(): void {}

  public openPDF(): void {
    var html = htmlToPdfmake(this.imgCard.nativeElement.innerHTML, {
      window: window,
      tableAutoSize: true,
    });

    console.log(html);
    // on retire la bordure du tableau
    html[0].layout = "noBorders";
    // on fait tenir l'image dans une caree de 150
    html[0].table.body[0][1].stack[0].fit = [150, 150];

    pdfMake
      .createPdf({
        content: html,
        styles: {
          "unit-title": {
            bold: true,
          },
        },
      })
      .download(this.pdfName + ".pdf");
  }
}
