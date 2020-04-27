const LocalStorage = require('node-localstorage').LocalStorage;

class wordCounter {
    constructor() {
        // wordCounterStorage is a thrd party library
        //      that will store each word as key, 
        //      and number of appearance as value
        this.wordCounterStorage = new LocalStorage('./WordCounterStorage');
    }

    count(input) {
        let counter;
        // Iterate over words
        input.split(/[\s,-/|]+/).forEach((word) => {
            // Clean the input, And lowercase
            word = word.toLowerCase().match(/[a-z-]+/g);
            // Add to count
            if (word){
                counter = this.wordCounterStorage.getItem(word)
                if(counter){
                    this.wordCounterStorage.setItem(word, ++counter);
                    return;
                }
                this.wordCounterStorage.setItem(word, 1);
            }
        });
    }

    getCounter(word) {
        let count = this.wordCounterStorage.getItem(word.toLowerCase())
        return count || 0;
    }
}

module.exports = wordCounter