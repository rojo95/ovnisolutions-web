import { Component, OnInit } from '@angular/core';
import { IParallaxScrollConfig } from 'ngx-parallax-scroll';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  ParallaxSliderConfBackground: IParallaxScrollConfig = {
    parallaxSpeed: 0.06,
    parallaxSmoothness: 0,
    parallaxDirection: 'reverse',
    parallaxTimingFunction: 'ease-in',
    parallaxThrottleTime: 0,
  };
  ParallaxSliderConfMoon: IParallaxScrollConfig = {
    parallaxSpeed: 0.1,
    parallaxSmoothness: 0,
    parallaxDirection: 'reverse',
    parallaxTimingFunction: 'ease-in',
    parallaxThrottleTime: 0,
  };
  ParallaxSliderConfOvni: IParallaxScrollConfig = {
    parallaxSpeed: 0.5,
    parallaxSmoothness: 0,
    parallaxDirection: 'reverse',
    parallaxTimingFunction: 'ease-in',
    parallaxThrottleTime: 0,
  };
  ParallaxSliderConfPlanet: IParallaxScrollConfig = {
    parallaxSpeed: 0.15,
    parallaxSmoothness: 0,
    parallaxDirection: 'normal',
    parallaxTimingFunction: 'ease-in',
    parallaxThrottleTime: 0,
  };

  constructor() {}

  ngOnInit(): void {}
}
