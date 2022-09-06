import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IParallaxScrollConfig } from 'ngx-parallax-scroll';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('home', { static: true }) home!: ElementRef;
  @ViewChild('team', { static: true }) team!: ElementRef;
  @ViewChild('services', { static: true }) services!: ElementRef;
  @ViewChild('projects', { static: true }) projects!: ElementRef;
  @ViewChild('contact', { static: true }) contact!: ElementRef;

  ngParallaxConf: IParallaxScrollConfig = {
    parallaxSpeed: .14,
    parallaxSmoothness: 0,
    parallaxDirection: 'reverse',
    parallaxTimingFunction: 'ease-in',
    parallaxThrottleTime: 0
  };

  ParallaxSliderConfBackground: IParallaxScrollConfig = {
    parallaxSpeed: .06,
    parallaxSmoothness: 0,
    parallaxDirection: 'reverse',
    parallaxTimingFunction: 'ease-in',
    parallaxThrottleTime: 0
  };
  ParallaxSliderConfMoon: IParallaxScrollConfig = {
    parallaxSpeed: .1,
    parallaxSmoothness: 0,
    parallaxDirection: 'reverse',
    parallaxTimingFunction: 'ease-in',
    parallaxThrottleTime: 0
  };
  ParallaxSliderConfOvni: IParallaxScrollConfig = {
    parallaxSpeed: .5,
    parallaxSmoothness: 0,
    parallaxDirection: 'reverse',
    parallaxTimingFunction: 'ease-in',
    parallaxThrottleTime: 0
  };
  ParallaxSliderConfPlanet: IParallaxScrollConfig = {
    parallaxSpeed: .15,
    parallaxSmoothness: 0,
    parallaxDirection: 'normal',
    parallaxTimingFunction: 'ease-in',
    parallaxThrottleTime: 0
  };

  constructor( ) { }

  ngOnInit(): void {
  }

  /**
   * funcion para realizar la navegacion de scroll, escuchado por el app-component principal
   * @param id identificador que indica cual elemento debe seleccionar
   */
  scrollToElement(id: number): void {

    const home = this.home.nativeElement;
    const team = this.team.nativeElement;
    const services = this.services.nativeElement;
    const projects = this.projects.nativeElement;
    const contact = this.contact.nativeElement;

    let elem = id== 1 ? home : id == 2 ? team : id == 3 ? services : id == 4 ? projects : id == 5 ? contact : null;

    console.log('Element: ',elem);
    if(elem) {
      elem.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
  }

}
