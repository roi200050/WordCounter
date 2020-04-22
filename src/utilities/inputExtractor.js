const fs = require('fs');
const path = require('path');

function extractInput(input){
    if(typeof input != 'string' || input.length == 0){
        throw "Cannot find input parameter (it could be empty?)"
    }
    // A nice performance improvemant can be something like yield return here each word from file (to handle large files)
    if(isValidFilePath(input)){
        return new Promise((resolve) => {
            fs.readFile(input, 'utf8', function(err, contents) {
                resolve(contents);
            });
            
        });
    }
    if(isValidUrl(input)){
        return new Promise((resolve, reject) => {
            const http      = require('http'),
                  https     = require('https');
    
            let client = http;
    
            if (url.toString().indexOf("https") === 0) {
                client = https;
            }
    
            client.get(input, (resp) => {
                let data = '';
    
                // A nice improvement can be send words in chunks like we wanted to do with files
                resp.on('data', (chunk) => {
                    data += chunk;
                });
    
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    resolve(data);
                });
    
            }).on("error", (err) => {
                reject(err);
            });
        });
    }
    return new Promise((resolve=>resolve(input)))
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
function isValidFilePath(string){
    return string !== path.basename(string)
}

module.exports = extractInput
