const GenericMenu = require('./genericMenu.js');
const rightAlign = require('./utils/rightAlign');


class Items extends GenericMenu {
    constructor(store, term, config) {
        super(store, term, config);

        this.favorite = 1;

        this.updateFavorite(this.favorite);
        this.clearHighlight();
    }

    updateFavorite(newFav) {
        this.favorite = newFav;
        this.store.setState({currentItem: this.menuItems[newFav]});
        this.draw();
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


        if (this.menuSelect === this.favorite) {
            this.term.moveTo(x, y + menuSelect - top).magenta('\u2605');
        }
    }

    collectInput() {
        this.term.on( 'key' , (name, matches, data) => {
            if (this.store.state.activeComponent === this.name) {
                if (['UP', 'DOWN'].includes(name)) {
                    // TODO: add item info to info box
                    this.moveSelect(name);
                } else if (name === 'ENTER') {
                    if (this.store.state.justChanged) {
                        return;
                    } else {
                        this.updateFavorite(this.menuSelect);
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
        const { menuItems, menuSelect, favorite, top } = this;
        const { width, height } = this.size;

        for (let i = 0; i < height; i++) {
            this.term.moveTo(x, y + i);

            if (i + top === menuSelect) {
                this.term.bgWhite.black.bold(rightAlign(menuItems[i + top], width));
            } else {
                this.term.white(rightAlign(menuItems[i + top], width));
            }

            if (i + top === favorite) {
                if (i + top === menuSelect) {
                    this.term.moveTo(x, y + i).bgWhite.black('\u2605');
                } else {
                    this.term.moveTo(x, y + i).magenta('\u2605');
                }
            }
        }

    }
}

module.exports = Items;
