import { Component, OnInit } from '@angular/core';
import { IParallaxScrollConfig } from 'ngx-parallax-scroll';

@Component({
  selector: 'app-ovni-team',
  templateUrl: './ovni-team.component.html',
  styleUrls: ['./ovni-team.component.scss']
})
export class OvniTeamComponent implements OnInit {

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
  constructor() { }

  ngOnInit(): void {
  }

}
