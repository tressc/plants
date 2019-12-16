const UIComponent = require('../abstracts/uiComponent.js');
const rightAlign = require('./utils/rightAlign');


class GenericMenu extends UIComponent {
    constructor(store, term, config, eventOverride=false) {
        super(store, term, config);

        this.menuItems = config.menuItems;
        this.menuSelect = 0;

        if (eventOverride === false) {
            this.store.addEvent('changeFocus', (name) => {
                if (name === this.name) {
                    this.draw();
                    this.focusBorder();
                } else {
                    this.clearHighlight();
                    this.menuSelect = 0;
                    this.normalBorder();
                }
            })
        }

        this.draw();
        this.normalBorder();
        this.clearHighlight();
        this.collectInput();
    }

    clearHighlight() {
        const { x, y } = this.offset;
        const select = this.menuSelect;

        this.term.moveTo(x, y + select).white(rightAlign(this.menuItems[select], this.size.width));
    }

    collectInput() {
        this.term.on( 'key' , (name, matches, data) => {
            if (this.saving) return;

            if (this.store.state.activeComponent === this.name) {
                if (['UP', 'DOWN'].includes(name)) {
                    this.moveSelect(name);
                } else if (name === 'ENTER' || name === 'ESCAPE') {
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
        const { width } = this.size;

        for (let i = 0; i < menuItems.length; i++) {
            this.term.moveTo(x, y + i);

            for (let j = 0; j < width; j++) {
                this.term(' ');
            }
        }
    }

    draw() {
        const { x, y } = this.offset;
        const { menuItems, menuSelect } = this;
        const { width } = this.size;

        for (let i = 0; i < menuItems.length; i++) {
            this.term.moveTo(x, y + i);

            if (i === menuSelect) {
                this.term.bgWhite.black.bold(rightAlign(menuItems[i], width));
            } else {
                this.term.white(rightAlign(menuItems[i], width));
            }
        }
    }
}

module.exports = GenericMenu;