const UIComponent = require('../abstracts/uiComponent.js');


class Clock extends UIComponent {
    constructor(store, term, config) {
        super(store, term, config);

        this.store.addEvent('newHour', this.draw)
    }

    draw() {
        const {x, y} = this.offset;
        const { timeName, dayName } = this.store.state.time;
        const { weather } = this.store.state;

        this.term.white()

        this.term.moveTo(x, y)('\u250F');
        for (let i = 0; i < 15; i++) {
            this.term('\u2501');
        }
        this.term('\u2513')

        this.term.moveTo(x, y + 1)('\u2503');
        if (weather === 'rain') {
            this.term.cyan(' \u2602 ');
        } else if (weather === 'sun') {
            this.term.yellow(' \u2600 ');
        } else if (weather === 'frost') {
            this.term(' \u2744 ')
        }
        this.term.white()
        this.term(`${timeName} ${dayName} \u2503`)

        this.term.moveTo(x, y + 2)('\u2517');
        for (let i = 0; i < 15; i++) {
            this.term('\u2501');
        }
        this.term('\u251B')
    }
}

module.exports = Clock;