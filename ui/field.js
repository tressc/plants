const UIComponent = require('../abstracts/uiComponent.js');


class Field extends UIComponent {
    constructor(store, term, config) {
        super(store, term, config);

        this.store.addEvent('newDay', this.draw);
        this.store.addEvent('updateField', this.draw);

        this.draw();
        this.focusBorder();
        this.collectInput();
    }

    collectInput() {
        this.term.on( 'key' , (name, matches, data) => {
            if (this.store.state.activeComponent === this.name) {
                if (name === 'ENTER') {
                    if (this.store.state.justChanged) {
                        return;
                    }
                    this.store.fire('changeFocus', 'menu');
                    this.store.fire('timePause');
                } else if (name === ' ') {
                    this.store.fire('interact', {
                        x: this.store.state.cursorX,
                        y: this.store.state.cursorY,
                        item: this.store.state.currentItem
                    });
                    this.draw();
                }
            }
        });
    }

    draw() {
        const { x, y } = this.offset;
        const { field } = this.store.state;

        for (let i = 0; i < field.length; i++) {
            const row = field[i];
            this.term.moveTo(x + 2, y + 1 + i * 2);

            for (let j = 0; j < row.length; j++) {
                const tile = row[j];
                const plant = tile.plant;

                if (tile.status === 'wet') {
                    this.term.cyan('\u2818');
                } else {
                    this.term(' ');
                }

                if (plant) {
                    this.term.color256(plant.color)(plant.sprite + ' ');
                } else {
                    this.term('  ');
                }
            }
        }
    }
}

module.exports = Field;