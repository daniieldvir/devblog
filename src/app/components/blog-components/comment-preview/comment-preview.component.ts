import { Component, input, output, signal } from '@angular/core';
import { CommentWithOwner } from '../../../models/models';
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

  showReplys = signal(false);
  editedMode = signal<boolean>(false);
  editedText = signal<string>('');

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

  protected edit(commentId: string, action: string) {
    if (action === 'Edit') {
      this.editedText.set(this.comment()?.txt ?? '');
      this.editedMode.set(true);
    } else if (action === 'Save') {
      this.editedMode.set(false);
      this.editCommentNewText.emit({ commentId: commentId, newText: this.editedText() });
    }
  }
}
