import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Verificar si el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
      return true; // Permitir acceso si el usuario no está autenticado
    } else {
      // Redireccionar al usuario al dashboard
      this.router.navigate(['/dashboard'], {
        queryParams: { returnUrl: state.url },
      });
      return false; // No ermitir acceso si el usuario está autenticado
    }
  }
}
