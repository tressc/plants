const UIComponent = require('../abstracts/uiComponent.js');
const term = require( 'terminal-kit' ).terminal;


class Menu extends UIComponent {
    constructor(store, term, config) {
        super(store, term, config);

        this.menuItems = config.menuItems;
        this.menuSelect = config.menuItems;
    }

    clear() {
        const {x, y} = this.offset;
        const { menuItems} = this;


        for (let i = 0; i < menuItems.length; i++) {
            this.term.moveTo(x, y + i);

            for (let j = 0; j < menuItems[i].length; j++) {
                term(' ');
            }
        }
    }

    draw() {
        const { x, y } = this.offset;
        const { menuItems, menuSelect } = this;

        for (let i = 0; i < menuItems.length; i++) {
            this.term.moveTo(x, y + i);

            if (i === menuSelect) {
                this.term.bgWhite.black.bold(menuItems[i]);
            } else {
                this.term.white(menuItems[i]);
            }
        }
    }
}

module.exports = Menu;