import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
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

  @ViewChild(IonInfiniteScroll, { static: true })
  infiniteScroll: IonInfiniteScroll;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getArticles();
  }

  segmentChanged(event: Event): void {
    this.selectedCategory = (event as CustomEvent).detail.value;
    this.getArticles();
  }

  loadData(): void {
    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory, true)
      .subscribe({
        next: (articles) => {
          if (articles.length === this.articles.length) {
            this.infiniteScroll.disabled = true;
            return;
          }

          this.articles = articles;
          this.infiniteScroll.complete();
        },
      });
  }

  getArticles(loadMore?: boolean): void {
    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory, loadMore)
      .subscribe({
        next: (articles) => {
          this.articles = [...articles];
        },
      });
  }
}
