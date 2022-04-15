import { Article } from './news-response';

export interface ArticleByCategoryAndPage {
  [key: string]: {
    page: number;
    articles: Article[];
  };
}
