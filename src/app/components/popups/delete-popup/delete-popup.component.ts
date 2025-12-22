import { Component, model, output } from '@angular/core';

@Component({
  selector: 'app-delete-popup',
  standalone: true,
  imports: [],
  templateUrl: './delete-popup.component.html',
  styleUrl: './delete-popup.component.scss',
})
export class DeletePopupComponent {
  public deleteCommentClicked = output<void>();
  public openDeletePopup = model<boolean>(false);

  protected closePopup() {
    this.openDeletePopup.set(false);
  }

  protected deleteComment() {
    this.deleteCommentClicked.emit();
    this.closePopup();
  }
}
