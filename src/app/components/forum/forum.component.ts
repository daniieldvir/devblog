import { Component, computed, inject, signal } from '@angular/core';
import { select, Store } from '@ngxs/store';
import { ForumActions } from '../../state/forum.action';
import { ForumSelectors } from '../../state/forum.selectors';
import { CommentListComponent } from '../forum-components/comment-list/comment-list.component';
import { FooterComponent } from '../frame-components/footer/footer.component';
import { HeaderComponent } from '../frame-components/header/header.component';
import { SidebarComponent } from '../frame-components/sidebar/sidebar.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [CommentListComponent, HeaderComponent, SidebarComponent, FooterComponent],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss',
})
export class ForumComponent {
  private readonly store = inject(Store);

  protected readonly isLoading = select(ForumSelectors.slices.loading);

  protected readonly searchQuery = signal('');
  protected readonly isMobileMenuOpen = signal(false);

  protected readonly filteredUserComments = computed(() => {
    return this.store.selectSignal(ForumSelectors.filteredUserComments(this.searchQuery()))();
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
    this.store.dispatch(new ForumActions.LoadBlogData());
  }
}
