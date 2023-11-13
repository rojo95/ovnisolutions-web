import { Component, OnInit } from '@angular/core';
import { IParallaxScrollConfig } from 'ngx-parallax-scroll';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('aniText', [
      state(
        'ingresar',
        style({
          opacity: 1,
          transform: 'translateX(0px)',
        })
      ),
      state(
        'salir',
        style({
          opacity: 0,
          transform: 'translateX(100px)',
        })
      ),
      transition('ingresar => salir', [
        animate(
          300,
          keyframes([
            style({
              opacity: 1,
              transform: 'translateX(0px)',
              offset: 0,
            }),
            style({
              opacity: 0,
              transform: 'translateX(100px)',
              offset: 1,
            }),
          ])
        ),
      ]),
      transition('salir => ingresar', [
        animate(
          300,
          keyframes([
            style({
              opacity: 0,
              transform: 'translateX(100px)',
              offset: 0,
            }),
            style({
              opacity: 1,
              transform: 'translateX(0px)',
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  ParallaxSliderConfBackground: IParallaxScrollConfig = {
    parallaxSpeed: 0.06,
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

  public state: string = 'ingresar';

  frases:string[] = [
    'Ofreciendo los servicios de Diseño gráfico y desarrollo web con el objetivo de potenciar la identidad corporativa. de tu empresa. Somos un un equipo joven, talentoso y destacado en las áreas del diseño e la informática.',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam eos ratione harum delectus vel temporibus exercitationem qui, provident velit nisi aut corporis deserunt recusandae? Iste temporibus molestias neque similique exercitationem!',
    'lorem 2',
    'Lorem 3',
  ];
  activeStringIndex = 0;
  currentText: string = this.frases[this.activeStringIndex];

  constructor() {}

  ngOnInit(): void {
    this.changeText();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  changeText() {
    setInterval(async () => {
      this.state = 'ingresar';
      await this.delay(9500);
      this.state = 'salir';
      await this.delay(300);
      this.activeStringIndex =
        (this.activeStringIndex + 1) % this.frases.length;
      this.currentText = this.frases[this.activeStringIndex];
    }, 11000);
  }
}
