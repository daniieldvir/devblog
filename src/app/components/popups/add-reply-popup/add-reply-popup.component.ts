import { Component, model, output } from '@angular/core';
import { select } from '@ngxs/store';
import { BlogSelectors } from '../../../state/blog.selectors';

@Component({
  selector: 'app-add-reply-popup',
  standalone: true,
  imports: [],
  templateUrl: './add-reply-popup.component.html',
  styleUrl: './add-reply-popup.component.scss',
})
export class AddReplyPopupComponent {
  public replyText = output<string>();
  public openAddReplyPopup = model<boolean>(false);
  protected readonly firstUser = select(BlogSelectors.firstUser);

  protected closePopup() {
    this.openAddReplyPopup.set(false);
  }

  protected addReply(value: string) {
    this.replyText.emit(value);
    this.closePopup();
  }
}
