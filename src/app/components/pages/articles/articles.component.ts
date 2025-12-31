import { JsonPipe } from '@angular/common';
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { select, Store } from '@ngxs/store';
import { Article } from '../../../models/article.models';
import { ForumActions } from '../../../state/forum.action';
import { ForumSelectors } from '../../../state/forum.selectors';
import { FooterComponent } from '../../frame-components/footer/footer.component';
import { HeaderComponent } from '../../frame-components/header/header.component';
import { ArticlePreviewComponent } from '../../inner-components/article-preview/article-preview.component';
import { ChipFilterComponent } from '../../shared-components/chip-filter/chip-filter.component';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    ArticlePreviewComponent,
    ChipFilterComponent,
    JsonPipe,
    RouterLink,
  ],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss',
})
export class ArticlesComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  protected readonly categories = select(ForumSelectors.categories);
  protected readonly isLoading = select(ForumSelectors.slices.articlesLoading);
  protected readonly allArticles = select(ForumSelectors.slices.articles);

  protected readonly categoriesWithAll = computed(() => [
    'All',
    ...((this.categories() ?? []) as string[]),
  ]);

  protected selectedChip = signal<string>('All');
  protected selectedAuthorId = signal<number | undefined>(undefined);

  protected readonly articlesByCategory = computed(() => {
    const category = this.selectedChip();

    if (category === 'All') {
      return this.allArticles() ?? [];
    }

    return this.store.selectSignal(
      ForumSelectors.articlesByCategory(category, this.selectedAuthorId())
    )();
  });

  public ngOnInit(): void {
    const nav = this.router.lastSuccessfulNavigation();
    const stateCategory = nav?.extras.state?.['category'] as string | undefined;
    const stateAuthorId = nav?.extras.state?.['authorId'] as number | undefined;

    if (stateCategory) {
      this.selectedChip.set(stateCategory);
    }
    if (stateAuthorId) {
      this.selectedAuthorId.set(stateAuthorId);
      console.log(this.selectedAuthorId());
    }
    this.store.dispatch(new ForumActions.LoadArticles());
  }

  protected navigateToArticle(article: Article): void {
    const autorName = this.store.selectSignal(ForumSelectors.authorByArticleId(article.authorId))();
    this.router.navigate(['/articles', article.id], {
      state: { article: article, author: autorName },
    });
  }
}
