import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { saveAs } from "file-saver";
import { IdentitfiableInterface } from "../../interfaces/identitfiable-interface";
import { AbstractCrudService } from "../../services/abstract-crud-service";

@Component({
  selector: "app-memory-of-service",
  templateUrl: "./memory-of-service.component.html",
  styleUrls: ["./memory-of-service.component.scss"],
})
export class MemoryOfServiceComponent<T extends IdentitfiableInterface>
  implements OnInit
{
  fileControl: FormControl;
  @Input() service: AbstractCrudService<T>;
  @Input() name: string;
  loadPath: string;

  accept: string = "application/json";

  constructor() {
    this.fileControl = new FormControl(this.loadPath);
  }

  ngOnInit() {
    this.fileControl.valueChanges.subscribe((file: any) => {
      this.loadPath = file;
      const fileReader: FileReader = new FileReader();
      const self = this;
      fileReader.onloadend = function (x) {
        self.service.importData(JSON.parse(String(fileReader.result)));
      };
      fileReader.readAsText(file);
    });
  }

  public resetData(): void {
    // TODO: dialog warn
    this.service.resetData();
  }

  public exportData(fileName = this.name + ".json"): void {
    const content = JSON.stringify(this.service.exportableData);
    const blob = new Blob([content], { type: "application/json" });
    saveAs(blob, fileName);
  }

  public blobToFile(blob: Blob, fileName: string): File {
    const file: any = blob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    file.lastModifiedDate = new Date();
    file.name = fileName;

    //Cast to a File() type
    return <File>blob;
  }

  public importData(): void {
    // TODO
  }
}
