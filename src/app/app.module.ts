import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { NgxParallaxScrollModule } from 'ngx-parallax-scroll';
import { MatCardModule } from '@angular/material/card';
import { GalleryModule, GALLERY_CONFIG, GalleryConfig } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { HttpClientModule } from '@angular/common/http';

import { DevelopmentComponent } from './components/development/development.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { InConstructionComponent } from './views/in-construction/in-construction.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FormStepperComponent } from './components/contact-us/contact-form-stepper/contact-form-stepper.component';
import { SliderComponent } from './components/slider/slider.component';
import { OvniTeamComponent } from './components/ovni-team/ovni-team.component';
import { WebDesignComponent } from './components/web-design/web-design.component';
import { WebServicesComponent } from './views/web-services/web-services.component';
import { ServicesComponent } from './components/services/services.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { CardPortfolioComponent } from './components/card-portfolio/card-portfolio.component';
import axios from 'axios';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard/dashboard.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { GuestLayoutComponent } from './layouts/guest-layout/guest-layout.component';
import { AuthMenuComponent } from './components/menu/authMenu/auth-menu/auth-menu.component';
import { ErrorComponent } from './views/error/error.component';

const routes: Routes = [
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DevelopmentComponent,
    FooterComponent,
    MenuComponent,
    NotFoundComponent,
    InConstructionComponent,
    ContactUsComponent,
    FormStepperComponent,
    SliderComponent,
    OvniTeamComponent,
    WebDesignComponent,
    WebServicesComponent,
    ServicesComponent,
    PortfolioComponent,
    CardPortfolioComponent,
    LoginComponent,
    DashboardComponent,
    AuthLayoutComponent,
    GuestLayoutComponent,
    AuthMenuComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    NgbDropdownModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
    NgxParallaxScrollModule,
    MatCardModule,
    GalleryModule,
    LightboxModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: GALLERY_CONFIG,
      useValue: {
        autoHeight: true,
        imageSize: 'cover',
      } as GalleryConfig,
    },
    { provide: 'axios', useValue: axios },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
