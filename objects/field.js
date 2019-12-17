const Dirt = require('./dirt.js')
const Plant = require('../abstracts/plant.js') // for testing
const plantConfig = require('./plants/configs.js');

class Field {
    constructor(store) {
        this.store = store;
        this.tiles = [];

        for (let i = 0; i < 6; i++) {
            const row = [];
            
            for (let j = 0; j < 6; j++) {
                const dirt = new Dirt(this.store);

                if (Math.floor(Math.random() * 10) > 1) {
                    const type = ['rice', 'mikan'][Math.floor(Math.random() * 2)]
                    const plant = new Plant(this.store, dirt, type, plantConfig[type]);
                    dirt.plant = plant;
                }
                
                row.push(dirt);
            }
            this.tiles.push(row);
        }
        this.store.setState({field: this.tiles});
        this.store.addEvent('interact', ({x, y, item}) => {
            if (item === 'watering can') {
                this.tiles[y][x].water();
                this.store.fire('updateInfo');
            } else if (item === 'scythe') {
                // TODO: this needs to first grab the plant and remove all its event subscriptions from the store!
                // TODO: this should also harvest the plant if mature/bearing fruit
                this.tiles[y][x].plant = null;
                this.store.fire('updateInfo');
                this.store.fire('updateField');
            }
        })
    }


}

module.exports = Field;