import { createSelector } from "reselect";

const selectMovies=state=>state.movies;

export const selectGenreMovies=createSelector(
    [selectMovies],
    movies=>movies.genreMovies
)

export const selectIsGenreMoviesFetching=createSelector(
    [selectMovies],
    movies=>movies.isFetching
)

export const selectIsGenreMoviesLoaded=createSelector(
    [selectMovies],
    movies=>movies.genreMovies.length>0
)

export const selectFranchises=createSelector(
    [selectMovies],
    movies=>movies.franchises
)

export const selectIsFranchisesFetching=createSelector(
    [selectMovies],
    movies=>movies.isFetchingFranchises
)

export const selectIsFranchisesLoaded=createSelector(
    [selectMovies],
    movies=>movies.franchises.length>0
)

export const selectMovieWithId=createSelector(
    [selectMovies],
    movies=>movies.movieWithId
)

export const selectMovieWithIdFetching=createSelector(
    [selectMovies],
    movies=>movies.isFetchingMovie
)

export const selectMovieWithIdLoaded=createSelector(
    [selectMovies],
    movies=>!!movies.movieWithId
)

export const selectMoviesByYear=createSelector(
    [selectMovies],
    movies=>movies.moviesByYear
)

export const selectMoviesByYearFetching=createSelector(
    [selectMovies],
    movies=>movies.isFetchingMoviesByYear
)

export const selectMoviesByYearLoaded=createSelector(
    [selectMovies],
    movies=>!!movies.moviesByYear
)

export const selectWishlist=createSelector(
    [selectMovies],
    movies=>movies.wishlist
)

export const selectIsWishlistFetching=createSelector(
    [selectMovies],
    movies=>movies.isFetchingWishlist
)

export const selectIsWishlistLoaded=createSelector(
    [selectMovies],
    movies=>!!movies.wishlist
)

export const selectRecentlyViewed=createSelector(
    [selectMovies],
    movies=>movies.recentlyViewed
)

export const selectIsRecentlyViewedFetching=createSelector(
    [selectMovies],
    movies=>movies.isFetchingRecentlyViewed
)

export const selectIsRecentlyViewedLoaded=createSelector(
    [selectMovies],
    movies=>!!movies.recentlyViewed
)

export const selectSearchMovies=createSelector(
    [selectMovies],
    movies=>movies.searchMovies
)

export const selectSearchMoviesFetching=createSelector(
    [selectMovies],
    movies=>movies.isSearching
)

export const selectSearchMoviesLoaded=createSelector(
    [selectMovies],
    movies=>!!movies.searchMovies
)

export const selectSuggestions=createSelector(
    [selectMovies],
    movies=>movies.suggestions
)

export const selectSuggestionsFetching=createSelector(
    [selectMovies],
    movies=>movies.isSuggesting
)

export const selectSuggestionsLoaded=createSelector(
    [selectMovies],
    movies=>!!movies.suggestions
)

export const selectTopMovies=createSelector(
    [selectMovies],
    movies=>movies.topMovies
)

export const selectTopMoviesFetching=createSelector(
    [selectMovies],
    movies=>movies.isFetchingTop
)

export const selectTopMoviesLoaded=createSelector(
    [selectMovies],
    movies=>!!movies.topMovies
)

export const selectTopHits=createSelector(
    [selectMovies],
    movies=>movies.topHits
)

export const selectTopHitsFetching=createSelector(
    [selectMovies],
    movies=>movies.isFetchingTopHits
)

export const selectTopHitsLoaded=createSelector(
    [selectMovies],
    movies=>!!movies.topHits
)

export const selectRecents=createSelector(
    [selectMovies],
    movies=>movies.recents
)

export const selectRecentsFetching=createSelector(
    [selectMovies],
    movies=>movies.isFetchingRecents
)

export const selectRecentsLoaded=createSelector(
    [selectMovies],
    movies=>!!movies.recents
)

export const selectTitleSuggestions=createSelector(
    [selectMovies],
    movies=>movies.titleSuggestions
)

export const selectTitleSuggestionsFetching=createSelector(
    [selectMovies],
    movies=>movies.isFetchingTitleSuggestions
)

export const selectTitleSuggestionsLoaded=createSelector(
    [selectMovies],
    movies=>!!movies.titleSuggestions
)

export const selectSortMovies=createSelector(
    [selectMovies],
    movies=>movies.sortMovies
)

export const selectSortMoviesFetching=createSelector(
    [selectMovies],
    movies=>movies.isFetchingSort
)

export const selectSortMoviesLoaded=createSelector(
    [selectMovies],
    movies=>!!movies.sortMovies
)
    