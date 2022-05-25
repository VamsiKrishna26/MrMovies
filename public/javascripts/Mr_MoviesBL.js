var Mr_MoviesDAL=require('./Mr_MoviesDAL');

Mr_MoviesBL = {}

Mr_MoviesBL.search=function(value,number){
    return Mr_MoviesDAL.search(value,number).then(function(response){
        return response;
    })
}

Mr_MoviesBL.search_poster=function(value){
    return Mr_MoviesDAL.search_poster(value).then(function(response){
        return response;
    })
}

Mr_MoviesBL.genreMovies=function(){
    return Mr_MoviesDAL.genreMovies().then(function(response){
        return response;
    });
}

Mr_MoviesBL.franchises=function(){
    return Mr_MoviesDAL.franchises().then(function(response){
        return response;
    });
}

Mr_MoviesBL.getMovieWithId=function(id){
    return Mr_MoviesDAL.getMovieWithId(id).then(function(response){
        return response;
    })
}

Mr_MoviesBL.top_movies=function(){
    return Mr_MoviesDAL.top_movies().then(function(response){
        return response;
    })
}

Mr_MoviesBL.search_suggestions=function(value){
    return Mr_MoviesDAL.search_suggestions(value).then(function(response){
        return response;
    })
}

Mr_MoviesBL.top250=function(){
    return Mr_MoviesDAL.top250().then(function(response){
        return response;
    })
}

Mr_MoviesBL.sort_movies=function(column,sorted,query){
    if(query["$and"]){
        const string=(query["$and"][3].genres);
        const obj=JSON.parse(string);
        const regex=new RegExp(obj.source,obj.flags);
        query["$and"][3].genres=regex;
    }
    return Mr_MoviesDAL.sort_movies(column,sorted,query).then(function(response){
        return response;
    })
}

Mr_MoviesBL.hits=function(movie_id){
    return Mr_MoviesDAL.hits(movie_id).then(()=>{return true})
}

Mr_MoviesBL.addComment=function(movie_id,comment_to_add){
    return Mr_MoviesDAL.addComment(movie_id,comment_to_add).then(()=>{return true;})
}

Mr_MoviesBL.deleteComment=function(movie_id,comment_id){
    return Mr_MoviesDAL.deleteComment(movie_id,comment_id).then(()=>{return true;})
}

Mr_MoviesBL.replyComment=function(movie_id,comment_id,comment_to_add){
    return Mr_MoviesDAL.replyComment(movie_id,comment_id,comment_to_add).then(()=>{return true;})
}

Mr_MoviesBL.topHits=function(){
    return Mr_MoviesDAL.topHits().then(function(response){
        return response;
    })
}

Mr_MoviesBL.recents=function(){
    return Mr_MoviesDAL.recents().then(function(response){
        return response;
    })
}

Mr_MoviesBL.byYear=function(value){
    return Mr_MoviesDAL.byYear(value).then(function(response){
        return response;
    })
}

Mr_MoviesBL.titleSuggestions=function(movie_id){
    return Mr_MoviesDAL.titleSuggestions(movie_id).then(function(response){
        return response;
    })
}

module.exports=Mr_MoviesBL;