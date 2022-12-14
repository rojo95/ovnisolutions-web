import { Component, OnInit } from '@angular/core';
import { IParallaxScrollConfig } from 'ngx-parallax-scroll';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
