const UIComponent = require('../abstracts/uiComponent.js');


class Menu extends UIComponent {
    constructor(store, term, config) {
        super(store, term, config);

        this.menuItems = config.menuItems;
        this.menuSelect = 0;

        this.store.addEvent('changeFocus', (name) => {
            if (name === this.name) {
                this.draw();
                this.focusBorder();
            } else {
                this.clear();
                this.clearBorder();
            }
        })

        // this.draw();
        // this.normalBorder();
        this.longest = this.longest.bind(this);
        this.collectInput();
    }

    collectInput() {
        this.term.on( 'key' , (name, matches, data) => {
            if (this.store.state.activeComponent === this.name) {
                if (['UP', 'DOWN'].includes(name)) {
                    this.moveSelect(name);
                } else if (name === 'ENTER') {
                    if (this.store.state.justChanged) {
                        return;
                    }
                    this.store.fire('changeFocus', 'field');
                    this.store.fire('timeStart');
                }
            }
        });
    }

    moveSelect(dir) {
        if (dir === 'UP' && this.menuSelect > 0) {
            this.menuSelect -= 1;
        } else if (dir === 'DOWN' && this.menuSelect < this.menuItems.length - 1) {
            this.menuSelect += 1;
        }
        this.draw();
    }

    clear() {
        const { x, y } = this.offset;
        const { menuItems } = this;
        const max = this.longest();


        for (let i = 0; i < menuItems.length; i++) {
            this.term.moveTo(x, y + i);

            for (let j = 0; j < max + 6; j++) { // don't hard code this
                this.term(' ');
            }
        }
    }

    longest() {
        const { menuItems } = this;

        let max = 0;

        for (let i = 0; i < menuItems.length; i++) {
            const menuItem = menuItems[i];
            if (menuItem.length > max) {
                max = menuItem.length;
            }
        }
        return max;
    }

    rightAlign(item) {
        let max = this.longest();
        let buffer = '';

        while (max + 6 > item.length) { // don't hard code this either
            buffer += ' ';
            max--;
        }
        return buffer + item;
    }

    draw() {
        const { x, y } = this.offset;
        const { menuItems, menuSelect } = this;

        for (let i = 0; i < menuItems.length; i++) {
            this.term.moveTo(x, y + i);

            if (i === menuSelect) {
                this.term.bgWhite.black.bold(this.rightAlign(menuItems[i]));
            } else {
                this.term.white(this.rightAlign(menuItems[i]));
            }
        }
    }
}

module.exports = Menu;