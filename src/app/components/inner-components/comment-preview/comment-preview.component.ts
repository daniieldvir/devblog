import { Component, computed, input, output, signal } from '@angular/core';
import { CommentWithOwner } from '../../../models/comment.models';
import { TimeAgoPipe } from '../../../pipes/time-pipe';
import { CommentActionsComponent } from '../comment-actions/comment-actions.component';

@Component({
  selector: 'app-comment-preview',
  standalone: true,
  imports: [TimeAgoPipe, CommentActionsComponent],
  templateUrl: './comment-preview.component.html',
  styleUrl: './comment-preview.component.scss',
})
export class CommentPreviewComponent {
  comment = input<CommentWithOwner>();
  editCommentNewText = output<{ commentId: string; newText: string }>();
  replyComment = output<CommentWithOwner>();
  delete = output<string>();

  protected readonly showReplys = signal(false);
  protected readonly editMode = signal<boolean>(false);
  protected readonly editedText = signal<string>('');

  protected inputText = computed(() => (this.editMode() ? this.editedText() : this.comment()?.txt));

  protected toggleReplys() {
    this.showReplys.set(!this.showReplys());
  }

  protected reply(comment: CommentWithOwner) {
    this.replyComment.emit(comment);
  }

  protected deleteComment(commentId: string) {
    this.delete.emit(commentId);
  }

  protected onTextChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.editedText.set(input.value);
  }

  protected edit(commentId: string) {
    if (!this.editMode()) {
      this.editedText.set(this.comment()?.txt ?? '');
      this.editMode.set(true);
    } else {
      this.editMode.set(false);
      this.editCommentNewText.emit({ commentId: commentId, newText: this.editedText() });
    }
  }
}
