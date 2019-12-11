const UIComponent = require('../abstracts/uiComponent.js');
const rightAlign = require('./utils/rightAlign');


class Items extends UIComponent {
    constructor(store, term, config) {
        super(store, term, config);

        this.heldItems = config.heldItems;
        this.draw();
        this.normalBorder();
        this.collectInput();
    }

    collectInput() {
        this.term.on( 'key' , (name, matches, data) => {
            if (this.saving) return;

            if (this.store.state.activeComponent === this.name) {
                if (name === 'ESCAPE') {
                    if (this.store.state.justChanged) {
                        return;
                    } else {
                        this.store.fire('changeFocus', 'field');
                        this.store.fire('timeStart');
                    }
                    
                }
            }
        });
    }

    draw() {
        const { x, y } = this.offset;
        const { heldItems } = this;
        const { width } = this.size;

        for (let i = 0; i < heldItems.length; i++) {
            this.term.moveTo(x, y + i);

            // if (i === menuSelect) {
            //     this.term.bgWhite.black.bold(rightAlign(heldItems[i], width));
            // } else {
            if (i === 2) {
                this.term.magenta(rightAlign(heldItems[i], width));
            } else {
                this.term.white(rightAlign(heldItems[i], width));
            }
            // }
        }
        this.term.moveTo(x, y + 2).magenta('\u2605')
    }
}

module.exports = Items;
