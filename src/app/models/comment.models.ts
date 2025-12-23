import { User } from './user.models';

export interface Comment {
  id: string;
  parentCommentId?: string;
  ownerId: number;
  txt: string;
  createdAt: string;
  deletedAt: any;
}

export interface CommentWithOwner extends Comment {
  owner: User;
  replies: CommentWithOwner[];
}

export interface NestedCommentWithOwner extends CommentWithOwner {
  replies: NestedCommentWithOwner[];
}
