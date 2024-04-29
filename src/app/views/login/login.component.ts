import { Component, OnInit } from '@angular/core';
import { AuthService, login } from '../../services/auth/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SeoService } from 'src/app/services/seo-service/seo.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  showpass = 'visibility_off';
  typePass = 'password';
  formLogin = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      this.authService.validatePasswordStrength.bind(this),
    ]),
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private seo: SeoService,
    private title: Title
  ) {}

  ngOnInit() {
    this.seo.generateTagsConfig({
      title: this.title.getTitle() + ' - Inicia sesión',
    });
  }

  showpassFunction() {
    if (this.showpass === 'visibility_off') {
      this.showpass = 'visibility';
      this.typePass = 'text';
    } else {
      this.showpass = 'visibility_off';
      this.typePass = 'password';
    }
  }

  onSubmit(): void {
    // Obtener los valores reales del formulario
    const data: login = {
      email: this.formLogin.get('email')?.value || '',
      password: this.formLogin.get('password')?.value || '',
    };

    if (this.formLogin.valid) {
      // Lógica para enviar los datos del formulario al servicio de autenticación
      this.authService.login(data).subscribe(
        () => {
          console.log('Inicio de sesión exitoso');
          // Aquí podrías redirigir al usuario a la página deseada después del inicio de sesión
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      );
    }
  }
}
