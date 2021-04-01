import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { ImageContainerInterface } from "./../../../core/interfaces/image-container-interface";

@Component({
  selector: "app-view-imaged",
  templateUrl: "./view-imaged.component.html",
  styleUrls: ["./view-imaged.component.css"],
})
export class ViewImagedComponent implements OnInit {
  @Input() imageContainer: ImageContainerInterface;
  @Input() pdfName: string = "file";
  @ViewChild("imgCard") imgCard: ElementRef;

  constructor() {}

  ngOnInit(): void {}
}
