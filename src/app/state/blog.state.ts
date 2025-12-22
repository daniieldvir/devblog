import { inject, Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, of, tap, throwError } from 'rxjs';
import { NestedCommentWithOwner, User } from '../models/models';
import { BlogService } from '../service/blog.service';
import { BlogActions } from './blog.action';

export interface BlogStateModel {
  commentsWithOwners: NestedCommentWithOwner[];
  loading: boolean;
  onlineUser: User;
}

@Injectable()
@State<BlogStateModel>({
  name: 'blog',
  defaults: {
    commentsWithOwners: [],
    loading: false,
    onlineUser: {
      id: 1,
      displayName: 'Alice Johnson',
      url: 'https://i.pravatar.cc/150?img=5',
      bio: 'Full-stack developer passionate about clean code and great UX. Writing about web dev, design, and tech.',
    },
  },
})
export class BlogState {
  private readonly blogService = inject(BlogService);
  private readonly STORAGE_KEY = 'blog_comments';

  @Action(BlogActions.LoadBlogData)
  loadBlogData(ctx: StateContext<BlogStateModel>) {
    ctx.patchState({ loading: true });
    const storedComments = localStorage.getItem(this.STORAGE_KEY);

    if (storedComments) {
      ctx.patchState({ commentsWithOwners: JSON.parse(storedComments), loading: false });
      return of(JSON.parse(storedComments));
    } else {
      return this.blogService.getCommentsWithOwners().pipe(
        tap((commentsWithOwners) => {
          ctx.patchState({ commentsWithOwners, loading: false });
        }),
        catchError((error) => {
          ctx.patchState({ loading: false });
          return throwError(() => error);
        })
      );
    }
  }

  @Action(BlogActions.AddReplyComment)
  addReplyComment(ctx: StateContext<BlogStateModel>, action: BlogActions.AddReplyComment) {
    const state = ctx.getState();
    const onlineUser = state.onlineUser;
    const newReply: NestedCommentWithOwner = {
      id: crypto.randomUUID(),
      txt: action.replyText,
      createdAt: new Date().toISOString(),
      owner: onlineUser,
      ownerId: onlineUser.id,
      deletedAt: null,
      parentCommentId: action.comment.id,
      replies: [],
    };
    const updatedComments = this.addReplyToComment(
      state.commentsWithOwners,
      action.comment.id,
      newReply
    );
    ctx.patchState({ commentsWithOwners: updatedComments });
    this.saveToLocalStorage(updatedComments);
  }

  @Action(BlogActions.EditComment)
  editComment(ctx: StateContext<BlogStateModel>, action: BlogActions.EditComment) {
    const state = ctx.getState();
    const updatedComments = this.updateCommentInTree(
      state.commentsWithOwners,
      action.commentId,
      action.newText
    );
    ctx.patchState({ commentsWithOwners: updatedComments });
    this.saveToLocalStorage(updatedComments);
  }

  @Action(BlogActions.DeleteComment)
  deleteComment(ctx: StateContext<BlogStateModel>, action: BlogActions.DeleteComment) {
    const state = ctx.getState();
    const updatedComments = this.deleteCommentFromTree(state.commentsWithOwners, action.commentId);

    ctx.patchState({ commentsWithOwners: updatedComments });
    this.saveToLocalStorage(updatedComments);
  }

  private saveToLocalStorage(comments: NestedCommentWithOwner[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(comments));
  }

  private addReplyToComment(
    comments: NestedCommentWithOwner[],
    parentId: string,
    newReply: NestedCommentWithOwner
  ): NestedCommentWithOwner[] {
    return comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      if (comment.replies?.length) {
        return {
          ...comment,
          replies: this.addReplyToComment(comment.replies, parentId, newReply),
        };
      }
      return comment;
    });
  }

  private updateCommentInTree(
    comments: NestedCommentWithOwner[],
    commentId: string,
    newText: string
  ): NestedCommentWithOwner[] {
    return comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          txt: newText,
          createdAt: new Date().toISOString(),
        };
      }
      if (comment.replies?.length) {
        return {
          ...comment,
          replies: this.updateCommentInTree(comment.replies, commentId, newText),
        };
      }
      return comment;
    });
  }

  private deleteCommentFromTree(
    comments: NestedCommentWithOwner[],
    commentId: string
  ): NestedCommentWithOwner[] {
    return comments
      .map((comment) => {
        if (comment.id === commentId) {
          // Return null to filter out this comment and all its replies
          return null;
        }
        // Recursively search in replies
        if (comment.replies?.length) {
          return {
            ...comment,
            replies: this.deleteCommentFromTree(comment.replies, commentId),
          };
        }
        return comment;
      })
      .filter((comment): comment is NestedCommentWithOwner => comment !== null);
  }

  private deleteAllReplys(replies: NestedCommentWithOwner[]): NestedCommentWithOwner[] {
    return replies.map((reply) => ({
      ...reply,
      deletedAt: new Date().toISOString(),
      replies: this.deleteAllReplys(reply.replies || []),
    }));
  }
}
