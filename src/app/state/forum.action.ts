import { CommentWithOwner } from '../models/models';

export namespace ForumActions {
  export class LoadBlogData {
    static readonly type = '[Forum] Load Forum Data';
  }

  export class AddReplyComment {
    static readonly type = '[Forum] Add Reply Comment';
    constructor(public readonly comment: CommentWithOwner, public readonly replyText: string) {}
  }

  export class EditComment {
    static readonly type = '[Forum] Edit Comment';
    constructor(public readonly commentId: string, public readonly newText: string) {}
  }

  export class DeleteComment {
    static readonly type = '[Forum] Delete Comment';
    constructor(public readonly commentId: string) {}
  }
}
