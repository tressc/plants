class Dirt {
    constructor(store) {
        this.store = store;
        this.status = 'dry';
        this.plant = null;

        this.water = () => {
            if (Math.floor(Math.random() * 2) < 1) {
                this.status = 'wet';
            }
        }

        const sun = () => {
            if (Math.floor(Math.random() * 2) < 1) {
                this.status = 'dry';
            }
        }

        store.addEvent('rain', this.water);
        store.addEvent('sun', sun);
    }
}

module.exports = Dirt;