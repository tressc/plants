var term = require( 'terminal-kit' ).terminal ;
const Store = require('../store/store.js');
const Time = require('../objects/time.js');
const Weather = require('../objects/weather.js');

const store = new Store();
const time = new Time(store);
const weather = new Weather(store);


store.addEvent('newHour', drawClock)
// optimize to only draw the delta?
// for instance, the frame only needs to be drawn one time...

const frameX = 6;
const frameY = 6;
const menuItems = [
    "CHARACTER",
    "ITEMS",
    "MAP",
    "SAVE"
];

let menuSelect = 0;
let cursX = 1;
let cursY = 1;
let menuOpen = false;


function terminate() {
    term.clear();
	term.grabInput( false ) ;
	setTimeout( function() { process.exit() } , 100 ) ;
}

function moveCursor(dir) {
    term.moveTo(cursX, cursY).noFormat('   ');
    term.moveTo(cursX, cursY + 2).noFormat('   ');

    if (dir === 'UP' && cursY > 1) cursY -= 2;
    if (dir === 'DOWN' && cursY < frameY * 2 - 1) cursY += 2;
    if (dir === 'LEFT' && cursX > 1) cursX -= 3;
    if (dir === 'RIGHT' && cursX < frameX * 3 - 2) cursX += 3;

    term.moveTo(cursX, cursY).white('\u2824\u2824\u2824');
    term.moveTo(cursX, cursY + 2).white('\u2809\u2809\u2809');
}

function drawInitCursor() {
    term.moveTo(cursX, cursY).white('\u2824\u2824\u2824');
    term.moveTo(cursX, cursY + 2).white('\u2809\u2809\u2809');
}

function openMenu() {
    menuOpen = true;
    menuSelect = 0;
    time.pause();

    for (let i = 0; i < menuItems.length; i++) {
        term.moveTo(frameX * 3 + 2, i + 2)
        if (i === menuSelect) {
            term.bgWhite.black.bold(menuItems[i]);
        } else {
            term.white(menuItems[i]);
        }
    }
}

function moveMenuSelect(dir) {
    if (dir === 'UP' && menuSelect > 0) {
        term.moveTo(frameX * 3 + 2, menuSelect + 2).white(menuItems[menuSelect]);
        menuSelect -= 1;
        term.moveTo(frameX * 3 + 2, menuSelect + 2).bgWhite.black.bold(menuItems[menuSelect]);
    } else if (dir === "DOWN" && menuSelect < menuItems.length - 1) {
        term.moveTo(frameX * 3 + 2, menuSelect + 2).white(menuItems[menuSelect]);
        menuSelect += 1;
        term.moveTo(frameX * 3 + 2, menuSelect + 2).bgWhite.black.bold(menuItems[menuSelect]);
    }
}

function closeMenu() {
    menuOpen = false;

    for (let i = 0; i < menuItems.length; i++) {
        term.moveTo(frameX * 3 + 2, i + 2)
        for (let j = 0; j < menuItems[i].length; j++) {
            term.noFormat(' ');
        }
    }
}

function drawClock() {
    term.moveTo(frameX * 3 + 2, frameY * 2 - 2).white('\u250F');
    for (let i = 0; i < 15; i++) {
        term.white('\u2501');
    }
    term.white('\u2513')
    term.moveTo(frameX * 3 + 2, frameY * 2 - 1).white('\u2503');

    if (store.state.weather === 'rain') {
        term.cyan(' \u2601 ');
    } else {
        term.yellow(' \u2600 ');
    }
    term.white(`${time.timeName} ${time.dayName} \u2503`)

    term.moveTo(frameX * 3 + 2, frameY * 2 - 0).white('\u2517');
    for (let i = 0; i < 15; i++) {
        term.white('\u2501');
    }
    term.white('\u251B')
}


function drawFrame() {
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

function run() {
    term.clear();
    term.hideCursor();
    drawFrame();
    drawInitCursor();
    drawClock();
    time.start();

    term.grabInput();
    term.on( 'key' , function( name , matches , data ) {
        if (name === 'CTRL_C') { 
            terminate();
        }

        if (menuOpen) {
            if (['UP', 'DOWN'].includes(name)) {
                moveMenuSelect(name);
            } else if (name === 'ENTER') {
                time.start();
                closeMenu();
            }
        } else if (['UP', 'DOWN', 'LEFT', 'RIGHT'].includes(name)) {
            moveCursor(name)
        } else if (name === 'ENTER') {
            openMenu();
        }

    } ) ;
}

run();