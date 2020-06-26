import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/newsservice/news.service';
import { NewsResponse } from 'src/app/newsservice/newsResponse';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newsResponse: NewsResponse;
  newsTopic: string = "Stock Market";

  constructor(private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNewsItems("Stock Market").subscribe({
      next: response => { this.newsResponse = response; }
    })
  }

}
