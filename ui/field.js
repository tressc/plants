const UIComponent = require('../abstracts/uiComponent.js');


class Field extends UIComponent {
    constructor(store, term, config) {
        super(store, term, config);

        this.draw();
        this.focusBorder();
        this.collectInput();
    }

    collectInput() {
        this.term.on( 'key' , (name, matches, data) => {
            if (this.store.state.activeComponent === this.name) {
                if (name === 'ENTER') {
                    if (this.store.state.justChanged) {
                        this.store.setState({justChanged: false});
                        return;
                    }
                    this.store.fire('changeFocus', 'menu');
                }
            }
        });
    }

    draw() {
        const {x, y} = this.offset;

        for (let i = 0; i < 6; i++) {
            this.term.moveTo(x, y + i * 2);
            
            for (let j = 0; j < 6; j++) {
                if (Math.random() * 2 > 1) {
                    this.term.cyan('\u2818');
                } else {
                    this.term(' ');
                }
    
                let type = Math.random() * 3;
                if (type > 2) {
                    this.term.color256(22)('\u03A8');
                    if (Math.random() * 2 > 1) {
                        this.term.color256(11)('\u2804');
                    } else {
                        this.term.noFormat(' ');
                    }
                } else if (type > 1) {
                    this.term.color256(22)('\u03D2 ');
                } else {
                    this.term.color256(22)('\u01C2 ');
                }
            }
        }
    }
}

module.exports = Field;