const fs = require('fs');
const path = require('path');
const url = require("url");

// Async function that will execute the counter process on an input
function asyncExtractInput(input, wc) {
    // Not valid input
    if (typeof input != 'string' || input.length == 0) {
        return new Promise((resolve, reject) => {
            reject("Cannot find input parameter (it could be empty?)")
        })
    }

    //Check for URL
    if (isValidUrl(input)) {
        const http = require('http'),
            https = require('https');

        let client = http;

        if (input.toString().indexOf("https") === 0) {
            client = https;
        }

        client.get(input, (resp) => {
            resp.on('data', (chunk) => {
                wc.count(chunk + "");
            });
        }).on("error", (err) => {
            reject(err);
        });
        console.log("resolve")
        return Promise.resolve(null)
    }

    //Check for file
    // A nice performance improvemant can be something like yield return here each word from file (to handle large files)
    if (isValidFilePath(input)) {
        return new Promise((resolve, reject) => {
            fs.readFile(input, 'utf8', function (err, contents) {
                if (contents) {
                    wc.count(contents)
                    resolve();
                } else {
                    reject("file is empty")
                }
            });

        });
    }

    // Execute input as a string
    wc.count(input)
    return Promise.resolve()
}

// I assume that www.google.com is not valid URL (missing scheme)
function isValidUrl(string) {
    var urlRegex = '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$';
    var url = new RegExp(urlRegex, 'i');
    return string.length < 2083 && url.test(string);
}

function isValidFilePath(string) {
    return string !== path.basename(string)
}

module.exports = asyncExtractInput