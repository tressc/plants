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

    fire(name, ...args) {
        if (!this._events[name]) return;

        this._events[name].forEach(cb => {
            cb(this.state, ...args);
        })
        this._events['any'].forEach(cb => {
            cb(this.state, ...args);
        })
    }
}

class Store extends Observable {
    constructor() {
        super();
        this.state = {
            weather: 'sun'
        };

        this.addEvent('any', () => {
            this.print();
        });
    }

    print() {
        console.log(this.state.weather);
    }
}

class Weather {
    constructor(store) {
        this.store = store;

        this.weatherTypes = [
            'sun',
            'rain',
            'snow'
        ]

        this.store.addEvent('newDay', () => {
            const type = this.chooseRandom();
            this[type]();
        })

        for (let type of this.weatherTypes) {
            this.store.addEvent(type, (state) => {
                state.weather = type;
            });
        }
    }

    chooseRandom() {
        const idx = Math.floor(Math.random() * 3);
        return this.weatherTypes[idx];
    }

    rain() {
        this.store.fire('rain');
    }

    snow() {
        this.store.fire('snow');
    }

    sun() {
        this.store.fire('sun');
    }
}

class Time {
    constructor(store) {
        this.store = store;
    }

    newDay() {
        this.store.fire('newDay')
    }
}

a = new Store();
b = new Weather(a);
c = new Time(a);

c.newDay();
c.newDay();
c.newDay();
c.newDay();
c.newDay();
c.newDay();
c.newDay();
c.newDay();
c.newDay();
c.newDay();
c.newDay();
c.newDay();

