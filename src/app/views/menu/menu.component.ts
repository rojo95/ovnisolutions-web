import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  bars = faBars;
  show:boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  actionMenu() {
    this.show = !this.show
  }

}
