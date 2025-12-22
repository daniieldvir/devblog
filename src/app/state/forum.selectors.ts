import { createPropertySelectors, createSelector } from '@ngxs/store';
import { CommentWithOwner } from '../models/models';
import { ForumState, ForumStateModel } from './forum.state';

export class ForumSelectors {
  static slices = createPropertySelectors<ForumStateModel>(ForumState);

  static firstUser = createSelector([ForumState], (state) => state.commentsWithOwners[0]);

  static filteredUserComments(searchQuery: string) {
    return createSelector([ForumState], (state) => {
      if (!searchQuery) {
        return state.commentsWithOwners;
      } else {
        const query = searchQuery.toLowerCase();
        return state.commentsWithOwners.filter((comment: CommentWithOwner) =>
          comment.owner.displayName.toLowerCase().includes(query)
        );
      }
    });
  }
}
