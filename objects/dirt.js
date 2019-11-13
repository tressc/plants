class Dirt {
    constructor(store) {
        this.store = store;
        this.status = 'dry';

        this.water = () => {
            this.status = 'wet';
        }

        const sun = () => {
            this.status = 'dry';
        }

        store.addEvent('rain', this.water);
        store.addEvent('sun', sun);
    }
}

module.exports = Dirt;