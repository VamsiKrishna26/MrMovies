import TitlesActionTypes from "./titles.types";

const INITIAL_STATE={
    genreMovies:{Genres:{movies:{}}},
    franchises:{Franchises:{movies:{}}},
    sortMovies:{movies:{}},
    wishlist:{movies:{}},
    recentlyViewed:{movies:{}},
    topHits:{movies:{}},
    moviesByYear:{movies:{}},
    titleSuggestions:{movies:{}},
    recents:{movies:{}},
    movieWithId:null,
    searchMovies:null,
    suggestions:[],
    topMovies:null,
    isFetching:false,
    isFetchingMovie:true,
    isSearching:true,
    isSuggesting:false,
    isFetchingTop:true,
    isFetchingSort:false,
    isFetchingFranchises:false,
    isFetchingWishlist:false,
    isFetchingRecentlyViewed:false,
    isFetchingTopHits:false,
    isFetchingMoviesByYear:false,
    isFetchingTitleSuggestions:false,
    isFetchingRecents:false,
    message:null,
};

const MoviesReducer=(state=INITIAL_STATE,action)=>{
    switch(action.type){

        case TitlesActionTypes.FETCH_GENRE_MOVIES_START:
            return{
                ...state,
                isFetching:true
            }
        case TitlesActionTypes.FETCH_GENRE_MOVIES_SUCCESS:
            return{
                ...state,
                genreMovies:action.payload,
                isFetching:false
            }
        case TitlesActionTypes.FETCH_GENRE_MOVIES_FAILURE:
            return{
                ...state,
                message:action.payload,
                isFetching:false
            }

        
        case TitlesActionTypes.FETCH_FRANCHISES_START:
            return{
                ...state,
                isFetchingFranchises:true
            }
        case TitlesActionTypes.FETCH_FRANCHISES_SUCCESS:
            return{
                ...state,
                franchises:action.payload,
                isFetchingFranchises:false
            }
        case TitlesActionTypes.FETCH_FRANCHISES_FAILURE:
            return{
                ...state,
                message:action.payload,
                isFetchingFranchises:false
            }

        
        case TitlesActionTypes.FETCH_MOVIES_BY_YEAR_START:
            return{
                ...state,
                isFetchingMoviesByYear:true
            }
        case TitlesActionTypes.FETCH_MOVIES_BY_YEAR_SUCCESS:
            return{
                ...state,
                moviesByYear:action.payload,
                isFetchingMoviesByYear:false
            }
        case TitlesActionTypes.FETCH_MOVIES_BY_YEAR_FAILURE:
            return{
                ...state,
                message:action.payload,
                isFetchingMoviesByYear:false
            }
    
            
        case TitlesActionTypes.FETCH_MOVIE_WITH_ID_START:
            return{
                ...state,
                isFetchingMovie:true
            }
        case TitlesActionTypes.FETCH_MOVIE_WITH_ID_SUCCESS:
            return{
                ...state,
                movieWithId:action.payload,
                isFetchingMovie:false
            }
        case TitlesActionTypes.FETCH_MOVIE_WITH_ID_FAILURE:
            return{
                ...state,
                isFetchingMovie:false
            }


        case TitlesActionTypes.FETCH_WISHLIST_START:
            return{
                ...state,
                isFetchingWishlist:true
            }
        case TitlesActionTypes.FETCH_WISHLIST_SUCCESS:
            return{
                ...state,
                isFetchingWishlist:false,
                wishlist:action.payload
            }
        case TitlesActionTypes.FETCH_WISHLIST_FAILURE:
            return{
                ...state,
                isFetchingWishlist:false,
                message:action.payload
            }

        case TitlesActionTypes.FETCH_RECENTLY_VIEWED_START:
            return{
                ...state,
                isFetchingRecentlyViewed:true
            }
        case TitlesActionTypes.FETCH_RECENTLY_VIEWED_SUCCESS:
            return{
                ...state,
                isFetchingRecentlyViewed:false,
                recentlyViewed:action.payload
            }
        case TitlesActionTypes.FETCH_RECENTLY_VIEWED_FAILURE:
            return{
                ...state,
                isFetchingRecentlyViewed:false,
                message:action.payload
            }
        

        case TitlesActionTypes.FETCH_SEARCH_START:
            return{
                ...state,
                isSearching:true
            }
        case TitlesActionTypes.FETCH_SEARCH_SUCCESS:
            return{
                ...state,
                searchMovies:action.payload,
                isSearching:false
            }
        case TitlesActionTypes.FETCH_SEARCH_FAILURE:
            return{
                ...state,
                isFetching:false
            }

        
        case TitlesActionTypes.FETCH_SUGGESTIONS_START:
            return{
                ...state,
                isSuggesting:true
            }
        case TitlesActionTypes.FETCH_SUGGESTIONS_SUCCESS:
            return{
                ...state,
                suggestions:action.payload,
                isSuggesting:false
            }
        case TitlesActionTypes.FETCH_SUGGESTIONS_FAILURE:
            return{
                ...state,
                message:action.payload,
                isSuggesting:false
            }


        case TitlesActionTypes.FETCH_TOP_MOVIES_START:
            return{
                ...state,
                isFetchingTop:true
            }
        case TitlesActionTypes.FETCH_TOP_MOVIES_SUCCESS:
            return{
                ...state,
                topMovies:action.payload,
                isFetchingTop:false
            }
        case TitlesActionTypes.FETCH_TOP_MOVIES_FAILURE:
            return{
                ...state,
                message:action.payload,
                isFetchingTop:false
            }

        
        case TitlesActionTypes.FETCH_TOP_HITS_START:
            return{
                ...state,
                isFetchingTopHits:true
            }
        case TitlesActionTypes.FETCH_TOP_HITS_SUCCESS:
            return{
                ...state,
                topHits:action.payload,
                isFetchingTopHits:false
            }
        case TitlesActionTypes.FETCH_TOP_HITS_FAILURE:
            return{
                ...state,
                message:action.payload,
                isFetchingTopHits:false
            }

        
        case TitlesActionTypes.FETCH_RECENTS_START:
            return{
                ...state,
                isFetchingRecents:true
            }
        case TitlesActionTypes.FETCH_RECENTS_SUCCESS:
            return{
                ...state,
                recents:action.payload,
                isFetchingRecents:false
            }
        case TitlesActionTypes.FETCH_RECENTS_FAILURE:
            return{
                ...state,
                message:action.payload,
                isFetchingRecents:false
            }


        case TitlesActionTypes.FETCH_TITLE_SUGGESTIONS_START:
            return{
                ...state,
                isFetchingTitleSuggestions:true
            }
        case TitlesActionTypes.FETCH_TITLE_SUGGESTIONS_SUCCESS:
            return{
                ...state,
                titleSuggestions:action.payload,
                isFetchingTitleSuggestions:false
            }
        case TitlesActionTypes.FETCH_TITLE_SUGGESTIONS_FAILURE:
            return{
                ...state,
                message:action.payload,
                isFetchingTitleSuggestions:false
            }

        
        case TitlesActionTypes.FETCH_SORT_MOVIES_START:
            return{
                ...state,
                isFetchingSort:true
            }
        case TitlesActionTypes.FETCH_SORT_MOVIES_SUCCESS:
            return{
                ...state,
                isFetchingSort:false,
                sortMovies:action.payload
            } 
        case TitlesActionTypes.FETCH_SORT_MOVIES_FAILURE:
            return{
                ...state,
                isFetchingSort:false,
                message:action.payload
            }    
        default:
            return {
                ...state,
            };
    }
}

export default MoviesReducer;