const term = require('terminal-kit').terminal;
const Config = require('./configs/configs.js');
const Field = require('./field');
const Clock = require('./clock');
const Menu = require('./menu');
const Cursor = require('./cursor');
const Info = require('./info');
const Items = require('./items');

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

        this.field = new Field(this.store, term, Config.fieldConfig);
        this.clock = new Clock(this.store, term, Config.clockConfig);
        this.menu = new Menu(this.store, term, Config.menuConfig);
        this.cursor = new Cursor(this.store, term, Config.cursorConfig);
        this.info = new Info(this.store, term, Config.infoConfig);
        this.items = new Items(this.store, term, Config.itemsConfig);
    }
}

module.exports = Render;