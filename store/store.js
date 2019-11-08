const Observable = require('../abstracts/observable.js');

class Store extends Observable {
    constructor() {
        super();
        this.state = {};
    }

    setState(newState) {
        this.state = Object.assign({}, this.state, newState);
        console.log(this.state.weather)
    }
}

module.exports = Store;