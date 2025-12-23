import { Routes } from '@angular/router';
import { ForumComponent } from './components/forum/forum.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ArticlesComponent } from './components/pages/articles/articles.component';
import { CategoriesComponent } from './components/pages/categories/categories.component';
import { HomeComponent } from './components/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'forum',
    component: ForumComponent,
  },
  {
    path: 'articles',
    component: ArticlesComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'categories',
    component: CategoriesComponent,
  },
];
