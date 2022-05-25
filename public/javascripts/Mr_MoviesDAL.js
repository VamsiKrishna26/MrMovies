const  ObjectID  = require('mongodb').ObjectId;
var connection = require('./connection');

var Mr_MoviesDAL = {}

Mr_MoviesDAL.search=function(value,number,votes=20000){
    return connection.getConnection().then(function(db){
        var regex= new RegExp(value,'i');
        return db.collection("TMDB_Movies").aggregate([
            {$match:{
                $and:[{$or:[{"title":regex},{"overview":regex},{"directors":regex},{"actors":regex},{"genres":regex}]}
            ,{"total_votes":{$gte:votes}}]
                }
            },
            {$sample:{size:parseInt(number)}}])
            .toArray().then(async function(list1){
                let bio=await Mr_MoviesDAL.search_name(value);
                let object1={'bio':bio,'movies':list1}
                return object1;
        })
    })
}

Mr_MoviesDAL.titleSuggestions=function(movie_id){
    return connection.getConnection().then(function(db){
        return db.collection("TMDB_Movies").findOne(ObjectID(movie_id)).then(async function(movie){
            let director;
            let actors;
            let genres;
            let year;
            if(movie.directors) director=movie.directors[0];
            if(movie.actors) actors=movie.actors.slice(0,2);
            if(movie.genres) genres=movie.genres.slice(0,2);
            if(movie.release_date) year=movie.release_date.split('-')[0];
            let years=[year,''+(parseInt(year)+1),''+(parseInt(year)-1),(parseInt(year)+2),''+(parseInt(year)-2)]
            let string='('+years.map((year)=>year).join('|')+')';
            let yearsRegex=new RegExp(string,'i');
            return {"movies":await db.collection("TMDB_Movies").aggregate([
                {$match:{
                    $and:[
                        {$or:[
                            {"directors":director},{"actors":{$in:actors}}
                        ]},
                        {"total_votes":{$gte:50000}},{"genres":{$in:genres}},{"_id":{$ne:ObjectID(movie_id)}}
                    ]
                }},
                {$sample:{size:20}}
            ]).toArray() }
        })
    })
}

Mr_MoviesDAL.byYear=function(value){
    return connection.getConnection().then(function(db){
        var regex=new RegExp(value);
        return db.collection("TMDB_Movies").aggregate([
            {$match:{$and:[{"release_date":regex},{"total_votes":{$gte:100000}}]}},{$sample:{size:25}}
        ]).toArray().then(
            async function(list1){
                return {"movies":list1}
            }
        )
    })
}

Mr_MoviesDAL.search_name=function(value){
    return connection.getConnection().then(function(db){
        return db.collection("imdb_names").findOne({"name":value},{projection:
            {"bio":1,"date_of_birth":1,"place_of_birth":1,"spouses_string":1,"height":1,_id:0}}).then(function(list1){
            return list1;
        })
    })
}

Mr_MoviesDAL.genreMovies=async function(){
    const genres=['Action','Drama','Kids','Horror','Thriller','Comedy','Science Fiction','Romance'];
    let genre='';
    let movies={};
    for (genre in genres){
        let data=await Mr_MoviesDAL.search(genres[genre],15,200000).then(response=>{return response});
        movies[genres[genre]]=data;
    }
    return movies;
}

Mr_MoviesDAL.franchises=async function(){
    const genres=['Harry Potter','Indiana Jones', 'Pirates of the Caribbean', 'Star Wars', 'Mad Max' ,'Toy Story', 'Lord of the Rings',
    'James Bond',  'Mummy', 'Matrix'];
    let genre='';
    let movies={};
    for (genre in genres){
        let data=await Mr_MoviesDAL.search(genres[genre],15).then(response=>{return response});
        movies[genres[genre]]=data;
    }
    return movies;
}

Mr_MoviesDAL.getMovieWithId=function(id){
    return connection.getConnection().then(function(db){
        return db.collection("TMDB_Movies").findOne(ObjectID(id)).then(async function(movie){
            return movie;
        })
    })
}

