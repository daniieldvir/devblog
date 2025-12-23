import { Component, input, output } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { ButtonComponent } from '../../shared-components/button/button.component';

@Component({
  selector: 'app-comment-actions',
  standalone: true,
  imports: [ButtonComponent, NgIconsModule],
  templateUrl: './comment-actions.component.html',
  styleUrl: './comment-actions.component.scss',
})
export class CommentActionsComponent {
  editedMode = input<boolean>(false);
  repliesCount = input<number>(0);

  editClicked = output<void>();
  replyClicked = output<void>();
  toggleReplysClicked = output<void>();
  deleteClicked = output<void>();
}
