const request = require('request');


TEST_STRING_INPUT = "HeLLo WoRld"


function postText(input) {
    return new Promise((resolve, reject) => {
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
    });
}

function getCounter(word) {
    return new Promise((resolve, reject) => {
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
    })
}

testWordCount()

async function testWordCount() {
    // Test regular string
    console.log("\n------------------------------------------------------------")
    console.log("Post: " + TEST_STRING_INPUT);
    try{
        await postText(TEST_STRING_INPUT);
        console.log("Post finished");
    }
    catch(e){
        console.log("Post FAILED");
    }

    console.log("\n------------------------------------------------------------")
    console.log(TEST_STRING_INPUT.split(" ")[0] +
        ": " +
        await getCounter(TEST_STRING_INPUT.split(" ")[0]));

    // Check non existing
    console.log("\n------------------------------------------------------------")
    console.log("NonExisting" +
        ": " +
        await getCounter("NonExisting"));




    // Test file support
    console.log("\n------------------------------------------------------------")
    console.log("Post: " + "LOCAL_PATH\\alice_in_wonderland.txt");
    try{
        // await postText("LOCAL_PATH\\alice_in_wonderland.txt");
        await postText("C:\\Users\\Roi\\Downloads\\alice_in_wonderland.txt");
        console.log("Post finished");
    }
    catch(e){
        console.log("Post FAILED");
    }

    console.log("\n------------------------------------------------------------")
    console.log("long: " +
        await getCounter("long"));

    setTimeout(async() => {
        console.log("\n------------------------------------------------------------")
        console.log("After timeout:");
        console.log("long: " +
            await getCounter("long"));
    }, 1000);


    // // Test url support
    console.log("\n------------------------------------------------------------")
    console.log("Post: " + "https://gist.githubusercontent.com/phillipj/4944029/raw/75ba2243dd5ec2875f629bf5d79f6c1e4b5a8b46/alice_in_wonderland.txt");
    try{
        await postText("https://gist.githubusercontent.com/phillipj/4944029/raw/75ba2243dd5ec2875f629bf5d79f6c1e4b5a8b46/alice_in_wonderland.txt");
        console.log("Post finished");
    }
    catch(e){
        console.log("Post FAILED");
    }

    console.log("\n------------------------------------------------------------")
    console.log("long" +
        ": " +
        await getCounter("long"));

    setTimeout(async() => {
        console.log("\n------------------------------------------------------------")
        console.log("After timeout:")
        console.log("long" +
            ": " +
            await getCounter("long"));
    }, 3000);


    // Test url support
    console.log("\n------------------------------------------------------------")
    console.log("Post: " + "http://www.norvig.com/big.txt");
    try {
        await postText("http://www.norvig.com/big.txt");
        console.log("Post finished");
    } catch (e) {
        console.log("Post FAILED");
    }

    console.log("\n------------------------------------------------------------")
    console.log("long" +
        ": " +
        await getCounter("long"));

    setTimeout(async () => {
        console.log("\n------------------------------------------------------------")
        console.log("After timeout:")
        console.log("long" +
            ": " +
            await getCounter("long"));
    }, 3000);

}