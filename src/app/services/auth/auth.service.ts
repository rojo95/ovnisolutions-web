// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

export interface login {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl =
    'https://661fc6c216358961cd957340.mockapi.io/homeller/v1/buyers/1'; // URL del backend de autenticación

  constructor(private http: HttpClient, private router: Router) {}

  login(data: login): Observable<any> {
    const { email, password } = data;
    return (
      this.http
        .get<any>(`${this.apiUrl}`)
        // .post<any>(`${this.apiUrl}/login`, { email, password })
        .pipe(
          map((response) => {
            // Login exitoso, guardar token en el almacenamiento local
            if (response.status === 200) {
              console.log(response);
              localStorage.setItem('token', response.token);
              this.router.navigate(['/dashboard']);
            }
            return response;
          }),
          catchError((error) => {
            // Manejar errores de autenticación
            return of(error);
          })
        )
    );
  }

  logout(): void {
    // Limpiar token del almacenamiento local al cerrar sesión
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // Comprobar si el usuario está autenticado
    return !!localStorage.getItem('token');
  }

  // Función de validación personalizada para la contraseña
  validatePasswordStrength(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const password = control.value;
    if (!password) {
      return null;
    }

    // Validar la contraseña con los criterios especificados
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      password
    );

    const isValid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars &&
      password.length >= 8;
    return isValid ? null : { invalidPassword: true };
  }
}
