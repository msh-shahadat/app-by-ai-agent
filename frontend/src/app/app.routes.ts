import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/article-list.component').then(m => m.ArticleListComponent)
  },
  {
    path: 'create',
    loadComponent: () => import('./components/article-editor.component').then(m => m.ArticleEditorComponent)
  },
  {
    path: 'article/:id',
    loadComponent: () => import('./components/article-viewer.component').then(m => m.ArticleViewerComponent)
  }
];
