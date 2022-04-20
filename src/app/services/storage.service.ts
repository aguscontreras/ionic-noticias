import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localArticles: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    this.loadFavorites();
  }

  get localArticles(): Article[] {
    return [...this._localArticles];
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  async saveRemoveArticle(article: Article) {
    const exists = this._localArticles.find((e) => e.title === article.title);

    if (exists) {
      this._localArticles = this._localArticles.filter(
        (e) => e.title !== article.title
      );
    } else {
      this._localArticles = [article, ...this._localArticles];
    }

    this._storage.set('articles', this._localArticles);
  }

  async loadFavorites() {
    try {
      const articles = await this._storage.get('articles');
      this._localArticles = articles || [];
    } catch (error) {}
  }

  articleIsInFavorites(article: Article): boolean {
    return !!this._localArticles.find((e) => e.title === article.title);
  }
}
