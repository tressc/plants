const GenericMenu = require('./genericMenu.js');
const rightAlign = require('./utils/rightAlign');


class Items extends GenericMenu {
    constructor(store, term, config) {
        super(store, term, config, true);

        this.favorite = 3;
        this.hasCleared = true;
        
        this.store.addEvent('changeFocus', (name) => {
            if (name === this.name) {
                this.hasCleared = false;
                this.focusBorder();
                this.draw();
            } else {
                this.clearHighlight();
                this.menuSelect = 0;
                this.normalBorder();
            }
        })

        this.draw();
        this.clearHighlight();
        this.normalBorder();
    }

    updateFavorite(newFav) {
        this.favorite = newFav;
        this.draw();
    }

    clearHighlight() {
        const { x, y } = this.offset;
        const select = this.menuSelect;

        this.term.moveTo(x, y + select).white(rightAlign(this.menuItems[select], this.size.width));

        if (this.hasCleared === false) {
            this.term.moveTo(x, y + select).magenta('\u2605');
            this.hasCleared = true;
        }
    }

    collectInput() {
        this.term.on( 'key' , (name, matches, data) => {
            if (this.store.state.activeComponent === this.name) {
                if (['UP', 'DOWN'].includes(name)) {
                    this.moveSelect(name);
                } else if (name === 'ENTER') {
                    if (this.store.state.justChanged) {
                        return;
                    } else {
                        this.updateFavorite(this.menuSelect)
                        this.store.fire('changeFocus', 'field');
                        this.store.fire('timeStart');
                    }
                } else if (name === 'ESCAPE') {
                    this.store.fire('changeFocus', 'field');
                    this.store.fire('timeStart');
                }
            }
        });
    }

    draw() {
        const { x, y } = this.offset;
        const { menuItems, menuSelect, favorite } = this;
        const { width } = this.size;

        for (let i = 0; i < menuItems.length; i++) {
            this.term.moveTo(x, y + i);

            if (i === menuSelect) {
                this.term.bgWhite.black.bold(rightAlign(menuItems[i], width));
            } else {
                this.term.white(rightAlign(menuItems[i], width));
            }

            if (i === favorite) {
                if (i === menuSelect) {
                    this.term.moveTo(x, y + i).bgWhite.black('\u2605');
                } else {
                    this.term.moveTo(x, y + i).magenta('\u2605');
                }
            }
        }

    }
}

module.exports = Items;
