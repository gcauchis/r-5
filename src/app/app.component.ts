import { ViewChild } from '@angular/core';
import { Component, VERSION } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = "R-5";
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  openMenu() {
    this.trigger.openMenu();
  }
}
