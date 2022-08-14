import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  bars = faBars;
  show:boolean = false;

  public langForm = this.formBuilder.group({
    langControl: new FormControl (localStorage.getItem('lang')||'1', [Validators.required])
  });

  constructor(private formBuilder: FormBuilder) {
    if(!localStorage.getItem('lang')){
      localStorage.setItem('lang','1');
    }
  }

  ngOnInit(): void {
  }

  actionMenu() {
    this.show = !this.show
  }

  changeLang(){}

  getLanguage(){

  }

}
