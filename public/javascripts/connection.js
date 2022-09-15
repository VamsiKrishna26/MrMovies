var MongoClient = require('mongodb').MongoClient;
var url = <MongoDBUrl>;
// var url = "mongodb://localhost:27017/Mr_Movies1";
var connection={};

var mongoClient=MongoClient.connect(url);
connection.getConnection = async function(){
    return mongoClient.then(function(database){
        let db=database.db();
        return db;
    }).catch(function (error) {
        throw new Error("Could not connect to Database");
    })
}
module.exports=connection;
