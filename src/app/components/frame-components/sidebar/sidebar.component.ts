import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { select } from '@ngxs/store';
import { Article } from '../../../models/article.models';
import { TimeAgoPipe } from '../../../pipes/time-pipe';
import { ForumSelectors } from '../../../state/forum.selectors';
import { ChipFilterComponent } from '../../shared-components/chip-filter/chip-filter.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TimeAgoPipe, ChipFilterComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  protected readonly author = select(ForumSelectors.slices.onlineUser);
  protected readonly categories = select(ForumSelectors.categories);
  protected readonly commentsWithOwners = select(ForumSelectors.slices.commentsWithOwners);
  protected readonly articles = select<Article[]>(ForumSelectors.slices.articles);

  protected recentPosts = computed(() => {
    const author = this.author();
    const comments = this.commentsWithOwners() ?? [];

    if (!author) {
      return [];
    }

    return comments
      .filter((comment) => comment.owner.id === author.id)
      .map((comment) => ({
        title: comment.txt,
        date: comment.createdAt,
      }));
  });

  protected articlesByCategory = computed(() => {
    const categories = this.categories() ?? [];
    const articles = this.articles().filter((article) => article.authorId === this.author()?.id);

    return categories
      .map((category) => ({
        name: category,
        count: articles.filter((article) => article.category === category).length,
      }))
      .filter((category) => category.count > 0);
  });

  protected readonly socialLinks = [
    { name: 'Twitter', icon: 'X', url: 'https://twitter.com' },
    { name: 'GitHub', icon: 'GH', url: 'https://github.com' },
    { name: 'LinkedIn', icon: 'in', url: 'https://linkedin.com' },
  ];
}
