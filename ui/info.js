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
        const { cursorX, cursorY } = this.state;

        this.term.white()
        this.term.moveTo(x, y);

        this.term('cursorX: ' + cursorX)
        this.term.moveTo(x, y + 1)('cursorY: ' + cursorY)
    }
}

module.exports = Info;
