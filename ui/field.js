const UIComponent = require('../abstracts/uiComponent.js');


class Field extends UIComponent {
    constructor(store, term, config) {
        super(store, term, config);

        this.store.addEvent('newDay', this.draw);

        this.draw();
        this.focusBorder();
        this.collectInput();
    }

    collectInput() {
        this.term.on( 'key' , (name, matches, data) => {
            if (this.store.state.activeComponent === this.name) {
                if (name === 'ENTER') {
                    if (this.store.state.justChanged) {
                        return;
                    }
                    this.store.fire('changeFocus', 'menu');
                    this.store.fire('timePause');
                }
            }
        });
    }

    draw() {
        const { x, y } = this.offset;
        const { field } = this.store.state;

        for (let i = 0; i < field.length; i++) {
            const row = field[i];
            this.term.moveTo(x + 2, y + 1 + i * 2);

            for (let j = 0; j < row.length; j++) {
                const tile = row[j];
                const plant = tile.plant;

                if (tile.status === 'wet') {
                    this.term.cyan('\u2818');
                } else {
                    this.term(' ');
                }

                if (plant) {
                    this.term.color256(plant.color)(plant.sprite + ' ');
                } else {
                    this.term('  ');
                }
            }
        }
    }
    // draw() {
    //     const {x, y} = this.offset;
    //     const idxs = [];
    //     const fruits = [];

    //     for (let i = 0; i < 6; i++) {
    //         // this.term.moveTo(x + 2, y + 1 + i * 2);
            
    //         for (let j = 0; j < 6; j++) {
    //             if (Math.random() * 2 > 1) {
    //                 // this.term.white('\u2818');
    //                 idxs.push(i * 6 + j);
    //             } else {
    //                 // this.term(' ');
    //             }
    
    //             let type = Math.random() * 3;
    //             if (type > 2) {
    //                 // this.term.color256(22)('\u03A8');
    //                 if (Math.random() * 2 > 1) {
    //                     // this.term.magenta('\u2804');
    //                     fruits.push(i * 6 + j);
    //                 } else {
    //                     // this.term.noFormat(' ');
    //                 }
    //             } else if (type > 1) {
    //                 // this.term.color256(22)('\u03D2 ');
    //             } else {
    //                 // this.term.color256(22)('\u01C2 ');
    //             }
    //         }
    //     }

    //     this.store.setState({ idxs, fruits });
    // }
}

module.exports = Field;