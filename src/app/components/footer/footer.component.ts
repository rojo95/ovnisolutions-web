import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { faInstagram,faFacebookSquare,faLinkedin,faBehance,faTwitter } from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  @Output() emitter: EventEmitter<number> = new EventEmitter<number>();

  date = new Date();
  instagram = faInstagram;
  facebook = faFacebookSquare;
  linkedin = faLinkedin;
  behanse = faBehance;
  twitter = faTwitter;

  constructor() { }

  ngOnInit(): void {
  }

  emit(id: number) {
    this.emitter.emit(id);
  }

}
