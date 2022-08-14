import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes,RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { NgxParallaxScrollModule } from 'ngx-parallax-scroll';

import { CarouselComponent } from './views/home/carousel/carousel.component';
import { DevelopmentComponent } from './views/home/development/development.component';
import { FooterComponent } from './views/footer/footer.component';
import { MenuComponent } from './views/menu/menu.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { InConstructionComponent } from './views/in-construction/in-construction.component';
import { ContactUsComponent } from './views/contact-us/contact-us.component';
import { FormStepperComponent } from './views/contact-us/contact-form-stepper/contact-form-stepper.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'services',
    component: InConstructionComponent
  },
  {
    path: 'proyects',
    component: InConstructionComponent
  },
  {
    path: 'us',
    component: InConstructionComponent
  },
  {
    path: 'more',
    component: InConstructionComponent
  },
  {
    path: 'contact',
    component: ContactUsComponent
  },
  {
    path: '**',
    component: HomeComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    DevelopmentComponent,
    FooterComponent,
    MenuComponent,
    NotFoundComponent,
    InConstructionComponent,
    ContactUsComponent,
    FormStepperComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
    MatFormFieldModule,
    NgbCarouselModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    MatButtonModule,
    MatSelectModule,
    NgxParallaxScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
