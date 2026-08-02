
import { Inject, Injectable, DOCUMENT } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly defaultTitle =
    'OVNISOLUTIONS | Diseño Web, Branding y Apps Móviles';
  private readonly defaultDescription =
    'Desarrollo web, branding digital, diseño de empaques, apps móviles, redes sociales y asesoría tecnológica para tu negocio. Soluciones fuera de este mundo.';
  private readonly defaultKeywords = [
    'ovni solutions',
    'desarrollo web',
    'aplicaciones móviles',
    'branding digital',
    'redes sociales',
    'seo',
    'diseño de empaques',
    'asesoría tecnológica',
  ];

  constructor(
    private meta: Meta,
    @Inject(DOCUMENT) private document: Document,
    private title: Title
  ) {}

  generateTagsConfig(config?: any) {
    const pageTitle = config?.title || this.defaultTitle;
    const pageDescription = config?.description || this.defaultDescription;
    const pageUrl = `${this.document.location.origin}${this.document.location.pathname}`;

    this.title.setTitle(pageTitle);

    this.meta.updateTag({ name: 'description', content: pageDescription });
    this.meta.updateTag({
      name: 'keywords',
      content: this.defaultKeywords.join(', '),
    });
    this.meta.updateTag({ name: 'author', content: 'OVNISOLUTIONS C.A.' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    // Open Graph
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'OVNI Solutions' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_419' });
    this.meta.updateTag({ property: 'og:locale:alternate', content: 'es_ES' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({
      property: 'og:description',
      content: pageDescription,
    });
    this.meta.updateTag({
      property: 'og:image',
      content: `${this.document.location.origin}/assets/image/og-image.png`,
    });
    this.meta.updateTag({ property: 'og:image:type', content: 'image/png' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: 'OVNI Solutions — Soluciones de diseño y desarrollo web' });
    this.meta.updateTag({ property: 'og:url', content: pageUrl });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: '@ovnisolutions' });
    this.meta.updateTag({ name: 'twitter:creator', content: '@ovnisolutions' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({
      name: 'twitter:description',
      content: pageDescription,
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: `${this.document.location.origin}/assets/image/og-image.png`,
    });

    // Canonical dinámico (refleja el origen real donde se sirve la app)
    const existingLink = this.document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (existingLink) {
      existingLink.setAttribute('href', pageUrl);
    } else {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', pageUrl);
      this.document.head.appendChild(link);
    }
  }
}
