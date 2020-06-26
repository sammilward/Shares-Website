import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsResponse } from './newsResponse';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsURL = 'https://newsapi.org/v2/everything?apiKey=APIKEY&language=en&q=';

  constructor(private http: HttpClient) { }

  getNewsItems(topic: string): Observable<NewsResponse> {
    return this.http.get<NewsResponse>(this.newsURL + topic);
  }
}
