const term = require('terminal-kit').terminal;
const Field = require('./field');
const Clock = require('./clock');
const Menu = require('./menu');

const Store = require('../store/store.js');

class Render {
    constructor(store, config) {
        this.store = store;

        this.init();
    }

    init() {
        term.clear();
        term.hideCursor();
        term.grabInput();
        
        term.on( 'key' , (name, matches, data) => {
            if (name === 'CTRL_C') { 
                this.terminate();
            }
        });

        // definitely load these from somewhere;
        const fieldConfig = {
            name: "field",
            xOffset: 2,
            yOffset: 2,
            height: 11,
            width: 18
        };
        const menuConfig = {
            name: "menu",
            xOffset: 22,
            yOffset: 2,
            height: 4,
            width: 9,
            menuItems: [
                'CHARACTER',
                'ITEMS',
                'MAP',
                'SAVE'
            ]
        };
        const clockConfig = {
            name: "clock",
            xOffset: 22,
            yOffset: 12,
            height: 1,
            width: 15
        };

        this.field = new Field(this.store, term, fieldConfig);
        this.clock = new Clock(this.store, term, clockConfig);
        this.menu = new Menu(this.store, term, menuConfig);
    }
}

module.exports = Render;