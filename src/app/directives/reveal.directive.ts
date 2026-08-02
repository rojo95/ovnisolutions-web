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

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade';

/**
 * Directiva de aparición por scroll basada en IntersectionObserver.
 *
 * Uso:
 *   <div appReveal="up" [appRevealDelay]="150">...</div>
 *
 * - `appReveal`    : dirección de entrada (por defecto 'up').
 * - `appRevealDelay`: retardo en ms antes de hacer visible el elemento
 *                     (ideal para escalonar tarjetas: `[appRevealDelay]="i * 120"`).
 *
 * Solo actúa en el navegador: durante SSR/prerender el elemento nunca se
 * oculta, por lo que no hay contenido invisible ni problemas de hidratación.
 * Respeta `prefers-reduced-motion` vía CSS global.
 */
@Directive({
  selector: '[appReveal]',
  standalone: false,
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() appReveal: RevealDirection = 'up';
  @Input() appRevealDelay: number = 0;

  private observer?: IntersectionObserver;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.elementRef.nativeElement.classList.add('app-reveal');
    if (this.appReveal !== 'fade') {
      this.elementRef.nativeElement.classList.add(`app-reveal-${this.appReveal}`);
    }

    if (typeof IntersectionObserver === 'undefined') {
      this.reveal();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          this.reveal();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    this.observer.observe(this.elementRef.nativeElement);
  }

  private reveal(): void {
    this.observer?.disconnect();
    setTimeout(() => {
      this.elementRef.nativeElement.classList.add('app-reveal-visible');
    }, this.appRevealDelay);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
