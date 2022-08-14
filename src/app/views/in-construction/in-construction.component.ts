import { Component, OnInit } from '@angular/core';
import { faGears } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-in-construction',
  templateUrl: './in-construction.component.html',
  styleUrls: ['./in-construction.component.scss']
})
export class InConstructionComponent implements OnInit {

  gears = faGears;

  constructor() { }

  ngOnInit(): void {
  }

}
