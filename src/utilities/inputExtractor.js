const fs = require('fs');
const path = require('path');

function extractInput(input, wc) {
    if (typeof input != 'string' || input.length == 0) {
        return new Promise((resolve, reject) => {
            reject("Cannot find input parameter (it could be empty?)")
        })
    }
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
        return Promise.resolve(null)
    }
    // A nice performance improvemant can be something like yield return here each word from file (to handle large files)
    if (isValidFilePath(input)) {
        return new Promise((resolve, reject) => {
            fs.readFile(input, 'utf8', function (err, contents) {
                if (contents) {
                    resolve(contents);
                } else {
                    reject("file is empty")
                }
            });

        });
    }
    return new Promise((resolve => resolve(input)))
}

// I assume that www.google.com is not valid URL (missing scheme)
function isValidUrl(string) {
    try {
        new URL(string);
    } catch (ex) {
        return false;
    }
    return true;
}

function isValidFilePath(string) {
    return string !== path.basename(string)
}

module.exports = extractInput