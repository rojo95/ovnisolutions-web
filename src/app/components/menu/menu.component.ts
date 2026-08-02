import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ElementRef,
  NgZone,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {

  bars = faBars;
  show:boolean = false;

  public langForm = this.formBuilder.group({
    langControl: new FormControl (localStorage.getItem('lang')||'1', [Validators.required])
  });

  /**
   * Elementos que se animan al ocultar/mostrar el header:
   * la barra de navegación de escritorio y el botón flotante de móvil.
   */
  @ViewChild('desktopMenu', { static: false }) desktopMenuRef?: ElementRef<HTMLElement>;
  @ViewChild('mobileMenuButton', { static: false }) mobileMenuButtonRef?: ElementRef<HTMLElement>;

  /** Clase que aplica la animación de ocultado (transform: translateY(-100%)). */
  private readonly hiddenClass = 'header-hidden';

  /** Umbral (px) mínimo de scroll por evento para decidir la dirección. Evita rebotes. */
  private readonly scrollDeadzone = 8;

  /** Por debajo de esta posición (px) el header siempre se muestra: es el tope de la página. */
  private readonly topDeadzone = 16;

  private lastScrollY = 0;
  private isHidden = false;
  /** Delta acumulado entre eventos: filtra rebotes y detecta scrolls lentos. */
  private scrollDelta = 0;
  /**
   * Tras un clic en una opción del menú el header queda oculto y no se deja
   * mostrar aunque el scroll de navegación vaya hacia arriba. Se libera al
   * terminar el scroll (scrollend) o con un timeout de respaldo.
   */
  private navSuppressReveal = false;
  private navSuppressTimer: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {
    if(!localStorage.getItem('lang')){
      localStorage.setItem('lang','1');
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // El listener corre FUERA de la zona de Angular: los eventos de scroll no
    // disparan ciclos de detección de cambios. Además es pasivo (no bloquea
    // el scroll) y manipula el DOM directamente con Renderer2.
    this.lastScrollY = window.scrollY || 0;
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onResize, { passive: true });
      window.addEventListener('scrollend', this.onScrollEnd, { passive: true });
    });
    this.syncScrollPadding();
  }

  ngOnDestroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scrollend', this.onScrollEnd);
    if (this.navSuppressTimer !== null) {
      window.clearTimeout(this.navSuppressTimer);
      this.navSuppressTimer = null;
    }
    // Quita el offset de anclas al salir de la página para no afectar a otras rutas.
    this.renderer.removeStyle(document.documentElement, 'scroll-padding-top');
  }

  actionMenu() {
    this.show = !this.show;
    // Al cerrar el drawer móvil el botón debe quedar siempre visible.
    if (!this.show) {
      this.setHidden(false);
    }
  }

  /**
   * Clic en una opción del menú (escritorio o móvil): cierra el drawer si está
   * abierto y oculta el header, manteniéndolo oculto durante la navegación.
   */
  onNavItemClick() {
    if (this.show) {
      this.actionMenu();
    }
    this.hideAfterNav();
  }

  /**
   * Detecta la dirección del scroll y muestra/oculta el header.
   * Se comporta igual para scroll manual, rueda, trackpad, táctil,
   * teclado y navegación por anclas (que también produce scroll).
   * El delta se acumula entre eventos: así un trackpad lento (~5px por
   * evento) cruza el umbral en pocos frames, mientras que los rebotes
   * de dirección se cancelan entre sí y no producen parpadeos.
   */
  private readonly onScroll = (): void => {
    const y = window.scrollY || 0;
    this.scrollDelta += y - this.lastScrollY;
    this.lastScrollY = y;

    // Con el drawer móvil abierto (pantalla completa) no se anima el botón.
    if (this.show) {
      return;
    }

    if (y <= this.topDeadzone) {
      // En el tope de la página el header siempre está visible.
      this.scrollDelta = 0;
      this.setHidden(false);
      return;
    }

    // Navegación iniciada desde el menú: el header permanece oculto aunque el
    // scroll vaya hacia arriba, hasta que la navegación termine.
    if (this.navSuppressReveal) {
      this.scrollDelta = 0;
      return;
    }

    if (Math.abs(this.scrollDelta) < this.scrollDeadzone) {
      return;
    }

    const scrollingDown = this.scrollDelta > 0;
    this.scrollDelta = 0;
    this.setHidden(scrollingDown);
  };

  /** Al terminar el scroll (incluida la navegación por anclas) se reactiva el comportamiento normal. */
  private readonly onScrollEnd = (): void => {
    this.navSuppressReveal = false;
    this.scrollDelta = 0;
    if (this.navSuppressTimer !== null) {
      window.clearTimeout(this.navSuppressTimer);
      this.navSuppressTimer = null;
    }
  };

  /** Oculta el header tras un clic en el menú y lo mantiene oculto durante la navegación. */
  private hideAfterNav(): void {
    this.setHidden(true);
    this.navSuppressReveal = true;
    this.scrollDelta = 0;
    if (this.navSuppressTimer !== null) {
      window.clearTimeout(this.navSuppressTimer);
    }
    // Respaldo por si `scrollend` no se dispara (ej. el destino ya está en vista).
    this.navSuppressTimer = window.setTimeout(() => {
      this.navSuppressReveal = false;
      this.navSuppressTimer = null;
    }, 2500);
  }

  /** Mantiene el offset de anclas alineado con la altura real del header. */
  private readonly onResize = (): void => {
    this.syncScrollPadding();
  };

  /**
   * Muestra u oculta los elementos del header sin pasar por change detection.
   * Solo toca el DOM si el estado realmente cambió (evita escrituras innecesarias).
   */
  private setHidden(hidden: boolean): void {
    if (hidden === this.isHidden) {
      return;
    }
    this.isHidden = hidden;
    const action: 'addClass' | 'removeClass' = hidden ? 'addClass' : 'removeClass';
    this.desktopMenuRef?.nativeElement && this.renderer[action](this.desktopMenuRef.nativeElement, this.hiddenClass);
    this.mobileMenuButtonRef?.nativeElement && this.renderer[action](this.mobileMenuButtonRef.nativeElement, this.hiddenClass);
  }

  /**
   * Ajusta `scroll-padding-top` del documento a la altura del header visible
   * (barra de escritorio o botón flotante en móvil). Así la navegación por
   * anclas (routerLink + fragment, scrollIntoView) nunca deja las secciones
   * ocultas debajo del header sticky.
   */
  private syncScrollPadding(): void {
    const desktop = this.desktopMenuRef?.nativeElement;
    const mobile = this.mobileMenuButtonRef?.nativeElement;
    const height = (desktop && desktop.offsetHeight) || (mobile && mobile.offsetHeight) || 0;
    this.renderer.setStyle(
      document.documentElement,
      'scroll-padding-top',
      height ? `${height}px` : ''
    );
  }

}
