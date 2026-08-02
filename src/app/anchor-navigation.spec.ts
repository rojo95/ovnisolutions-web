import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

/**
 * Pruebas de integración de la navegación por anclas (fragments).
 *
 * Verifica que los enlaces /home#<seccion> produzcan el scroll a la sección
 * correspondiente en todos los escenarios soportados:
 *  - Navegación desde la misma página.
 *  - Navegación desde otra ruta.
 *  - Carga inicial con fragment.
 */
describe('Navegación por anclas (fragments)', () => {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let scrollToAnchorSpy: jasmine.Spy;

  const secciones = ['home', 'services', 'projects', 'team', 'contact'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);

    // El spy debe activarse ANTES de inyectar el Router: con
    // `initialNavigation` bloqueante, el Router navega en su primera
    // inyección y dispararía el scroll a un fragment sin que lo captemos.
    scrollToAnchorSpy = spyOn(
      TestBed.inject(ViewportScroller),
      'scrollToAnchor'
    );
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    // Reinicia el historial para no contaminar otros tests
    TestBed.resetTestingModule();
  });

  it('todas las secciones del home tienen id para ser targets de fragments', fakeAsync(() => {
    // Los ids viven dentro del router-outlet: primero hay que navegar al home.
    router.navigateByUrl('/home');
    tick();
    fixture.detectChanges();
    tick();

    secciones.forEach((s) => {
      expect(document.getElementById(s)).toBeTruthy();
    });
  }));

  it('navega desde otra ruta a /home#services y hace scroll a la sección', fakeAsync(() => {
    router.navigateByUrl('/login');
    tick();
    fixture.detectChanges();
    tick();
    scrollToAnchorSpy.calls.reset();

    router.navigate(['/home'], { fragment: 'services' });
    tick();
    fixture.detectChanges();
    tick();

    expect(router.url).toBe('/home#services');
    expect(scrollToAnchorSpy).toHaveBeenCalledWith('services');
  }));

  it('hace scroll a la sección al navegar dentro de la misma página', fakeAsync(() => {
    router.navigateByUrl('/home');
    tick();
    fixture.detectChanges();
    tick();

    scrollToAnchorSpy.calls.reset();
    router.navigate(['/home'], { fragment: 'contact' });
    tick();
    fixture.detectChanges();
    tick();

    expect(router.url).toBe('/home#contact');
    expect(scrollToAnchorSpy).toHaveBeenCalledWith('contact');
  }));

  it('hace scroll a la sección en la carga inicial con fragment', fakeAsync(() => {
    router.navigateByUrl('/home#projects');
    tick();
    fixture.detectChanges();
    tick();
    flush();

    expect(router.url).toBe('/home#projects');
    expect(scrollToAnchorSpy).toHaveBeenCalledWith('projects');
  }));
});
