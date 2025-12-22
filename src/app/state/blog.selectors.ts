import { createPropertySelectors, createSelector } from '@ngxs/store';
import { CommentWithOwner } from '../models/models';
import { BlogState, BlogStateModel } from './blog.state';

export class BlogSelectors {
  static slices = createPropertySelectors<BlogStateModel>(BlogState);

  static firstUser = createSelector([BlogState], (state) => state.commentsWithOwners[0]);

  static filteredUserComments(searchQuery: string) {
    return createSelector([BlogState], (state) => {
      if (!searchQuery) {
        return state.commentsWithOwners;
      } else {
        const query = searchQuery.toLowerCase();
        return state.commentsWithOwners.filter((comment: CommentWithOwner) =>
          comment.owner.displayName.toLowerCase().includes(query),
        );
      }
    });
  }
}
