
var express = require('express');
var routing = express.Router();

var Mr_MoviesBL=require('../public/javascripts/Mr_MoviesBL');

routing.post('/search',function(req,res,next){
    let value=req.body.value;
    let number=req.body.number;
    Mr_MoviesBL.search(value,number).then(function(response){
        res.json(response);
    })
})

routing.post('/searchPoster',function(req,res,next){
    let value=req.body.value;
    Mr_MoviesBL.search_poster(value).then(function(response){
        res.json(response);
    })
})

routing.get('/genreMovies',function(req,res,next){
    Mr_MoviesBL.genreMovies().then((response)=>{
        res.json(response);
    })
})

routing.get('/franchises',function(req,res,next){
    Mr_MoviesBL.franchises().then((response)=>{
        res.json(response);
    })
})

routing.post('/getMovieWithId',function(req,res,next){
    let id=req.body.id;
    Mr_MoviesBL.getMovieWithId(id).then((response)=>{
        res.json(response);
    })
})

routing.get('/topMovies',function(req,res,next){
    Mr_MoviesBL.top_movies().then(function(response){
        res.json(response);
    })
})

routing.post('/searchSuggestions',function(req,res,next){
    let value=req.body.value;
    Mr_MoviesBL.search_suggestions(value).then(function(response){
        res.json(response);
    })
})

routing.get('/top250',function(req,res,next){
    Mr_MoviesBL.top250().then(function(response){
        res.json(response);
    })
})

routing.post('/sortMovies',function(req,res,next){
    let column=req.body.column;
    let sorted=req.body.sorted;
    if(req.body.query) {query=req.body.query};
    Mr_MoviesBL.sort_movies(column,sorted,query).then(function(response){
        res.json(response);
    })
})

routing.post('/hits',function(req,res,next){
    let movie_id=req.body.movie_id;
    Mr_MoviesBL.hits(movie_id).then((response)=>{
        res.json(true);
    })
})

routing.post('/addComment',function(req,res,next){
    let movie_id=req.body.movie_id;
    let comment_to_add=req.body.comment_to_add;
    Mr_MoviesBL.addComment(movie_id,comment_to_add).then((response)=>{
        res.json(true);
    })
})

routing.post('/deleteComment',function(req,res,next){
    let movie_id=req.body.movie_id;
    let comment_id=req.body.comment_id;
    Mr_MoviesBL.deleteComment(movie_id,comment_id).then((response)=>{
        res.json(true);
    })
})

routing.post('/replyComment',function(req,res,next){
    let movie_id=req.body.movie_id;
    let comment_to_add=req.body.comment_to_add;
    let comment_id=req.body.comment_id;
    Mr_MoviesBL.replyComment(movie_id,comment_id,comment_to_add).then((response)=>{
        res.json(true);
    })
})

routing.get('/topHits',function(req,res,next){
    Mr_MoviesBL.topHits().then((response)=>{
        res.json(response);
    })
})

routing.get('/recents',function(req,res,next){
    Mr_MoviesBL.recents().then((response)=>{
        res.json(response);
    })
})

routing.post('/byYear',function(req,res,next){
    let year=req.body.year;
    Mr_MoviesBL.byYear(year).then((response)=>{
        res.json(response)
    })
})

routing.post('/titleSuggestions',function(req,res,next){
    let movie_id=req.body.movie_id;
    Mr_MoviesBL.titleSuggestions(movie_id).then((response)=>{
        res.json(response);
    })
})
module.exports=routing;
