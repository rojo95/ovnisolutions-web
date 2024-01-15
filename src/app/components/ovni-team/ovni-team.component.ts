import { Component, OnInit } from '@angular/core';
import { IParallaxScrollConfig } from 'ngx-parallax-scroll';

@Component({
  selector: 'app-ovni-team',
  templateUrl: './ovni-team.component.html',
  styleUrls: ['./ovni-team.component.scss'],
})
export class OvniTeamComponent implements OnInit {
  team: any = [
    {
      id: 1,
      name: 'Johan Román',
      cargos: ['Desarrollador Informático'],
      image: 'PERFIL_JOHAN.webp',
      description:
        'Ingeniero en Informática especializado en el desarrollo de sistemas informáticos, maneja diferentes lenguajes de programación, frameworks, librerías, experiencia en desarrollo tanto front-end como back-end.',
    },
    {
      id: 2,
      name: 'Marian Román',
      cargos: ['Diseñadora Gráfica'],
      image: 'PERFIL_MARIAN.webp',
      description:
        'Creativa y organizada con capacidad de resolución de problemas. Analiza las necesidades del cliente con un panorama al mercado actual para expresar el mensaje visual requerido.',
    },
    {
      id: 3,
      name: 'Gregory Moy',
      cargos: ['Técnico de soporte TIC'],
      image: 'PERFIL_MOY.webp',
      description:
        'Ingeniero en Informática especializado en la asesoría y soporte técnico a los usuarios de las tecnologías de la información y las comunicaciones de las empresas. Conocedor a detalle de los sistemas informáticos, redes, hardware y software.',
    },
  ];

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
  constructor() {}

  ngOnInit(): void {}
}
