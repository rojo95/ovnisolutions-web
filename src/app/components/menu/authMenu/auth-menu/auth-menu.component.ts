import { Component, inject, TemplateRef, OnInit, Input } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  NgbActiveOffcanvas,
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth/auth.service';

export class NgbdOffcanvasContent {
  activeOffcanvas = inject(NgbActiveOffcanvas);
}

@Component({
  selector: 'app-auth-menu',
  // standalone: true,
  templateUrl: './auth-menu.component.html',
  styleUrls: ['./auth-menu.component.scss'],
})
export class AuthMenuComponent implements OnInit {
  private offcanvasService = inject(NgbOffcanvas);
  currentUrl: string = '';

  closeResult = '';

  routesList = [
    { path: '/home', name: 'Inicio' },
    { path: '/dashboard', name: 'Dashboard' },
    { path: '/login', name: 'Login' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.currentUrl = this.router.url?.split('?')[0] || this.router.url;

    // También puedes suscribirte a los cambios de la URL para mantenerla actualizada
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = this.router.url?.split('?')[0] || this.router.url;
      }
    });
  }

  open(content: TemplateRef<any>) {
    this.offcanvasService
      .open(content, { ariaLabelledBy: 'offcanvas-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      )
      .finally(() => {
        console.log(this.closeResult);
      });
  }

  logout() {
    this.authService.logout();
    this.offcanvasService.dismiss(OffcanvasDismissReasons.ESC);
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
