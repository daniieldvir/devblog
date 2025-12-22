import { CommentWithOwner } from '../models/models';

export namespace BlogActions {
  export class LoadBlogData {
    static readonly type = '[Blog] Load Blog Data';
  }

  export class AddReplyComment {
    static readonly type = '[Blog] Add Reply Comment';
    constructor(
      public readonly comment: CommentWithOwner,
      public readonly replyText: string,
    ) {}
  }

  export class EditComment {
    static readonly type = '[Blog] Edit Comment';
    constructor(
      public readonly commentId: string,
      public readonly newText: string,
    ) {}
  }

  export class DeleteComment {
    static readonly type = '[Blog] Delete Comment';
    constructor(public readonly commentId: string) {}
  }
}
