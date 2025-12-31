import { Component, computed, inject, signal } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { select, Store } from '@ngxs/store';
import { ForumActions } from '../../state/forum.action';
import { ForumSelectors } from '../../state/forum.selectors';
import { FooterComponent } from '../frame-components/footer/footer.component';
import { HeaderComponent } from '../frame-components/header/header.component';
import { SidebarComponent } from '../frame-components/sidebar/sidebar.component';
import { CommentListComponent } from '../inner-components/comment-list/comment-list.component';
import { AddReplyPopupComponent } from '../popups/add-reply-popup/add-reply-popup.component';
import { ButtonComponent } from '../shared-components/button/button.component';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [
    CommentListComponent,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ButtonComponent,
    NgIconsModule,
    AddReplyPopupComponent,
  ],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss',
})
export class ForumComponent {
  private readonly store = inject(Store);

  protected readonly isLoading = select(ForumSelectors.slices.loading);
  protected readonly searchQuery = signal('');
  protected readonly isSidebarOpen = signal(false);
  protected readonly openAddCommentPopup = signal(false);

  protected readonly filteredUserComments = computed(() => {
    return this.store.selectSignal(ForumSelectors.filteredUserComments(this.searchQuery()))();
  });

  protected onSearchChange(query: string): void {
    this.searchQuery.set(query);
  }

  protected onSidebarToggle(): void {
    // Toggle sidebar (only visible on mobile)
    this.isSidebarOpen.update((value) => !value);
  }

  protected ngOnInit(): void {
    this.store.dispatch([new ForumActions.LoadBlogData(), new ForumActions.LoadArticles()]);
  }

  protected onAddCommentClick(): void {
    this.openAddCommentPopup.set(true);
  }

  protected onAddComment(value: string): void {
    this.store.dispatch(new ForumActions.AddReplyComment(value));
    console.log(value);
  }
}
