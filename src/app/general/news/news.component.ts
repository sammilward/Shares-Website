import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { NewsService } from 'src/app/newsservice/news.service';
import { NewsResponse } from 'src/app/newsservice/newsResponse';
import { NewsArticle } from 'src/app/newsservice/newsArticle';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnChanges {
  @Input() topic: string;
  newsResponse: NewsResponse;
  newsArticles: NewsArticle[];

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.updateNews();
  }

  ngOnChanges(): void {
    this.updateNews();
  }

  updateNews()
  {
    this.newsService.getNewsItems(this.topic).subscribe({
      next: response => { 
        this.newsResponse = response;
        this.newsArticles = response.articles;
        this.newsArticles.sort((a,b) => (a.publishedAt < b.publishedAt) ? 1 : -1);  
      }
    })
  }
}
