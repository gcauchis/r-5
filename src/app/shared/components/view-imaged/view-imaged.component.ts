import { Component, ElementRef, Input, ViewChild } from "@angular/core";
import { ImageContainerInterface } from "./../../../core/interfaces/image-container-interface";

@Component({
  selector: "app-view-imaged",
  templateUrl: "./view-imaged.component.html",
  styleUrls: ["./view-imaged.component.scss"],
})
export class ViewImagedComponent {
  @Input() imageContainer: ImageContainerInterface;
  @Input() pdfName: string = "file";
  @ViewChild("imgCard") imgCard: ElementRef;
}
