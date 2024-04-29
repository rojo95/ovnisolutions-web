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
      { path: '', redirectTo: 'home', pathMatch: 'full' }, // Redirige '/' a '/home'
      { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
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
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
