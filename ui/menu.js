const UIComponent = require('../abstracts/uiComponent.js');
const rightAlign = require('./utils/rightAlign');


class Menu extends UIComponent {
    constructor(store, term, config) {
        super(store, term, config);

        this.menuItems = config.menuItems;
        this.menuSelect = 0;
        this.saving = false;

        this.store.addEvent('changeFocus', (name) => {
            if (name === this.name) {
                this.draw();
                this.focusBorder();
            } else {
                this.menuSelect = 0;
                this.clear();
                this.clearBorder();
            }
        })

        this.collectInput();
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
                    } else if (this.menuSelect === 3) {
                        this.loadMask();
                        return;
                    } else if (this.menuSelect === 1) {
                        this.store.fire('changeFocus', 'items');
                        return;
                    } else {
                        this.store.fire('changeFocus', 'field');
                        this.store.fire('timeStart');
                    }
                    
                }
            }
        });
    }

    loadMask() {
        this.saving = true;
        const { x, y } = this.offset;
        const frames = [
			"⠋",
			"⠙",
			"⠹",
			"⠸",
			"⠼",
			"⠴",
			"⠦",
			"⠧",
			"⠇",
			"⠏"
        ];
        let idx = 0;
        const interval = setInterval(() => {
            this.term.moveTo(x, y + 3).bgWhite.black(frames[idx]);
            idx = (idx + 1) % frames.length;
        }, 80);
        
        setTimeout(() => {
            this.saving = false;
            clearInterval(interval);
            this.term.moveTo(x, y + 3).bgWhite(' ');
            this.store.fire('changeFocus', 'field');
            this.store.fire('timeStart');
        }, 2000);
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

            for (let j = 0; j < width; j++) { // don't hard code this
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

module.exports = Menu;