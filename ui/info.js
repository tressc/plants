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
        this.store.addEvent('newDay', this.draw);


        this.draw();
        this.normalBorder();
    }

    draw() {
        const {x, y} = this.offset;
        const { cursorX, cursorY }= this.state;
        const tile = this.store.state.field[cursorY][cursorX];

        const idx = cursorY * 6 + cursorX;

        this.term.white();
        this.term.moveTo(x, y);
        this.term('        ')
        this.term.moveTo(x, y);

        if (tile.plant) {
            this.term(tile.plant.name);
        } else {
            this.term('dirt');
        }

        this.term.moveTo(x, y + 2)
        if (tile.plant && tile.status === 'dry') {
            this.term.cyan('needs water');
        } else {
            this.term('           ');
        }
    }
}

module.exports = Info;
