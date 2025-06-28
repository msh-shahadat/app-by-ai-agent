import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Articles</h2>
    <div *ngIf="loading">Loading...</div>
    <div *ngIf="!loading && articles.length === 0">No articles found.</div>
    <ul *ngIf="!loading && articles.length > 0">
      <li *ngFor="let article of articles">
        <a (click)="router.navigate(['/article', article.id])">{{ article.headline }}</a>
        <span class="date">{{ article.createdAt | date:'medium' }}</span>
      </li>
    </ul>
    <button (click)="router.navigate(['/create'])">Create New Article</button>
  `,
  styles: [`
    h2 { margin-bottom: 1.5rem; }
    ul { list-style: none; padding: 0; }
    li { margin-bottom: 1rem; }
    .date { color: #888; margin-left: 1rem; font-size: 0.95em; }
    button { margin-top: 2rem; }
  `]
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];
  loading = true;

  constructor(public router: Router, private articleService: ArticleService) {}

  ngOnInit() {
    this.articleService.getAllArticles().subscribe({
      next: (data) => {
        this.articles = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
