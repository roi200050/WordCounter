var express        = require('express');
var app            = express();
var bodyParser     = require("body-parser");

var wordCounter    = require("./utilities/wordCounter")
var extractInput    = require("./utilities/inputExtractor")

// Init wordCounter utility
var wc = new wordCounter()

// Parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


// POST /word/counter 
// {input: String}
app.post('/word/counter', function (req, res) {
    // Receives a text input and counts the number of appearances for each word in the input
    try{
        extractInput(req.body.input).then(words=>wc.count(words))
        res.status(200).send();
    }
    catch(e){
        res.status(400).send(e.message);
    }
});


// GET /word/statistics 
// QUERY {word: String}
app.get('/word/statistics', function (req, res) {
    // Receives a word and returns the number of times the word appeared so far (in all previous calls)
    res.send(""+wc.getCounter(req.query.word));
});





// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});