class Observable {
    constructor() {
        this._events = {};
    }

    addEvent(name, cb) {
        if (!this._events[name]) {
            this._events[name] = new Set();
        }

        this._events[name].add(cb);
    }

    removeEvent(name, cb) {
        if (!this._events[name]) return;

        this._events[name].delete(cb);
    }

    fire(name, ...args) {
        if (!this._events[name]) return;

        this._events[name].forEach(cb => {
            cb(...args);
        })
    }
}

module.exports = Observable;