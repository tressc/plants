const Observable = require('../abstracts/observable.js');

class Store extends Observable {
    constructor() {
        super();
        this.state = {};
    }

    setState(newState) {
        this.state = Object.assign({}, this.state, newState);
    }
}

module.exports = Store;