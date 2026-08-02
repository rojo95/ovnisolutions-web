import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IParallaxScrollConfig } from '../../directives/ngx-parallax-scroll.directive';

@Component({
    selector: 'app-web-design',
    templateUrl: './web-design.component.html',
    styleUrls: ['./web-design.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
