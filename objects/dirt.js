class Dirt {
    constructor(store) {
        this.store = store;
        this.status = 'dry';

        const water = () => {
            this.status = 'wet';
        }

        const sun = () => {
            this.status = 'dry';
        }

        store.addEvent('rain', water);
        store.addEvent('sun', sun);

        this.water = water;
    }
}

module.exports = Dirt;