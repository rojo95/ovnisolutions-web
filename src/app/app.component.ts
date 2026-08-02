import { Component, ChangeDetectionStrategy } from '@angular/core';

import {
  NgbDatepickerModule,
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent {
  title = 'ovnisolution';

  idioma: any = [];

  loaded: boolean = false;

  // window.addEventListener('DOMContentLoaded', function(ev) { //Haz lo que quieras cuando cargue el DOM });

  ngOnInit(): void {
    // this.loaded = true;
  }
}
