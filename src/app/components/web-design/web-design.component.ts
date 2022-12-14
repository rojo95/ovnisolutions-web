import { Component, OnInit } from '@angular/core';
import { IParallaxScrollConfig } from 'ngx-parallax-scroll';

@Component({
  selector: 'app-web-design',
  templateUrl: './web-design.component.html',
  styleUrls: ['./web-design.component.scss']
})
export class WebDesignComponent implements OnInit {

  ParallaxSliderConfBackground: IParallaxScrollConfig = {
    parallaxSpeed: .06,
    parallaxSmoothness: 0,
    parallaxDirection: 'reverse',
    parallaxTimingFunction: 'ease-in',
    parallaxThrottleTime: 0
  };
  ngParallaxConf: IParallaxScrollConfig = {
    parallaxSpeed: .14,
    parallaxSmoothness: 0,
    parallaxDirection: 'reverse',
    parallaxTimingFunction: 'ease-in',
    parallaxThrottleTime: 0
  };
  ngParallaxConf2: IParallaxScrollConfig = {
    parallaxSpeed: .4,
    parallaxSmoothness: 0,
    parallaxDirection: 'reverse',
    parallaxTimingFunction: 'ease-in',
    parallaxThrottleTime: 0
  };

  constructor() { }

  ngOnInit(): void {
  }

}
