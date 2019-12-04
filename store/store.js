const Observable = require('../abstracts/observable.js');

class Store extends Observable {
    constructor(state={}) {
        super();
        this.state = state;

        this.addEvent('changeFocus', componentName => {
            this.setState({
                activeComponent: componentName,
                justChanged: true
            });
            setTimeout(() => {
                this.setState({justChanged: false})
            }, 0)
        })
    }

    setState(newState) {
        this.state = Object.assign({}, this.state, newState);
    }
}

module.exports = Store;