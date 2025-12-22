import { Component, computed, inject, signal } from '@angular/core';
import { select, Store } from '@ngxs/store';
import { BlogActions } from '../../state/blog.action';
import { BlogSelectors } from '../../state/blog.selectors';
import { CommentListComponent } from '../blog-components/comment-list/comment-list.component';
import { FooterComponent } from '../frame-components/footer/footer.component';
import { HeaderComponent } from '../frame-components/header/header.component';
import { SidebarComponent } from '../frame-components/sidebar/sidebar.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommentListComponent, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  private readonly store = inject(Store);

  protected readonly isLoading = select(BlogSelectors.slices.loading);

  protected readonly searchQuery = signal('');
  protected readonly isMobileMenuOpen = signal(false);

  protected readonly filteredUserComments = computed(() => {
    return this.store.selectSignal(BlogSelectors.filteredUserComments(this.searchQuery()))();
  });

  onSearchChange(query: string): void {
    this.searchQuery.set(query);
  }

  onSidebarToggle(): void {
    // Toggle sidebar (only visible on mobile)
    this.isMobileMenuOpen.update((value) => !value);
  }

  onOverlayClick(): void {
    this.isMobileMenuOpen.set(false);
  }

  ngOnInit() {
    this.store.dispatch(new BlogActions.LoadBlogData());
  }
}
