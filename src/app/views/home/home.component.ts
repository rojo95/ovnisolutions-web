import { Component, OnInit, ChangeDetectionStrategy, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';
import { SeoService } from 'src/app/services/seo-service/seo.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HomeComponent implements OnInit {
  data: any = [
    // {
    //   image: 'assets/image/projects/barberia-El-Imperial.png',
    //   thumb: 'assets/image/projects/barberia-El-Imperial_thumb.png'
    // },
    {
      image: 'https://preview.ibb.co/jrsA6R/img12.jpg',
      thumb: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    },
    {
      image: 'https://preview.ibb.co/jrsA6R/img12.jpg',
      thumb: 'https://preview.ibb.co/jrsA6R/img12.jpg',
    },
    {
      image: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
      thumb: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
    },
  ];

  galleryId = 'myLightbox';
  items: GalleryItem[] = this.data.map(
    (item: any) => new ImageItem({ src: item.image, thumb: item.thumb })
  );

  jsonItems = JSON.stringify(this.items);

  constructor(
    public gallery: Gallery,
    private lightbox: Lightbox,
    private seo: SeoService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // title.setTitle('OVNISOLUTIONS');
    // meta.updateTag({
    //   name: 'description',
    //   content:
    //     'Descubre cómo nuestra agencia de desarrollo web y marketing digital ofrece soluciones integrales para impulsar tu negocio en línea. Con un enfoque en el diseño web, desarrollo de aplicaciones móviles, SEO, diseño gráfico, mantenimiento tecnológico, branding digital, diseño de empaques, gestión de redes sociales, construcción de logotipos, diseño corporativo e identidad de marca, nos aseguramos de que tu presencia en línea sea atractiva, funcional y altamente optimizada para motores de búsqueda. Nuestros servicios abarcan desde el diseño adaptable y optimizado para SEO hasta la creación de una identidad visual única que refleja la personalidad y valores de tu marca. Con un equipo de profesionales altamente calificados, ofrecemos un diseño web intuitivo que mejora la experiencia del usuario, facilita la navegación y promueve la interacción en tu sitio. Además, nuestro enfoque en el ecommerce y la optimización de la estructura web garantiza tiempos de carga rápidos y una clasificación superior en los motores de búsqueda. Con nuestra agencia, no solo obtendrás un sitio web bien elaborado y funcional, sino que también te ayudaremos a convertir visitantes en clientes potenciales, a través de landing pages efectivas y estrategias de marketing digital. Además, te ofrecemos servicios de mantenimiento tecnológico y actualizaciones periódicas para asegurar que tu sitio web siempre esté al día y alineado con las últimas tendencias y prácticas de SEO. Inversión en un sitio web bien diseñado y optimizado es crucial para el éxito de tu negocio en línea. Contáctanos hoy para obtener más información y comenzar con tus servicios de diseño personalizados que capturarán tu marca y atraerán nuevos visitantes, generando clientes potenciales y conversiones para tu negocio.',
    // });
  }

  ngOnInit(): void {
    // La galería (ng-gallery) requiere DOM de navegador: no se inicializa
    // durante el prerender/SSR.
    if (isPlatformBrowser(this.platformId)) {
      const galleryRef = this.gallery.ref(this.galleryId);
      galleryRef.load(this.items);
    }
    this.seo.generateTagsConfig();

    // Navegación por anclas: cuando la URL lleva un fragment (#home, #services,
    // #team, #contact, ...) se hace scroll directo a la sección. Se usa
    // `scrollIntoView` en lugar de depender solo del `anchorScrolling` del
    // router, que no siempre scrollea (falla al navegar con fragment dentro de
    // la misma ruta y con SSR/hidratación activada). El subscribe cubre:
    //  - la carga inicial con fragment (p. ej. abrir /home#services),
    //  - los clics del menú y del footer estando en el home (misma ruta),
    //  - los clics llegando desde otra ruta (/login → /home#contact).
    this.route.fragment.subscribe((fragment) => {
      if (!fragment || !isPlatformBrowser(this.platformId)) {
        return;
      }
      // Se espera al siguiente tick para que el DOM de la sección ya exista
      // (clave cuando el home se acaba de crear al llegar desde otra ruta).
      setTimeout(() => {
        const el = document.getElementById(fragment);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  openInFullScreen(index: number) {
    this.lightbox.open(index, this.galleryId, {
      panelClass: 'fullscreen',
    });
  }
}
