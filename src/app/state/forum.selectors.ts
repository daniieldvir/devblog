import { createPropertySelectors, createSelector } from '@ngxs/store';
import { Article } from '../models/article.models';
import { CommentWithOwner } from '../models/comment.models';
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

  static categories = createSelector([ForumState], (state) => {
    const all = state.articles.map((article: Article) => article.category);
    return [...new Set(all)];
  });

  static articlesByCategory(category: string) {
    return createSelector([ForumState], (state) => {
      if (category === 'All') {
        return state.articles;
      } else {
        return state.articles.filter((article: Article) => article.category === category);
      }
    });
  }
}
