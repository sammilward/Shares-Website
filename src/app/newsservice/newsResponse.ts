import { NewsArticle } from './newsArticle';

export class NewsResponse {
    status: string;
    totalResults: number;
    articles: NewsArticle[];
}