class Weather {
    constructor(store) {
        this.store = store;

        this.weatherTypes = [
            'sun',
            'rain',
            'frost'
        ]

        this.store.addEvent('newDay', () => {
            const type = this.chooseRandom();
            this.store.fire(type);
        })

        for (let type of this.weatherTypes) {
            this.store.addEvent(type, () => {
                this.store.setState({
                    weather: type
                })
            });
        }
    }

    chooseRandom() {
        const idx = Math.floor(Math.random() * this.weatherTypes.length);
        return this.weatherTypes[idx];
    }
}

module.exports = Weather;