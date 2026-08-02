import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { faGears } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-in-construction',
    templateUrl: './in-construction.component.html',
    styleUrls: ['./in-construction.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class InConstructionComponent implements OnInit {

  gears = faGears;

  constructor() { }

  ngOnInit(): void {
  }

}
