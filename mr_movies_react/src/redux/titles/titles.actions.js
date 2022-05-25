import TitlesActionTypes from "./titles.types";
import axios from "axios";

let PORT='';
// PORT='http://localhost:1020';

export const fetchGenreMoviesStart=()=>({
    type:TitlesActionTypes.FETCH_GENRE_MOVIES_START
})

export const fetchGenreMoviesSuccess=(moviesMap)=>({
    type:TitlesActionTypes.FETCH_GENRE_MOVIES_SUCCESS,
    payload:moviesMap
})

export const fetchGenreMoviesFailure=(message)=>({
    type:TitlesActionTypes.FETCH_GENRE_MOVIES_FAILURE,
    payload:message
})

export const fetchGenreMoviesAsync=()=>{
    return dispatch=>{
        dispatch(fetchGenreMoviesStart());

        axios.get(PORT+'/genreMovies')
        .then(response=>{
            console.log(response);
            const moviesMap=response.data;
            dispatch(fetchGenreMoviesSuccess(moviesMap));
        })
        .catch(err=>dispatch(fetchGenreMoviesFailure(err)))
    }
}

export const fetchFranchisesStart=()=>({
    type:TitlesActionTypes.FETCH_FRANCHISES_START
})

export const fetchFranchisesSuccess=(moviesMap)=>({
    type:TitlesActionTypes.FETCH_FRANCHISES_SUCCESS,
    payload:moviesMap
})

export const fetchFranchisesFailure=(message)=>({
    type:TitlesActionTypes.FETCH_FRANCHISES_FAILURE,
    payload:message
})

export const fetchFranchisesAsync=()=>{
    return dispatch=>{
        dispatch(fetchFranchisesStart());

        axios.get(PORT+'/franchises')
        .then(response=>{
            console.log(response);
            const moviesMap=response.data;
            dispatch(fetchFranchisesSuccess(moviesMap));
        })
        .catch(err=>dispatch(fetchFranchisesFailure(err)))
    }
}

export const fetchMovieWithIdStart=()=>({
    type:TitlesActionTypes.FETCH_MOVIE_WITH_ID_START
})

export const fetchMovieWithIdSuccess=(movie)=>({
    type:TitlesActionTypes.FETCH_MOVIE_WITH_ID_SUCCESS,
    payload:movie
})

export const fetchMovieWithIdFailure=(message)=>({
    type:TitlesActionTypes.FETCH_MOVIE_WITH_ID_FAILURE,
    payload:message
})

export const fetchMovieWithIdAsync=(movieId)=>{
    return dispatch=>{
        dispatch(fetchMovieWithIdStart());
        axios.post(PORT+'/getMovieWithId',
        {
            id:movieId
        },{
        headers:{
            'Content-Type': 'application/json'
        }})
        .then(response=>{
            const movie=response.data;
            dispatch(fetchMovieWithIdSuccess(movie));
        })
        .catch(err=>dispatch(fetchMovieWithIdFailure(err)))
    }
}

export const fetchMoviesByYearStart=()=>({
    type:TitlesActionTypes.FETCH_MOVIES_BY_YEAR_START
})

export const fetchMoviesByYearSuccess=(movies)=>({
    type:TitlesActionTypes.FETCH_MOVIES_BY_YEAR_SUCCESS,
    payload:movies
})

export const fetchMoviesByYearFailure=(message)=>({
    type:TitlesActionTypes.FETCH_MOVIES_BY_YEAR_FAILURE,
    payload:message
})

export const fetchMoviesByYearAsync=(year)=>{
    return dispatch=>{
        dispatch(fetchMoviesByYearStart());
        axios.post(PORT+'/byYear',
        {
            year:year
        },{
        headers:{
            'Content-Type': 'application/json'
        }})
        .then(response=>{
            const movies=response.data;
            dispatch(fetchMoviesByYearSuccess(movies));
        })
        .catch(err=>dispatch(fetchMoviesByYearFailure(err)))
    }
}

export const fetchTitleSuggestionsStart=()=>({
    type:TitlesActionTypes.FETCH_TITLE_SUGGESTIONS_START
})

