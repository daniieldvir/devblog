import { Component, inject, input, signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { CommentWithOwner } from '../../../models/models';
import { BlogActions } from '../../../state/blog.action';
import { AddReplyPopupComponent } from '../../popups/add-reply-popup/add-reply-popup.component';
import { DeletePopupComponent } from '../../popups/delete-popup/delete-popup.component';
import { CommentPreviewComponent } from '../comment-preview/comment-preview.component';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommentPreviewComponent, AddReplyPopupComponent, DeletePopupComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.scss',
})
export class CommentListComponent {
  commentsWithOwners = input<CommentWithOwner[]>();

  public openAddReplyPopup = signal<boolean>(false);
  public openDeletePopup = signal<boolean>(false);

  private readonly store = inject(Store);
  private readonly selectedComment = signal<CommentWithOwner | null>(null);
  private readonly selectedCommentId = signal<string | null>(null);

  protected onSaveNewText(data: { commentId: string; newText: string }) {
    this.store.dispatch(new BlogActions.EditComment(data.commentId, data.newText));
  }

  protected onReplyComment(comment: CommentWithOwner) {
    this.openAddReplyPopup.set(true);
    this.selectedComment.set(comment);
  }

  protected onAddReply(value: string) {
    if (!this.selectedComment()) {
      return;
    }
    this.store.dispatch(new BlogActions.AddReplyComment(this.selectedComment()!, value));
  }

  protected onDeleteComment(commentId: string) {
    this.openDeletePopup.set(true);
    this.selectedCommentId.set(commentId);
  }

  protected onConfirmDelete() {
    const commentId = this.selectedCommentId();
    if (commentId) {
      this.store.dispatch(new BlogActions.DeleteComment(commentId));
      this.openDeletePopup.set(false);
      this.selectedCommentId.set(null);
    }
  }
}
