const request = require('request');


STRING_INPUT = "HeLLo WoRld"


function postText(input) {
    var options = {
        uri: 'http://localhost:3000/word/counter',
        method: 'POST',
        json: {
            input: input
        }
    };

    request(options, function (error, response) {
        if (error || response.statusCode != 200) {
            throw "Getting error response"
        }
    });

}

function getCounter(word) {
    var options = {
        uri: 'http://localhost:3000/word/statistics',
        qs: { word: word}
    };

    request(options, function (error, response) {
        if (error || response.statusCode != 200) {
            throw "Getting error response"
        }
        console.log(word + ": " + response.body)
    });
}

// Test regular string
console.log("Post: HeLLo WoRld")
postText(STRING_INPUT);

getCounter("hEllo")
getCounter("World")
getCounter("Roi")