export const fetchTitleSuggestionsSuccess=(movies)=>({
    type:TitlesActionTypes.FETCH_TITLE_SUGGESTIONS_SUCCESS,
    payload:movies
})

export const fetchTitleSuggestionsFailure=(message)=>({
    type:TitlesActionTypes.FETCH_TITLE_SUGGESTIONS_FAILURE,
    payload:message
})

export const fetchTitleSuggestionsAsync=(movie_id)=>{
    return dispatch=>{
        dispatch(fetchTitleSuggestionsStart());
        axios.post(PORT+'/titleSuggestions',
        {
            movie_id:movie_id
        },{
        headers:{
            'Content-Type': 'application/json'
        }})
        .then(response=>{
            const movies=response.data;
            dispatch(fetchTitleSuggestionsSuccess(movies));
        })
        .catch(err=>dispatch(fetchTitleSuggestionsFailure(err)))
    }
}

export const fetchWishlistStart=()=>({
    type:TitlesActionTypes.FETCH_WISHLIST_START
})

export const fetchWishlistSuccess=(movieMap)=>({
    type:TitlesActionTypes.FETCH_WISHLIST_SUCCESS,
    payload:movieMap
})

export const fetchWishlistFailure=(message)=>({
    type:TitlesActionTypes.FETCH_WISHLIST_FAILURE,
    payload:message
})

export const fetchWishlistAsync=(movieIds)=>{
    return async dispatch=>{
        dispatch(fetchWishlistStart());
        Promise.all(
            movieIds.map(
                (movieId)=>{
                    return axios.post(
                        PORT+'/getMovieWithId',
                        {
                            id:movieId
                        },{
                        headers:{
                            'Content-Type': 'application/json'
                        }}
                    ).then((response)=>{
                        return response.data
                    }).catch(err=>dispatch(fetchWishlistFailure(err)));
                }
            )
        ).then((value)=>{
            dispatch(fetchWishlistSuccess({bio:null,movies:value}))
        });
    }        
}

export const fetchRecentlyViewedStart=()=>({
    type:TitlesActionTypes.FETCH_RECENTLY_VIEWED_START
})

export const fetchRecentlyViewedSuccess=(movieMap)=>({
    type:TitlesActionTypes.FETCH_RECENTLY_VIEWED_SUCCESS,
    payload:movieMap
})

export const fetchRecentlyViewedFailure=(message)=>({
    type:TitlesActionTypes.FETCH_RECENTLY_VIEWED_FAILURE,
    payload:message
})

export const fetchRecentlyViewedAsync=(movieIds)=>{
    return async dispatch=>{
        dispatch(fetchRecentlyViewedStart());
        Promise.all(
            movieIds.map(
                (movieId)=>{
                    return axios.post(
                        PORT+'/getMovieWithId',
                        {
                            id:movieId
                        },{
                        headers:{
                            'Content-Type': 'application/json'
                        }}
                    ).then((response)=>{
                        return response.data
                    }).catch(err=>dispatch(fetchRecentlyViewedFailure(err)));
                }
            )
        ).then((value)=>{
            dispatch(fetchRecentlyViewedSuccess({bio:null,movies:value}))
        });
    }        
}

export const fetchSearchStart=()=>({
    type:TitlesActionTypes.FETCH_SEARCH_START
});

export const fetchSearchSuccess=(movieMap)=>({
    type:TitlesActionTypes.FETCH_SEARCH_SUCCESS,
    payload:movieMap
});

export const fetchSearchFailure=(message)=>({
    title:TitlesActionTypes.FETCH_SEARCH_FAILURE,
    payload:message
});

export const fetchSearchAsync=(value)=>{
    return dispatch=>{
        dispatch(fetchSearchStart());
        axios.post(PORT+'/search',
        {
            value:value,
            number:30
        },
        {
            headers:{
                'Content-Type': 'application/json'
        }}
        )
        .then(response=>{
            const movies=response.data;
            dispatch(fetchSearchSuccess(movies));
        }).catch(err=>dispatch(fetchSearchFailure(err)));
    }
}

export const fetchSuggestionsStart=()=>({
    type:TitlesActionTypes.FETCH_SUGGESTIONS_START
})

