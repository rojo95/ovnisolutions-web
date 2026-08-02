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
 */
@Directive({
  selector: 'ngx-parallax-scroll',
  standalone: false,
})
export class NgxParallaxScrollDirective implements OnInit, OnDestroy {
  @Input() config?: IParallaxScrollConfig;

  private readonly element: HTMLElement;
  private readonly onScroll = (): void => this.update();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    elementRef: ElementRef<HTMLElement>
  ) {
    this.element = elementRef.nativeElement;
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.update();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onScroll);
    }
  }

  private update(): void {
    const rect = this.element.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const speed = this.config?.parallaxSpeed ?? 0.1;
    const direction = this.config?.parallaxDirection === 'reverse' ? -1 : 1;
    const offset = (rect.top + rect.height / 2 - viewportHeight / 2) * speed * direction;
    this.element.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
  }
}
