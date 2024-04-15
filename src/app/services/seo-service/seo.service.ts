import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document,
    private title: Title
  ) {}

  generateTagsConfig(config?: any) {
    const configBase = {
      title: 'OVNISOLUTIONS',
      description:
        'Descubre cómo nuestra agencia de desarrollo web y marketing digital ofrece soluciones integrales para impulsar tu negocio en línea. Con un enfoque en el diseño web, desarrollo de aplicaciones móviles, SEO, diseño gráfico, mantenimiento tecnológico, branding digital, diseño de empaques, gestión de redes sociales, construcción de logotipos, diseño corporativo e identidad de marca, nos aseguramos de que tu presencia en línea sea atractiva, funcional y altamente optimizada para motores de búsqueda. Nuestros servicios abarcan desde el diseño adaptable y optimizado para SEO hasta la creación de una identidad visual única que refleja la personalidad y valores de tu marca. Con un equipo de profesionales altamente calificados, ofrecemos un diseño web intuitivo que mejora la experiencia del usuario, facilita la navegación y promueve la interacción en tu sitio. Además, nuestro enfoque en el ecommerce y la optimización de la estructura web garantiza tiempos de carga rápidos y una clasificación superior en los motores de búsqueda. Con nuestra agencia, no solo obtendrás un sitio web bien elaborado y funcional, sino que también te ayudaremos a convertir visitantes en clientes potenciales, a través de landing pages efectivas y estrategias de marketing digital. Además, te ofrecemos servicios de mantenimiento tecnológico y actualizaciones periódicas para asegurar que tu sitio web siempre esté al día y alineado con las últimas tendencias y prácticas de SEO. Inversión en un sitio web bien diseñado y optimizado es crucial para el éxito de tu negocio en línea. Contáctanos hoy para obtener más información y comenzar con tus servicios de diseño personalizados que capturarán tu marca y atraerán nuevos visitantes, generando clientes potenciales y conversiones para tu negocio.',
      slug: '',
      keywords: [
        'ovni solutions',
        'desarrollo web',
        'app phone',
        'web development',
        'diseno web',
        'seo',
        'diseno logos',
      ],
      ...(config && config),
    };

    this.title.setTitle(configBase.title);

    // this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    // this.meta.updateTag({ name: 'twitter:site', content: '@MiTwitter' });
    // this.meta.updateTag({ name: 'twitter:title', content: configBase.title });
    // this.meta.updateTag({
    //   name: 'twitter:description',
    //   content: configBase.description,
    // });
    // this.meta.updateTag({ name: 'twitter:image', content: configBase.image });

    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'ovnisolutions',
    });
    this.meta.updateTag({ property: 'og:title', content: configBase.title });
    this.meta.updateTag({
      property: 'og:description',
      content: configBase.description,
    });
    // this.meta.updateTag({ property: 'og:image', content: configBase.image });
    this.meta.updateTag({
      property: 'og:url',
      content: `${this.document.location.host}/${configBase.slug}`,
    });
    this.meta.updateTag({
      name: 'keywords',
      content: configBase.keywords.join(', '),
    });
  }
}
