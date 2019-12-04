const Dirt = require('./dirt.js')

class Field {
    constructor(store) {
        this.store = store;
        this.tiles = [];

        for (let i = 0; i < 6; i++) {
            const row = [];
            
            for (let j = 0; j < 6; j++) {
                row.push(new Dirt(this.store));
            }
            this.tiles.push(row);
        }
        this.store.setState({field: this.tiles});
    }
}

module.exports = Field;