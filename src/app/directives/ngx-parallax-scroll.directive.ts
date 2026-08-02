import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface IParallaxScrollConfig {
  parallaxSpeed?: number;
  parallaxSmoothness?: number;
  parallaxDirection?: 'reverse' | 'normal';
  parallaxTimingFunction?: string;
  parallaxThrottleTime?: number;
}

/**
 * Directiva local que reemplaza a la librería abandonada `ngx-parallax-scroll`
 * (incompatible con Angular Ivy/22+). Mantiene el mismo selector y la misma
 * interfaz de configuración para no tocar los templates existentes.
 *
 * Anti-temblor:
 * - El offset se calcula de forma determinista a partir de la posición
 *   inicial del elemento (capturada una sola vez) y el scroll recorrido.
 *   NUNCA se re-lee `getBoundingClientRect()` en cada scroll: ese rect ya
 *   incluye el transform aplicado en el frame anterior y genera un
 *   "feedback loop" que hace vibrar al elemento (el planeta del slider).
 * - Las actualizaciones se encolan con `requestAnimationFrame` en lugar de
 *   ejecutarse en cada evento de scroll, evitando jitter y reflows.
 * - Se promueve la capa del elemento con `will-change: transform`.
 */
@Directive({
  selector: 'ngx-parallax-scroll',
  standalone: false,
})
export class NgxParallaxScrollDirective implements OnInit, OnDestroy {
  @Input() config?: IParallaxScrollConfig;

  private readonly element: HTMLElement;
  private readonly onScroll = (): void => this.scheduleUpdate();
  private readonly onResize = (): void => {
    this.captureBase();
    this.scheduleUpdate();
  };

  // Base capturada una sola vez (en ngOnInit, sin transform aplicado).
  private startTop = 0;
  private startScrollY = 0;
  private elementHeight = 0;
  private rafId = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    elementRef: ElementRef<HTMLElement>
  ) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.captureBase();
      this.element.style.willChange = 'transform';

      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onResize, { passive: true });
      this.update();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
      if (this.rafId) {
        cancelAnimationFrame(this.rafId);
      }
      this.element.style.willChange = '';
    }
  }

  private captureBase(): void {
    const rect = this.element.getBoundingClientRect();
    this.startTop = rect.top;
    this.startScrollY = window.scrollY;
    this.elementHeight = rect.height;
  }

  private scheduleUpdate(): void {
    if (this.rafId) {
      return;
    }
    this.rafId = requestAnimationFrame(() => {
      this.rafId = 0;
      this.update();
    });
  }

  private update(): void {
    const speed = this.config?.parallaxSpeed ?? 0.1;
    const direction = this.config?.parallaxDirection === 'reverse' ? -1 : 1;
    const viewportCenter = window.innerHeight / 2;

    // Centro "natural" del elemento en el documento (constante, sin transform).
    const naturalCenter = this.startTop + this.startScrollY + this.elementHeight / 2;
    // Distancia del centro del elemento al centro del viewport según el scroll.
    const distanceFromCenter = naturalCenter - window.scrollY - viewportCenter;
    let offset = distanceFromCenter * speed * direction;

    // Tope de recorrido: evita que el elemento viaje cientos de píxeles fuera
    // de la pantalla con speeds altos (p. ej. el planeta del slider, 0.9).
    const maxOffset = 400;
    offset = Math.max(-maxOffset, Math.min(maxOffset, offset));

    // Píxel entero: las fracciones hacen que el navegador re-redondee la capa
    // en cada frame y los bordes/glow del elemento "tiemblen" (jitter 1px).
    this.element.style.transform = `translate3d(0, ${Math.round(offset)}px, 0)`;
  }
}
