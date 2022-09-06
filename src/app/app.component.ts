import { Component,ViewChild } from '@angular/core';
import { HomeComponent } from './views/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild(HomeComponent) home: any;

  title = 'ovnisolution';

  idioma:any = [];

  scrollNav(id: number) :void {
    this.home.scrollToElement(id);
  }

}
