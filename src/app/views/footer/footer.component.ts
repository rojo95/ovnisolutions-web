import { Component, OnInit } from '@angular/core';
import { faInstagram,faFacebookSquare,faLinkedin,faBehance,faTwitter } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  date = new Date();
  instagram = faInstagram;
  facebook = faFacebookSquare;
  linkedin = faLinkedin;
  behanse = faBehance;
  twitter = faTwitter;

  constructor() { }

  ngOnInit(): void {
  }

}
