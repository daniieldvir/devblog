import { Component, input } from '@angular/core';
import { Article } from '../../../models/article.models';
import { TimeAgoPipe } from '../../../pipes/time-pipe';

@Component({
  selector: 'app-article-preview',
  standalone: true,
  imports: [TimeAgoPipe],
  templateUrl: './article-preview.component.html',
  styleUrl: './article-preview.component.scss',
})
export class ArticlePreviewComponent {
  article = input<Article>();
}
