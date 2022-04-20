import { Component, Input } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import {
  ActionSheetButton,
  ActionSheetController,
  Platform,
} from '@ionic/angular';
import { Article } from '../../interfaces';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article: Article;
  @Input() id: number;

  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService
  ) {}

  openArticle(): void {
    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(this.article.url);
      browser.show();
    } else {
      window.open(this.article.url);
    }
  }

  async onOpenMenu() {
    const articleInFavorite = this.storageService.articleIsInFavorites(
      this.article
    );

    const buttons: ActionSheetButton[] = [
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'cancel',
      },
      {
        text: articleInFavorite ? 'Remover favorito' : 'Favorito',
        icon: articleInFavorite ? 'heart' : 'heart-outline',
        handler: () => this.onToggleFavorite(),
      },
    ];

    const shareButton: ActionSheetButton = {
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => this.onShareArticle(),
    };

    if (this.platform.is('capacitor')) {
      buttons.unshift(shareButton);
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Opciones',
      buttons,
    });

    await actionSheet.present();
  }

  onShareArticle(): void {
    const { title, source, url } = this.article;
    this.socialSharing.share(title, source.name, null, url);
  }

  onToggleFavorite(): void {
    this.storageService.saveRemoveArticle(this.article);
  }
}
