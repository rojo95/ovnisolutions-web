import { Component, OnInit } from '@angular/core';
import { GalleryItem, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {
  constructor() {}
  imagenes = [
    {
      src: 'logotipos.webp',
      thumb: 'logotipos.webp',
    },
    {
      src: '4Mesa-de-trabajo-1-20.webp',
      thumb:
        '4Mesa-de-trabajo-1-20.webp',
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni delectus, porro distinctio rerum dignissimos labore optio dolorem reiciendis vero laboriosam accusantium soluta, officia ad pariatur. Dolorem in dignissimos consectetur nesciunt.',
    },
    {
      src: '5Mesa-de-trabajo-1-20.webp',
      thumb:
        '5Mesa-de-trabajo-1-20.webp',
    },
    {
      src: '6Mesa-de-trabajo-1-20.webp',
      thumb: '6Mesa-de-trabajo-1-20.webp',
    },
    {
      src: '8Mesa-de-trabajo-1-20.webp',
      thumb: '8Mesa-de-trabajo-1-20.webp',
    },
    {
      src: 'empaqueMesa-de-trabajo-1-20.webp',
      thumb: 'empaqueMesa-de-trabajo-1-20.webp',
    },
  ];

  options: any[] = [
    {
      imageSize: 'contain',
      previewImageSize: 'contain',
      downloadable: false,
      swipe: true,
      zoom: true,
      zoomStep: 0.1,
      fullWidth: false,
      thumbnails: true,
      imageBgColor: 'white',
      previewBgColor: 'white',
      descriptionFontSize: '14px',
      imageArrowAutoHide: false,
      arrowPrevIcon: 'icon-arrow-left',
      arrowNextIcon: 'icon-arrow-right',
      closeIcon: 'icon-close',
      downloadIcon: 'icon-download',
      thumbnailSize: '50px',
      thumbnailMargin: '10px',
      thumbnailArrow: true,
      thumbnailArrowPrevIcon: 'icon-arrow-left',
      thumbnailArrowNextIcon: 'icon-arrow-right',
      thumbnailLabel: {
        enable: true,
        position: 'top',
        display: 'always',
      },
    },
  ];

  images: GalleryItem[] = [];
  interval: any;
  name: any;
  active: number = 2;
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

  ngOnInit(): void {
    this.images = this.imagenes.map((info: any) => {
      return new ImageItem({
        src: 'assets/image/projects/designs/'+info.src,
        thumb: 'assets/image/projects/designs/'+info.thumb,
      });
    });
  }

  onMouseOver(event: MouseEvent): void {
    const activeElement = event.target as HTMLElement;
    this.changeLetters(activeElement);
  }

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
}
