const UIComponent = require('../abstracts/uiComponent.js');


class Items extends UIComponent {
    constructor(store, term, config) {
        super(store, term, config);

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

    }
}

module.exports = Items;
