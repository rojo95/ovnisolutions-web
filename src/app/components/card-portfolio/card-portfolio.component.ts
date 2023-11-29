import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-portfolio',
  templateUrl: './card-portfolio.component.html',
  styleUrls: ['./card-portfolio.component.scss']
})
export class CardPortfolioComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }

}
