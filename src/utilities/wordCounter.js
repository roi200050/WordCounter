class wordCounter{
    constructor(){
        // wordsCount Map will store each word as key, 
        //   and number of appearance as value
        this.wordsCount = {} ;
    }

    count(input){
        return new Promise((resolve) => {
            // Iterate over words
            input.split(" ").forEach(word => {
                // Clean the input, And lowercase
                word = word.replace(/[,0-9_-]+/g, '').toLowerCase();

                // Add to count
                if(this.wordsCount[word]){
                    this.wordsCount[word]++
                    return
                }
                this.wordsCount[word] = 1
            });
            resolve()
        });
    }

    getCounter(word) {
        return this.wordsCount[word.toLowerCase()]?
            this.wordsCount[word.toLowerCase()]:
            0
    }
}

module.exports = wordCounter
