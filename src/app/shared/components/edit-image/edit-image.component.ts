import { MaxSizeValidator } from "@angular-material-components/file-input";
import { Component, Input, OnInit, Output } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { ImageContainerInterface } from "./../../../core/interfaces/image-container-interface";

@Component({
  selector: "app-edit-image",
  templateUrl: "./edit-image.component.html",
  styleUrls: ["./edit-image.component.scss"],
})
export class EditImageComponent implements OnInit {
  fileControl: FormControl;
  @Input() imageContainer: ImageContainerInterface;
  @Output() onImageBase64Change: BehaviorSubject<any> = new BehaviorSubject(
    null
  );
  public imgBase64: any = null;
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
    this.imgBase64 = this.imageContainer.imgBase64;
    this.onImageBase64Change.next(this.imgBase64);

    this.fileControl.valueChanges.subscribe((file: any) => {
      this.imgPath = file;
      let fileReader: FileReader = new FileReader();
      let self = this;
      fileReader.onloadend = function (x) {
        let blob = new Blob([fileReader.result], { type: file.type });
        var readerBlob = new FileReader();
        readerBlob.readAsDataURL(blob);
        readerBlob.onloadend = function () {
          self.imgBase64 = readerBlob.result;
          self.onImageBase64Change.next(self.imgBase64);
        };
      };
      fileReader.readAsArrayBuffer(file);
    });
  }

  removeImage(): void {
    this.imgPath = "";
    this.imgBase64 = null;
    this.onImageBase64Change.next(this.imgBase64);
  }
}
