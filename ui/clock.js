const UIComponent = require('../abstracts/uiComponent.js');


class Clock extends UIComponent {
    constructor(store, term, config) {
        super(store, term, config);

        this.store.addEvent('newHour', this.draw)

        this.draw();
        this.normalBorder();
    }

    draw() {
        const {x, y} = this.offset;
        const { timeName, dayName } = this.store.state.time;
        const { weather } = this.store.state;

        this.term.white()

        this.term.moveTo(x, y);
        if (weather === 'rain') {
            this.term.cyan('\u2602 ');
        } else if (weather === 'sun') {
            this.term.yellow(' \u2600 ');
        } else if (weather === 'frost') {
            this.term(' \u2744 ')
        }
        this.term.white()
        this.term(`${timeName} ${dayName}`)
    }
}

module.exports = Clock;
