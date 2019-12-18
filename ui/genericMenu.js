const UIComponent = require('../abstracts/uiComponent.js');
const rightAlign = require('./utils/rightAlign');


class GenericMenu extends UIComponent {
    constructor(store, term, config, eventOverride=false) {
        super(store, term, config);

        this.menuItems = config.menuItems;
        this.menuSelect = 0;
        this.top = 0;

        if (eventOverride === false) {
            this.store.addEvent('changeFocus', (name) => {
                if (name === this.name) {
                    this.draw();
                    this.focusBorder();
                } else {
                    this.clearHighlight();
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
        const { menuSelect, top } = this;

        let height;
        if (top > 0) {
            height = this.size.height - 1;
        } else {
            height = menuSelect;
        }

        this.term.moveTo(x, y + height).white(rightAlign(this.menuItems[menuSelect], this.size.width));
    }

    moveSelect(dir) {
        const { menuSelect, menuItems, top } = this;
        const { height } = this.size;

        if (dir === 'UP' && menuSelect > 0) {
            this.menuSelect -= 1;
            if (top > 0) {
                this.top -= 1;
            }
        } else if (dir === 'DOWN' && menuSelect < menuItems.length - 1) {
            this.menuSelect += 1;
            if (menuSelect >= height - 1) {
                this.top += 1;
            }
        }

        this.draw();
    }

    draw() {
        const { x, y } = this.offset;
        const { menuItems, menuSelect, top } = this;
        const { width, height } = this.size;

        for (let i = 0; i < height; i++) {
            this.term.moveTo(x, y + i);

            if (i + top === menuSelect) {
                this.term.bgWhite.black.bold(rightAlign(menuItems[i + top], width));
            } else {
                this.term.white(rightAlign(menuItems[i + top], width));
            }
        }
    }
}

module.exports = GenericMenu;