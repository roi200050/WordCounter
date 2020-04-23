# WordCounter

# REST API

The REST API to the words counter app is described below.

## Get list of Things

### word

`GET /word/statistics`

    var options = {
        uri: 'http://localhost:3000/word/statistics',
        qs: {
            word: word
        }
    };

    request(options, function (error, response) {
        if (error || response.statusCode != 200) {
            reject("Getting error response")
        }
        resolve(response.body)
    });

#### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    NUMBER_OF_APPEARANCE


`POST /word/counter`

    var options = {
        uri: 'http://localhost:3000/word/counter',
        method: 'POST',
        json: {
            input: input
        }
    };

    request(options, function (error, response) {
        if (error || response.statusCode != 200) {
            reject("Getting error response")
        }
        resolve()
    });

#### Response

    HTTP/1.1 200 OK
    Date: Thu, 24 Feb 2011 12:36:30 GMT
    Status: 200 OK
    Connection: close
    Content-Type: application/json
    Content-Length: 2

    {}

# Test client

You can use *testWordCount.js* in *testClient* folder to check the rest api system

    node .\testWordCount.js
