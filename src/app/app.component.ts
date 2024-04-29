import { Component, ViewChild } from '@angular/core';
import { HomeComponent } from './views/home/home.component';

import {
  NgbDatepickerModule,
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(HomeComponent) home: any;

  title = 'ovnisolution';

  idioma: any = [];

  loaded: boolean = false;

  scrollNav(id: number): void {
    this.home.scrollToElement(id);
  }

  // window.addEventListener('DOMContentLoaded', function(ev) { //Haz lo que quieras cuando cargue el DOM });

  ngOnInit(): void {
    // this.loaded = true;
  }
}
