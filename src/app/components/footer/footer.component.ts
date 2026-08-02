import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  faInstagram,
  faFacebookSquare,
  faLinkedin,
  faBehance,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FooterComponent implements OnInit {

  email = environment.officialEmail;
  date = new Date();
  instagram = faInstagram;
  facebook = faFacebookSquare;
  linkedin = faLinkedin;
  behanse = faBehance;
  twitter = faTwitter;
  whatsapp = faWhatsapp;

  constructor() {}

  ngOnInit(): void {}
}
