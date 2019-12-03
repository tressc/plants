const UIComponent = require('../abstracts/uiComponent.js');


class Info extends UIComponent {
    constructor(store, term, config) {
        super(store, term, config);

        this.state = {
            cursorX: 0,
            cursorY: 0
        };

        this.store.addEvent('moveCursor', newPositions => {
            this.state = newPositions;
            this.draw();
        })

        this.draw();
        this.normalBorder();
    }

    draw() {
        const {x, y} = this.offset;
        const { cursorX, cursorY }= this.state;
        const idx = cursorY * 6 + cursorX;

        this.term.white();
        this.term.moveTo(x, y);

        this.term('WHEAT');
        this.term.moveTo(x, y + 1)(`AGE: ${'0' + (idx % 10)} DAYS`);

        if (this.store.state.fruits.includes(idx)) {
            this.term(' - ');
            this.term.magenta('HARVEST');
        } else {
            this.term('          ');
        }

        this.term.moveTo(x, y + 2)
        if (this.store.state.idxs.includes(idx)) {
            this.term.cyan('NEEDS WATER');
        } else {
            this.term('           ');
        }
    }
}

module.exports = Info;
