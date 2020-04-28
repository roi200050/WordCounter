const storage = require('node-persist');

class wordCounter {
    constructor() {
        // wordCounterStorage is a thrd party library
        //      that will store each word as key, 
        //      and number of appearance as value
        storage.init( {dir: './wordCounts'});
        this.wordCounterStorage = storage;
        this.cacheWordCounterStorage = new Map()
    }

    async count(input) {
        let counter, word;
        // Iterate over words
        for (word of input.split(/[\s,-/|]+/)) {
            // Clean the input, And lowercase
            word = word.toLowerCase().match(/[a-z-]+/);
            // Add to count
            if (word) {
                word = word[0]
                counter = this.cacheWordCounterStorage[word] || await this.wordCounterStorage.getItem(word)
                if (counter) {
                    this.wordCounterStorage.setItem(word, ++counter);
                    this.cacheWordCounterStorage.set(word, counter)
                } else {
                    this.wordCounterStorage.setItem(word, 1);
                    this.cacheWordCounterStorage.set(word, 1)
                }
            }
        }
    }

    async getCounter(word) {
        let count = this.cacheWordCounterStorage[word] || await this.wordCounterStorage.getItem(word.toLowerCase())
        return count || 0;
    }
}

module.exports = wordCounter