import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';

@Component({
  selector: 'app-article-viewer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container *ngIf="article">
      <h1>{{ article.headline }}</h1>
      <h3>{{ article.subHeadline }}</h3>
      <ng-container *ngFor="let block of article.contents">
        <div [ngSwitch]="block.contentType">
          <ng-container *ngSwitchCase="'Paragraph'">
            <p [innerHTML]="block.paragraphContent?.text"></p>
          </ng-container>
          <ng-container *ngSwitchCase="'BulletList'">
            <ul *ngIf="block.bulletListContent?.listType === 'Unordered'">
              <li *ngFor="let item of block.bulletListContent?.items">{{ item.text }}</li>
            </ul>
            <ol *ngIf="block.bulletListContent?.listType === 'Ordered'">
              <li *ngFor="let item of block.bulletListContent?.items">{{ item.text }}</li>
            </ol>
          </ng-container>
          <ng-container *ngSwitchCase="'Image'">
            <figure>
              <img [src]="block.imageContent?.imageUrl" [alt]="block.imageContent?.caption" style="max-width:100%" />
              <figcaption>{{ block.imageContent?.caption }}</figcaption>
            </figure>
          </ng-container>
          <ng-container *ngSwitchCase="'YouTubeVideo'">
            <div>
              <iframe width="560" height="315" [src]="getYoutubeEmbedUrl(block.videoContent?.videoUrl)" frameborder="0" allowfullscreen></iframe>
            </div>
          </ng-container>
          <ng-container *ngSwitchCase="'ServerVideo'">
            <div>
              <video width="560" height="315" controls>
                <source [src]="block.videoContent?.videoUrl" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </ng-container>
        </div>
      </ng-container>
    </ng-container>
  `,
  styles: [`
    h1 { margin-bottom: 0.5rem; }
    h3 { margin-bottom: 2rem; color: #888; }
    figure { margin: 1.5rem 0; }
    iframe, video { margin: 1.5rem 0; display: block; }
  `]
})
export class ArticleViewerComponent {
  article?: Article;
  constructor(private route: ActivatedRoute, private articleService: ArticleService) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleService.getArticle(id).subscribe(a => this.article = a);
  }

  getYoutubeEmbedUrl(url?: string) {
    if (!url) return '';
    const match = url.match(/(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  }
}
