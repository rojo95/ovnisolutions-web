import { Component, OnInit } from '@angular/core';
import { IParallaxScrollConfig } from 'ngx-parallax-scroll';

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.scss']
})
export class DevelopmentComponent implements OnInit {

  ParallaxSliderConfBackground: IParallaxScrollConfig = {
    parallaxSpeed: .06,
    parallaxSmoothness: 0,
    parallaxDirection: 'reverse',
    parallaxTimingFunction: 'ease-in',
    parallaxThrottleTime: 0
  };

  ParallaxConfPC: IParallaxScrollConfig = {
    parallaxSpeed: .2,
    parallaxSmoothness: 0,
    parallaxDirection: 'reverse',
    parallaxTimingFunction: 'fade-in',
    parallaxThrottleTime: 0
  };
  ParallaxConfPhone: IParallaxScrollConfig = {
    parallaxSpeed: .1,
    parallaxSmoothness: 0,
    parallaxDirection: 'reverse',
    parallaxTimingFunction: 'fade-in',
    parallaxThrottleTime: 0
  };

  constructor() { }

  ngOnInit(): void {
  }

}
