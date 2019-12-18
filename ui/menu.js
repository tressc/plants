const GenericMenu = require('./genericMenu.js');


class Menu extends GenericMenu {
    constructor(store, term, config) {
        super(store, term, config);
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
            this.term.moveTo(x, y + this.menuSelect - this.top).bgWhite.black(frames[idx]);
            idx = (idx + 1) % frames.length;
        }, 80);
        
        setTimeout(() => {
            this.saving = false;
            clearInterval(interval);
            this.term.moveTo(x, y + this.menuSelect - this.top).bgWhite(' ');
            this.store.fire('changeFocus', 'field');
            this.store.fire('timeStart');
        }, 2000);
    }

    collectInput() {
        const { menuSelect, menuItems } = this;

        this.term.on( 'key' , (name, matches, data) => {
            if (this.saving) return;

            if (this.store.state.activeComponent === this.name) {
                if (['UP', 'DOWN'].includes(name)) {
                    this.moveSelect(name);
                } else if (name === 'ENTER' || name === 'ESCAPE') {
                    if (this.store.state.justChanged) {
                        return;
                    } else if (this.menuItems[this.menuSelect] === 'save') {
                        this.loadMask();
                        return;
                    } else if (this.menuItems[this.menuSelect] === 'items') {
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
}

module.exports = Menu;