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

  frases: string[] = [
    'Ofreciendo los servicios de Diseño gráfico y desarrollo web con el objetivo de potenciar la identidad corporativa. de tu empresa. Somos un un equipo joven, talentoso y destacado en las áreas del diseño e la informática.',
    '¿Está buscando llevar su negocio al siguiente nivel con tecnología de vanguardia? ¡Nosotros somos su aliado! Somos una empresa de Informática que se dedica a acercar la tecnología a las organizaciones.',
    'Ofrecemos servicios de mantenimiento y asesoramiento tecnológico adaptado a las necesidades de cada organización. Aseguramos que sus sistemas informáticos están en manos de un equipo de profesionales dedicados a garantizar su éxito.',
    'Somos una empresa líder en innovación y desarrollo tecnológico, comprometida con la seguridad informática de las organizaciones de todos los tamaños, independientemente de su volumen. ',
    'Ya sea que te encuentres en el sector público o privado, a nivel nacional o internacional, nos adaptamos a tus necesidades para proporcionarte soluciones de seguridad informática personalizadas.',
    'Todo el equipo de ovnisolutios quiere hacerlos saber que ¡los queremos mucho! <3',
  ];

  activeStringIndex = this.randomNumber(0, this.frases.length - 1);
  currentText: string = this.frases[this.activeStringIndex];

  constructor() {}

  ngOnInit(): void {
    this.changeText();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  randomNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  async changeMessage() {
    this.state = 'salir';
    await this.delay(300);
    let lastNum = this.activeStringIndex;
    let num;
    do {
      num = this.randomNumber(0, this.frases.length - 1);
    } while (lastNum === num);
    this.activeStringIndex = num;
    this.currentText = this.frases[this.activeStringIndex];
    await this.delay(300);
    this.state = 'ingresar';
    await this.delay(300);
  }

  changeText() {
    setInterval(async () => {
      this.changeMessage();
    }, 13000);
  }
}