export const fetchSuggestionsSucess=(suggestions)=>({
    type:TitlesActionTypes.FETCH_SUGGESTIONS_SUCCESS,
    payload:suggestions
})

export const fetchSuggestionsFailure=(message)=>({
    type:TitlesActionTypes.FETCH_SUGGESTIONS_FAILURE,
    payload:message
})

export const fetchSuggestionsAsync=(value)=>{
    return dispatch=>{
        dispatch(fetchSuggestionsStart());
        axios.post(PORT+'/searchSuggestions',
        {
            value:value
        },
        {
            headers:{
                'Content-Type': 'application/json'
        }}
        )
        .then(response=>{
            const search=response.data;
            dispatch(fetchSuggestionsSucess(search));
        }).catch(err=>dispatch(fetchSuggestionsFailure(err)));
    }
}

export const fetchTopMoviesStart=()=>({
    type:TitlesActionTypes.FETCH_TOP_MOVIES_START,
})

export const fetchTopMoviesSuccess=(movies)=>({
    type:TitlesActionTypes.FETCH_TOP_MOVIES_SUCCESS,
    payload:movies
})

export const fetchTopMoviesFailure=(message)=>({
    type:TitlesActionTypes.FETCH_TOP_MOVIES_FAILURE,
    payload:message
})

export const fetchTopMoviesAsync=()=>{
    return dispatch=>{
        dispatch(fetchTopMoviesStart());
        axios.get(PORT+'/top250').then(
            (response)=>{
                dispatch(fetchTopMoviesSuccess(response.data))
            }
        ).catch(err=>dispatch(fetchTopMoviesFailure(err)))
    }
}

export const fetchTopHitsStart=()=>({
    type:TitlesActionTypes.FETCH_TOP_HITS_START,
})

export const fetchTopHitsSuccess=(movies)=>({
    type:TitlesActionTypes.FETCH_TOP_HITS_SUCCESS,
    payload:movies
})

export const fetchTopHitsFailure=(message)=>({
    type:TitlesActionTypes.FETCH_TOP_HITS_FAILURE,
    payload:message
})

export const fetchTopHitsAsync=()=>{
    return dispatch=>{
        dispatch(fetchTopHitsStart());
        axios.get(PORT+'/topHits').then(
            (response)=>{
                dispatch(fetchTopHitsSuccess(response.data))
            }
        ).catch(err=>dispatch(fetchTopHitsFailure(err)))
    }
}

export const fetchRecentsStart=()=>({
    type:TitlesActionTypes.FETCH_RECENTS_START,
})

export const fetchRecentsSuccess=(movies)=>({
    type:TitlesActionTypes.FETCH_RECENTS_SUCCESS,
    payload:movies
})

export const fetchRecentsFailure=(message)=>({
    type:TitlesActionTypes.FETCH_RECENTS_FAILURE,
    payload:message
})

export const fetchRecentsAsync=()=>{
    return dispatch=>{
        dispatch(fetchRecentsStart());
        axios.get(PORT+'/recents').then(
            (response)=>{
                dispatch(fetchRecentsSuccess(response.data))
            }
        ).catch(err=>dispatch(fetchRecentsFailure(err)))
    }
}

export const fetchSortMoviesStart=()=>({
    type:TitlesActionTypes.FETCH_SORT_MOVIES_START
})

export const fetchSortMoviesSuccess=(movies)=>({
    type:TitlesActionTypes.FETCH_SORT_MOVIES_SUCCESS,
    payload:movies
})

export const fetchSortMoviesFailure=(message)=>({
    type:TitlesActionTypes.FETCH_SORT_MOVIES_FAILURE,
    payload:message
})

export const fetchSortMoviesAsync=(value="id",query={})=>{
    return dispatch=>{
        dispatch(fetchSortMoviesStart());
        axios.post(PORT+'/sortMovies',
        {
            column:value,
            sorted:-1,
            query:query
        },
        {
            headers:{
                'Content-Type': 'application/json'
        }}
        )
        .then(response=>{
            const movies=response.data;
            dispatch(fetchSortMoviesSuccess(movies));
        }).catch(err=>dispatch(fetchSortMoviesFailure(err)));
    }
}