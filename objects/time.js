class Time {
    constructor(store) {
        this.store = store;
    }

    newDay() {
        this.store.fire('newDay')
    }
}

module.exports = Time;