Mr_MoviesDAL.hits=function(movie_id){
    return connection.getConnection().then(function(db){
        return db.collection("TMDB_Movies").updateOne({_id:ObjectID(movie_id)},{$inc:{"hits":1}}).then((response)=>{return true;})
    })
}

Mr_MoviesDAL.addComment=function(movie_id,comment_to_add){
    return connection.getConnection().then(function(db){
        return db.collection("TMDB_Movies").findOne({_id:ObjectID(movie_id)}).then(async(obj)=>{
            let discussions=obj.discussions;
            discussions=[...discussions,comment_to_add];
            await db.collection("TMDB_Movies").updateOne({_id:ObjectID(movie_id)},{$set:{"discussions":discussions}});
        })
    })
}

Mr_MoviesDAL.deleteComment=function(movie_id,comment_id){
    return connection.getConnection().then(function(db){
        return db.collection("TMDB_Movies").findOne({_id:ObjectID(movie_id)}).then(async(obj)=>{
            let discussions=obj.discussions;
            const deleteComment=(sliceDiscussions,comment_id)=>{
                for(let i in sliceDiscussions){
                    if(sliceDiscussions[i].id===comment_id){
                        sliceDiscussions.splice(i,1);
                        return
                    }
                    else{
                        deleteComment(sliceDiscussions[i].discussions,comment_id);
                    }
                }
            }
            deleteComment(discussions,comment_id);
            discussions=[...discussions];
            await db.collection("TMDB_Movies").updateOne({_id:ObjectID(movie_id)},{$set:{"discussions":discussions}});
        })
    })
}

Mr_MoviesDAL.replyComment=function(movie_id,comment_id,comment_to_add){
    return connection.getConnection().then(function(db){
    return db.collection("TMDB_Movies").findOne({_id:ObjectID(movie_id)}).then(async(obj)=>{
        let discussions=obj.discussions;
        const replyComment=async (sliceDiscussions,comment_id,comment)=>{
            for(let i in sliceDiscussions){
                if(sliceDiscussions[i].id===comment_id){
                    sliceDiscussions[i].discussions.push(comment);
                    return
                }
                else{
                    replyComment(sliceDiscussions[i].discussions,comment_id,comment);
                }
            }
        }
        replyComment(discussions,comment_id,comment_to_add);
        discussions=[...discussions];
        await db.collection("TMDB_Movies").updateOne({_id:ObjectID(movie_id)},{$set:{"discussions":discussions}});
    })
})
}


Mr_MoviesDAL.search_suggestions=function(value){
    return connection.getConnection().then(async function(db){
        var regex= new RegExp(value,'i');
        let list1=await db.collection("TMDB_Movies").find({"title":regex}).project({"title":1,"_id":0}).limit(10).toArray();
        result_list=[]
        for (var search in list1){
            result_list.push(list1[search]['title']+'')
        }
        let list2=await db.collection("TMDB_Movies").find({"actors":regex}).project({"actors":1,"_id":0}).toArray();
        for (var search in list2){
            let actors=list2[search]['actors'].slice(0,5);
            if(actors){
                for (actor in actors){
                    let suggestion=actors[actor];
                    if(suggestion.match(regex)){
                    result_list.push(suggestion+'');
                    }
                }
            }
        }
        let list3=await db.collection("TMDB_Movies").find({"directors":regex}).project({"directors":1,"_id":0}).limit(4).toArray();
        for (var search in list3){
            let directors=list2[search]['directors']
            if(directors){
                for (actor in directors){
                    let suggestion=directors[actor];
                    if(suggestion.match(regex)){
                    result_list.push(suggestion+'');
                    }
                }
            }
        }
        let set1=new Set(result_list)
        return [...set1].slice(0,15);
    })
}

Mr_MoviesDAL.top250=function(){
    return connection.getConnection().then(async function(db){
        top250alltimeimdb=await db.collection("TMDB_Movies").find({"total_votes":{$gte:250000}}).sort({"weighted_average_vote":-1}).limit(250).toArray();
        // return top250popular;
        // top250populartmdb= await db.collection("TMDB_Movies").find({"popularity":{$gte:20}}).sort({"popularity":-1}).limit(250).toArray();
        return {'imdb':top250alltimeimdb};
    })
}

