import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces';
import { NewsService } from '../../services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];

  selectedCategory: string = this.categories[0];

  public articles: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  segmentChanged(event: any): void {
    console.log(event.detail.value);
    this.selectedCategory = event.detail.value;
    this.getArticles();
  }

  getArticles(): void {
    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe({
        next: (articles) => {
          this.articles = [...articles];
        },
      });
  }
}
