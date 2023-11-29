import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  constructor() {}
  active = 2;

  data: any = {
    des: [
      {
        id: 1,
        title: 'Identidad Corporativa',
        image: 'background-section',
      },
      {
        id: 2,
        title: 'Diseño publicitario',
        image: 'background-section',
      },
      {
        id: 3,
        title: 'Diseño editorial',
        image: 'background-section',
      },
    ],
    devs: [
      {
        id: 1,
        title: 'Landing Page',
        image: 'dhyana_thumb',
        href: 'https://rojo95.github.io/dhyana/',
      },
      {
        id: 2,
        title: 'One page',
        image: 'barberia-El-Imperial_thumb',
        href: 'https://rojo95.github.io/barberia-el-imperial-static/',
      },
      {
        id: 3,
        title: 'Aplicaciones Telefónicas',
        image: 'ionic_thumb',
        href: 'https://rojo95.github.io/ionic-app/',
      },
    ],
  };

  onMouseOver(event: MouseEvent): void {
    const activeElement = event.target as HTMLElement;

    this.changeLetters(activeElement);
  }

  interval: any;
  name: any;

  changeLetters(element: HTMLElement) {
    // Este código define todas las letras mayúsculas del alfabeto inglés en una cadena
    const letters: string = 'ABCDEFGHIJKLMNOÑ@PQRSTUVWXYZ';
    // Inicializar la variable intervalo como null
    this.interval = null;
    if (element.classList.contains('name')) {
      const elementos = element.getAttribute('data-value');
      // Inicializar el contador de iteración en 0
      let iteration = 0;
      // Limpiar el intervalo si ya había uno establecido
      clearInterval(this.interval);
      // Establecer un nuevo intervalo que se ejecuta cada 30 milisegundos
      this.interval = setInterval(() => {
        // Cambiar el texto en el elemento ".name"
        this.name = this.name
          .split('')
          .map((letter: string, index: any) => {
            // Si el índice es menor que la iteración, devolver la letra correspondiente del data-value
            if (index < iteration) {
              return this.name.dataset.value[index];
            }

            // De lo contrario, devolver una letra aleatoria de la cadena de letras
            return letters[Math.floor(Math.random() * 26)];
          })
          .join(''); // Unir el array de caracteres en una cadena de texto

        // Si la iteración es mayor o igual que la longitud del data-value, limpiar el intervalo
        if (iteration >= this.name.dataset.value.length) {
          clearInterval(this.interval);
        }

        //   // Incrementar la iteración en 1/3
        //   iteration += 1 / 3;
      }, 30);
    }
  }

  ngOnInit(): void {}
}
