var express = require('express');
var bodyParser = require('body-parser');
var router = require('./routes/routing');
const path = require('path');
var cors = require('cors');
var app = express();
app.use(cors());

app.use(bodyParser.json());


app.use('/', router);

const PORT=process.env.PORT||1020;

console.log(path.join(__dirname,'../mr_movies_react/build/index.html'));
app.use(express.static("mr_movies_react/build"));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname,'../mr_movies_react/build/index.html'))
})

app.listen(PORT);

console.log("Server listening in port 5000");