import { MaxSizeValidator } from "@angular-material-components/file-input";
import { Component, Input, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ImageContainer } from "../../interfaces/image-container";

@Component({
  selector: "app-edit-image",
  templateUrl: "./edit-image.component.html",
  styleUrls: ["./edit-image.component.scss"],
})
export class EditImageComponent implements OnInit {
  fileControl: FormControl;
  @Input() imageContainer: ImageContainer;
  maxSize = 16 * 1024;
  imgPath: string;

  accept: string = "image/*";

  constructor() {
    this.fileControl = new FormControl(this.imgPath, [
      Validators.required,
      MaxSizeValidator(this.maxSize * 1024),
    ]);
  }

  ngOnInit() {
    this.fileControl.valueChanges.subscribe((file: any) => {
      this.imgPath = file;
      let fileReader: FileReader = new FileReader();
      let self = this;
      fileReader.onloadend = function (x) {
        let blob = new Blob([fileReader.result], { type: file.type });
        var readerBlob = new FileReader();
        readerBlob.readAsDataURL(blob);
        readerBlob.onloadend = function () {
          self.imageContainer.imgBase64 = readerBlob.result;
        };
      };
      fileReader.readAsArrayBuffer(file);
    });
  }

  removeImage(): void {
    this.imgPath = "";
    this.imageContainer.imgBase64 = null;
  }
}
