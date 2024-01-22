import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  constructor() {}

  services: any[] = [
    {
      id: 1,
      image: 'branding.png',
      title: 'Branding Digital',
      description:
        'Diseño de identidad corporativa y material gráfico digital para tu empresa o pequeño negocio.',
    },
    {
      id: 2,
      image: 'packages.png',
      title: 'Diseño de Empaque',
      description:
        'Estrategias de diseño para diferenciarse de otras a través de un diseño personalizado de packaging o envoltorios de productos.',
    },
    {
      id: 3,
      image: 'social.png',
      title: 'Llevamos tus Redes Sociales',
      description:
        'Identificación y análisis del público objetivo mediante estrategias para ofrecer el producto o servicio.',
    },
    {
      id: 4,
      image: 'development.png',
      title: 'Desarrollo Web',
      description:
        'Desarrollos web simples o complejas, desde cero y totalmente a medida.',
    },
    {
      id: 5,
      image: 'apps.png',
      title: 'Aplicaciones Móviles',
      description:
        'Diseño de experiencia de usuario y de interfaces para aplicaciones móviles.',
    },
    {
      id: 6,
      image: 'advisory.png',
      title: 'Asesoría',
      description:
        'Orientación para conseguir que se cumplan los objetivos de tu empresa.',
    },
  ];

  ngOnInit(): void {}
}
