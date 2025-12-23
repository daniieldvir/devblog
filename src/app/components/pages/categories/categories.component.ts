import { JsonPipe } from '@angular/common';
import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { select } from '@ngxs/store';
import { ForumSelectors } from '../../../state/forum.selectors';
import { FooterComponent } from '../../frame-components/footer/footer.component';
import { HeaderComponent } from '../../frame-components/header/header.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink, JsonPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  protected readonly articles = select(ForumSelectors.slices.articles);
  protected readonly categories = select(ForumSelectors.categories);

  // Category definitions with icons and colors
  private readonly categoryDefinitions = [
    { name: 'Angular', icon: '💻', color: '#6366f1' },
    { name: 'CSS', icon: '🎨', color: '#ec4899' },
    { name: 'Web Development', icon: '⚡', color: '#10b981' },
    { name: 'TypeScript', icon: '📚', color: '#f59e0b' },
    { name: 'React', icon: '🚀', color: '#06b6d4' },
    { name: 'Node.js', icon: '💻', color: '#8b5cf6' },
    { name: 'JavaScript', icon: '⚡', color: '#6366f1' },
    { name: 'Design', icon: '🎨', color: '#ec4899' },
    { name: 'Testing', icon: '🧪', color: '#10b981' },
    { name: 'Backend', icon: '🔧', color: '#f59e0b' },
  ];

  // Computed categories with counts
  protected readonly categoriesWithIcons = computed(() => {
    const articles = this.articles() ?? [];
    const uniqueCategories = (this.categories() ?? []) as string[];

    // Count categories from all articles
    const counts = articles.reduce<Record<string, number>>((map, article) => {
      const name = article.category;
      map[name] = (map[name] ?? 0) + 1;
      return map;
    }, {});

    // Map unique categories to icon + color + count
    return uniqueCategories.map((name: string) => {
      const def = this.categoryDefinitions.find((d) => d.name === name);

      return {
        ...(def ?? { name, icon: '❓', color: '#6b7280' }),
        count: counts[name] ?? 0,
      };
    });
  });
}
