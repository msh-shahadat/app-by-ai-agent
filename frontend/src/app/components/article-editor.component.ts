import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Article, ArticleContent } from '../models/article.model';
import { ArticleService } from '../services/article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Create Article</h2>
    <form (ngSubmit)="submit()" #articleForm="ngForm">
      <label>Headline</label>
      <input type="text" [(ngModel)]="article.headline" name="headline" required />
      <label>Sub-headline</label>
      <input type="text" [(ngModel)]="article.subHeadline" name="subHeadline" required />
      <ng-container *ngFor="let block of article.contents; let i = index">
        <div [ngSwitch]="block.contentType">
          <ng-container *ngSwitchCase="'Paragraph'">
            <ng-container *ngIf="block.paragraphContent">
              <label>Paragraph</label>
              <textarea [(ngModel)]="block.paragraphContent.text" name="paragraph-{{i}}"></textarea>
            </ng-container>
          </ng-container>
          <ng-container *ngSwitchCase="'BulletList'">
            <ng-container *ngIf="block.bulletListContent">
              <label>Bullet List</label>
              <select [(ngModel)]="block.bulletListContent.listType" name="listType-{{i}}">
                <option value="Ordered">Ordered</option>
                <option value="Unordered">Unordered</option>
              </select>
              <ng-container *ngFor="let item of block.bulletListContent.items; let j = index">
                <input type="text" [(ngModel)]="item.text" name="item-{{i}}-{{j}}" />
              </ng-container>
              <button type="button" (click)="addBulletItem(i)">Add Item</button>
            </ng-container>
          </ng-container>
          <ng-container *ngSwitchCase="'Image'">
            <ng-container *ngIf="block.imageContent">
              <label>Image URL</label>
              <input type="text" [(ngModel)]="block.imageContent.imageUrl" name="imageUrl-{{i}}" />
              <label>Caption</label>
              <input type="text" [(ngModel)]="block.imageContent.caption" name="caption-{{i}}" />
            </ng-container>
          </ng-container>
          <ng-container *ngSwitchCase="'YouTubeVideo'">
            <ng-container *ngIf="block.videoContent">
              <label>YouTube URL</label>
              <input type="text" [(ngModel)]="block.videoContent.videoUrl" name="ytUrl-{{i}}" />
            </ng-container>
          </ng-container>
          <ng-container *ngSwitchCase="'ServerVideo'">
            <ng-container *ngIf="block.videoContent">
              <label>Server Video URL</label>
              <input type="text" [(ngModel)]="block.videoContent.videoUrl" name="svUrl-{{i}}" />
            </ng-container>
          </ng-container>
        </div>
        <button type="button" (click)="removeBlock(i)">Remove Block</button>
      </ng-container>
      <div class="block-buttons">
        <button type="button" (click)="addBlock('Paragraph')">Add Paragraph</button>
        <button type="button" (click)="addBlock('BulletList')">Add Bullet List</button>
        <button type="button" (click)="addBlock('Image')">Add Image</button>
        <button type="button" (click)="addBlock('YouTubeVideo')">Add YouTube Video</button>
        <button type="button" (click)="addBlock('ServerVideo')">Add Server Video</button>
      </div>
      <button type="submit">Submit Article</button>
    </form>
  `,
  styles: [`
    form { display: flex; flex-direction: column; gap: 1.2rem; }
    input, textarea, select { width: 100%; padding: 0.5rem; margin-top: 0.2rem; }
    .block-buttons { display: flex; gap: 0.5rem; margin: 1rem 0; }
    button { padding: 0.5rem 1.2rem; }
  `]
})
export class ArticleEditorComponent {
  article: Article = { headline: '', subHeadline: '', contents: [] };

  constructor(private articleService: ArticleService, private router: Router) {}

  addBlock(type: ArticleContent['contentType']) {
    const block: ArticleContent = {
      contentType: type,
      sortOrder: this.article.contents.length,
      paragraphContent: type === 'Paragraph' ? { text: '' } : undefined,
      bulletListContent: type === 'BulletList' ? { listType: 'Unordered', items: [] } : undefined,
      imageContent: type === 'Image' ? { imageUrl: '', caption: '' } : undefined,
      videoContent: (type === 'YouTubeVideo' || type === 'ServerVideo') ? { videoType: type === 'YouTubeVideo' ? 'YouTube' : 'Server', videoUrl: '' } : undefined
    };
    this.article.contents.push(block);
  }

  removeBlock(i: number) {
    this.article.contents.splice(i, 1);
  }

  addBulletItem(i: number) {
    this.article.contents[i].bulletListContent?.items.push({ text: '' });
  }

  submit() {
    this.articleService.createArticle(this.article).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
