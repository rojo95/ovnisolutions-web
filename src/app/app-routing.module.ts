import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component';
import { GuestGuard } from './guard/guest/guest.guard';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ErrorComponent } from './views/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: GuestLayoutComponent,
    children: [
      // '/' abre el Home directamente (sin redirección, el HTML prerenderizado
      // de la raíz ya contiene la página completa)
      { path: '', component: HomeComponent, canActivate: [GuestGuard] },
      { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
      // Alias del Home (compatible con enlaces internos /home#seccion)
      { path: 'home', component: HomeComponent, canActivate: [GuestGuard] },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'not-found/:errorCode', component: ErrorComponent },
  { path: '**', redirectTo: '/not-found/404', pathMatch: 'full' }, // Redirecciona a /redirect por defecto
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
