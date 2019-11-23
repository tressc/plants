var term = require( 'terminal-kit' ).terminal ;

class Render {
    constructor(store, config) {
        this.store = store;

        this.frameX = config.frameX;
        this.frameY = config.frameY;
        this.menuItems = config.menuItems;

        this.state = {
            menuSelect: 0,
            cursX: 1,
            cursY: 1,
            menuOpen: false
        }

        this.drawClock = this.drawClock.bind(this);
        this.run = this.run.bind(this);

        this.store.addEvent('gameStart', this.run);
        this.store.addEvent('newHour', this.drawClock)
    }

    terminate() {
        term.clear();
        term.grabInput( false ) ;
        setTimeout( () => { process.exit() } , 100 ) ;
    }
    
    moveCursor(dir) {
        const { cursX, cursY } = this.state;
        const { frameX, frameY } = this;

        term.moveTo(cursX, cursY).noFormat('   ');
        term.moveTo(cursX, cursY + 2).noFormat('   ');
    
        if (dir === 'UP' && cursY > 1) this.state.cursY -= 2;
        if (dir === 'DOWN' && cursY < frameY * 2 - 1) this.state.cursY += 2;
        if (dir === 'LEFT' && cursX > 1) this.state.cursX -= 3;
        if (dir === 'RIGHT' && cursX < frameX * 3 - 2) this.state.cursX += 3;
    
        term.moveTo(this.state.cursX, this.state.cursY).white('\u2824\u2824\u2824');
        term.moveTo(this.state.cursX, this.state.cursY + 2).white('\u2809\u2809\u2809');
    }
    
    drawInitCursor() {
        const { cursX, cursY } = this.state;        

        term.moveTo(cursX, cursY).white('\u2824\u2824\u2824');
        term.moveTo(cursX, cursY + 2).white('\u2809\u2809\u2809');
    }
    
    openMenu() {
        const { menuSelect } = this.state;
        const { menuItems, frameX } = this;

        this.state.menuOpen = true;
        this.state.menuSelect = 0;
        this.store.fire('timePause');
    
        for (let i = 0; i < menuItems.length; i++) {
            term.moveTo(frameX * 3 + 2, i + 2)
            if (i === menuSelect) {
                term.bgWhite.black.bold(menuItems[i]);
            } else {
                term.white(menuItems[i]);
            }
        }
    }
    
    closeMenu() {
        const { menuItems, frameX } = this;

        this.state.menuOpen = false;
    
        for (let i = 0; i < menuItems.length; i++) {
            term.moveTo(frameX * 3 + 2, i + 2)
            for (let j = 0; j < menuItems[i].length; j++) {
                term.noFormat(' ');
            }
        }
    }
    
    moveMenuSelect(dir) {
        const { menuSelect } = this.state;
        const { menuItems, frameX } = this;

        if (dir === 'UP' && menuSelect > 0) {
            term.moveTo(frameX * 3 + 2, menuSelect + 2).white(menuItems[menuSelect]);
            this.state.menuSelect -= 1;
            term.moveTo(frameX * 3 + 2, this.state.menuSelect + 2).bgWhite.black.bold(menuItems[this.state.menuSelect]);
        } else if (dir === "DOWN" && menuSelect < menuItems.length - 1) {
            term.moveTo(frameX * 3 + 2, menuSelect + 2).white(menuItems[menuSelect]);
            this.state.menuSelect += 1;
            term.moveTo(frameX * 3 + 2, this.state.menuSelect + 2).bgWhite.black.bold(menuItems[this.state.menuSelect]);
        }
    }
    
    drawClock() {
        const { frameX, frameY } = this;
        const { timeName, dayName } = this.store.state.time;
        const { weather } = this.store.state;

        term.moveTo(frameX * 3 + 2, frameY * 2 - 2).white('\u250F');
        for (let i = 0; i < 15; i++) {
            term.white('\u2501');
        }
        term.white('\u2513')
        term.moveTo(frameX * 3 + 2, frameY * 2 - 1).white('\u2503');
    
        if (weather === 'rain') {
            term.cyan(' \u2601 ');
        } else {
            term.yellow(' \u2600 ');
        }
        term.white(`${timeName} ${dayName} \u2503`)
    
        term.moveTo(frameX * 3 + 2, frameY * 2 - 0).white('\u2517');
        for (let i = 0; i < 15; i++) {
            term.white('\u2501');
        }
        term.white('\u251B')
    }
    
    
    drawFrame() {
        for (let i = 0; i < 6; i++) {
            term('\n');
    
            for (let j = 0; j < 6; j++) {
                if (Math.random() * 2 > 1) {
                    term.cyan('\u2818');
                } else {
                    term.noFormat(' ');
                }
    
                let type = Math.random() * 3;
                if (type > 2) {
                    term.color256(22)('\u03A8');
                    if (Math.random() * 2 > 1) {
                        term.color256(11)('\u2804');
                    } else {
                        term.noFormat(' ');
                    }
                } else if (type > 1) {
                    term.color256(22)('\u03D2 ');
                } else {
                    term.color256(22)('\u03B9 ');
                }
    
            }
            term('\n')
        }
    }
    
    run() {
        term.clear();
        term.hideCursor();
        this.drawFrame();
        this.drawInitCursor();
        this.drawClock();
        this.store.fire('timeStart');

        term.grabInput();

        term.on( 'key' , (name, matches, data) => {
            if (name === 'CTRL_C') { 
                this.terminate();
            }
    
            if (this.state.menuOpen) {
                if (['UP', 'DOWN'].includes(name)) {
                    this.moveMenuSelect(name);
                } else if (name === 'ENTER') {
                    this.store.fire('timeStart');
                    this.closeMenu();
                }
            } else if (['UP', 'DOWN', 'LEFT', 'RIGHT'].includes(name)) {
                this.moveCursor(name)
            } else if (name === 'ENTER') {
                this.openMenu();
            }
        } );
    }
}

module.exports = Render;