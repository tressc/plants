const Observable = require('./observable.js');

class Plant {
    constructor(store, dirt, seed, config) {
        this.store = store;
        this.dirt = dirt;
        this.dna = seed.dna;
        this.name = seed.toUpperCase();
        this.traits = config.traits;
        this.season = config.season;
        this.age = 0;
        this.sprites = config.sprites;
        this.color = config.color;

        this.sprite = this.randomSeedSprite();

        this.store.addEvent('newDay', () => {
            if (this.dirt.status === 'wet') {
                this.age += 1;

                if (this.sprites[this.age]) {
                    this.sprite = this.sprites[this.age];
                }
            }
        })
    }

    randomSeedSprite() {
        const seeds = [
            '\u281D',
            '\u281C',
            '\u282E',
            '\u2823',
            '\u280E',
        ]

        const idx = Math.floor(Math.random() * seeds.length);
        // return seeds[idx];
        return '\u10FB';
    }
}

module.exports = Plant;