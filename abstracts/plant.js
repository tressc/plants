const Observable = require('./observable.js');

class Plant extends Observable {
    constructor(seed, config) {
        this.dna = seed.dna;
        this.name = seed.name;
        this.traits = config.traits;
        this.season = config.season;
        this.daysToMature = config.daysToMature;
        this.age = 0;
    }
}

module.exports = Plant;