Mr_MoviesDAL.topHits=function(){
    return connection.getConnection().then(async function(db){
        return db.collection("TMDB_Movies").find({}).sort({"hits":-1}).limit(20).toArray().then(function(response){
            return {'movies':response}
        });
    })
}

Mr_MoviesDAL.sort_movies=function(column,sorted,query1){
    return connection.getConnection().then(async function(db){
        var query={};
        query[column]=sorted;
        let movies=await db.collection("TMDB_Movies")
        .find({$and:[{"total_votes":{$gte:50000}},query1]})
        .sort(query).limit(50).toArray();
        return {'bio':null,'movies':movies};
    })
}

Mr_MoviesDAL.recents=function(){
    return connection.getConnection().then(function(db){
        var regex=new RegExp("(2017|2016)",'i');
        let result=db.collection("TMDB_Movies").find({release_date:regex}).sort({"total_votes":-1}).limit(20).toArray().then(function(response){
            let list1=response.sort(()=>Math.random()-0.5);
            return{'movies':list1}
        })
        return result;
    })
}


Mr_MoviesDAL.top_movies=function(){
    return connection.getConnection().then(async function(db){
        // await db.collection("TMDB_Movies").find({}).forEach(async function(obj){
        //         obj.discussions=[];
        //         db.collection("TMDB_Movies").save(obj);
        //     })

        // await db.collection("TMDB_Movies").find({}).forEach(async function(obj){
        //         response=await db.collection("Temp").find({"movie_id":obj.imdb_id}).limit(10).toArray();
        //         obj.reviews=response;
        //         db.collection("TMDB_Movies").save(obj);
        //     })

        // await db.collection("TMDB_Movies").updateMany({"hits":{$exists:false}},{$set:{"hits":0}});
        // let new_list=[]
        // await db.collection("TMDB_Movies").find({"actors": {$exists: true}}).forEach(function(obj) { 
        //    for(let actor in obj.actors){
        //        new_list.push(obj.actors[actor])
        //    }
        // });
        // await db.collection("TMDB_Movies").find({"directors": {$exists: true}}).forEach(function(obj) { 
        //     for(let actor in obj.directors){
        //         new_list.push(obj.directors[actor])
        //     }
        //  });
        // let new_set=new Set(new_list);
        // await db.collection('imdb_names').deleteMany({"name":{$nin:new_list}});
        // await db.collection("TMDB_Movies").find({"directors": {$exists: true}}).forEach(function(obj) { 
        //         if(obj.directors){
        //             list1=obj.directors.split(',');
        //             list2=[]
        //             for(let actor in list1){
        //                 list2.push(list1[actor].trim())
        //             }
        //             obj.directors=list2;
        //             db.collection("TMDB_Movies").save(obj);
        //             }
        //     });

        // await db.collection("TMDB_Movies").find({"budget": {$exists: true}}).forEach(function(obj) { 
        //     obj.budget = parseFloat(obj.budget,10);
        //     db.collection("TMDB_Movies").save(obj);
        // });

            // await db.collection("TMDB_Movies").find({}).forEach(async function(obj){
            //     response=await db.collection("RottenTomatoes").findOne({"movie_title":obj.title},{projection:{"rotten_tomatoes_link":1,"_id":0}});
            //     let rotten=response.rotten_tomatoes_link;
            //     obj.rotten=rotten;
            //     db.collection("TMDB_Movies").save(obj);
            // })


            // console.log(new_list[0]);
            // // let list2=await db.collection("TMDB_Movies").find({}).project({"imdb_id":1,_id:0}).toArray();
            // // new_list2=[]
            // // for(let title in list2){
            // //     new_list2.push(list2[title]["imdb_id"]);
            // // }
            // // console.log(new_list2.length);
            // // await db.collection('IMDB_Rating').deleteMany({"imdb_title_id":{$nin:new_list2}});
            // for (let title in new_list){
            //     await db.collection("TMDB_Movies").updateOne({"title":new_list[title]["movie_title"]},
            //     {$set:{"genres":new_list[title]['genres']}})
            // }
            // // await db.collection('TMDB_Movies').deleteMany({"id":{$nin:new_list}});
            return true;
        })
}
module.exports=Mr_MoviesDAL;