import { Component, ElementRef, model, output, viewChild } from '@angular/core';

@Component({
  selector: 'app-add-reply-popup',
  standalone: true,
  imports: [],
  templateUrl: './add-reply-popup.component.html',
  styleUrl: './add-reply-popup.component.scss',
})
export class AddReplyPopupComponent {
  protected readonly textarea = viewChild<ElementRef<HTMLTextAreaElement>>('textareaRef');

  public replyText = output<string>();
  public openAddReplyPopup = model<boolean>(false);

  protected closePopup() {
    this.openAddReplyPopup.set(false);
  }

  protected addReply(value: string) {
    this.replyText.emit(value);
    this.closePopup();
  }

  ngAfterViewInit() {
    const el = this.textarea();
    if (el) {
      el.nativeElement.focus();
    }
  }
}
