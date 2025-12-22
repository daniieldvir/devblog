import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Comment, NestedCommentWithOwner, User } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly http = inject(HttpClient);

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>('assets/mock-data/users-mock-data.json');
  }

  public getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>('assets/mock-data/comments-mock-data.json');
  }

  public getCommentsWithOwners(): Observable<NestedCommentWithOwner[]> {
    const sortNewest = (arr: NestedCommentWithOwner[]): NestedCommentWithOwner[] =>
      arr
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((c) => ({ ...c, replys: sortNewest(c.replys) }));

    return forkJoin({ users: this.getUsers(), comments: this.getComments() }).pipe(
      map(({ users, comments }) => {
        const usersMap = new Map(users.map((u) => [u.id, u]));
        const commentsMap = new Map<string, NestedCommentWithOwner>();

        comments.forEach((c) =>
          commentsMap.set(c.id, { ...c, owner: usersMap.get(c.ownerId)!, replys: [] }),
        );

        commentsMap.forEach((c) => {
          if (c.parentCommentId) commentsMap.get(c.parentCommentId)?.replys.push(c);
        });

        return sortNewest([...commentsMap.values()].filter((c) => !c.parentCommentId));
      }),
    );
  }
}
