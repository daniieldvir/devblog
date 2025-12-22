import { Component, computed, inject, input, output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ButtonComponent } from '../../utils-components/button/button.component';

@Component({
  selector: 'app-comment-actions',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './comment-actions.component.html',
  styleUrl: './comment-actions.component.scss',
})
export class CommentActionsComponent {
  editedMode = input<boolean>(false);
  replysCount = input<number>(0);

  editClicked = output<void>();
  replyClicked = output<void>();
  toggleReplysClicked = output<void>();
  deleteClicked = output<void>();

  private readonly sanitizer = inject(DomSanitizer);

  editIcon = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="20" height="20"
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="2"
     stroke-linecap="round"
     stroke-linejoin="round">
  <path d="M4 17.25V21h3.75L20 6.75 16.25 3 4 17.25z"/>
</svg>
`;

  vIcon = `
<svg xmlns="http://www.w3.org/2000/svg"
     width="20" height="20"
     viewBox="0 0 24 24"
     fill="none"
     stroke="currentColor"
     stroke-width="2"
     stroke-linecap="round"
     stroke-linejoin="round">
  <path d="M5 13l4 4L19 7"/>
</svg>
`;

  actionToDisplay = computed<SafeHtml>(() =>
    this.sanitizer.bypassSecurityTrustHtml(this.editedMode() ? this.vIcon : this.editIcon),
  );
}
