const UIComponent = require('../abstracts/uiComponent.js');


class Cursor extends UIComponent {
    constructor(store, term, config) {
        super(store, term, config);

        this.state = {
            cursorX: 0,
            cursorY: 0
        }

        this.store.addEvent('moveCursor', newPositions => {
            this.store.setState(newPositions);
        })

        this.moveCursor = this.moveCursor.bind(this);
        this.normalBorder = () => null; // don't ever draw the border;

        this.draw();
        this.collectInput();
    }


    collectInput() {
        this.term.on( 'key' , (name, matches, data) => {
            if (this.store.state.activeComponent === 'field') {
                if (['UP', 'DOWN', 'LEFT', 'RIGHT'].includes(name)) {
                    this.moveCursor(name);
                }
            }
        });
    }

    moveCursor(dir) {
        this.clear();

        let { cursorX, cursorY } = this.store.state;

        if (dir === 'UP' && cursorY > 0) {
            cursorY -= 1;
        } else if (dir === 'DOWN' && cursorY < 5) { // this should not be hardcoded
            cursorY += 1;
        } else if (dir === 'LEFT' && cursorX > 0) {
            cursorX -= 1;
        } else if (dir === 'RIGHT' && cursorX < 5) { // this should not be hardcoded
            cursorX += 1;
        }

        this.store.fire('moveCursor', {cursorX, cursorY});
        this.draw();
    }

    clear() {
        const {x, y} = this.offset;
        const {cursorX, cursorY} = this.store.state;

        this.term.moveTo(x + cursorX * 3, y + cursorY * 2)('   ');
        this.term.moveTo(x + cursorX * 3, y + cursorY * 2 + 2)('   ');
    }

    draw() {
        const {x, y} = this.offset;
        const {cursorX, cursorY} = this.store.state;

        this.term.white()
        this.term.moveTo(x + cursorX * 3, y + cursorY * 2)('\u2824\u2824\u2824');
        this.term.moveTo(x + cursorX * 3, y + cursorY * 2 + 2)('\u2809\u2809\u2809');
    }
}

module.exports = Cursor;
