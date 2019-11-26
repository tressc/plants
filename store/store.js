const Observable = require('../abstracts/observable.js');

class Store extends Observable {
    constructor() {
        super();
        this.state = {
            weather: 'frost',
            time: {
                timeName: '06:00AM',
                dayName: 'SUN'
            }
        };
    }

    setState(newState) {
        this.state = Object.assign({}, this.state, newState);
    }
}

module.exports = Store;