export interface User {
  id: number;
  displayName: string;
  url: string;
  bio: string;
}

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
  replys: CommentWithOwner[];
}

export interface NestedCommentWithOwner extends CommentWithOwner {
  replys: NestedCommentWithOwner[];
}
