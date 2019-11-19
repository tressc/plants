const term = require( 'terminal-kit' ).terminal;
let x = 2;
let y = 1;


function terminate() {
	term.grabInput( false ) ;
	setTimeout( function() { process.exit() } , 100 ) ;
}

term.clear()

for (let i = 1; i < 12; i += 2) {
    for (let j = 1; j < 7; j++) {
        if (j > 5) {
            if (i > 10) {
                term.moveTo.bgBrightMagenta(i, j, '   ')
            } else {
                term.moveTo.bgBrightMagenta(i, j, '  ')
            }
        } else {
            if (i > 10) {
                term.moveTo.bgBrightMagenta(i, j, ' a ')
            } else {
                term.moveTo.bgBrightMagenta(i, j, ' a')
            }
        }
    }
}

term('\n')
term.moveTo(2, 1)
term.grabInput();

term.on( 'key' , function( name , matches , data ) {
    if ( name === 'CTRL_C' ) { terminate() ; }
    if ( name === 'UP' ) { 
        term.up(1);
        if (y > 1) { y -= 1};
    };
    if ( name === 'DOWN' ) { 
        if (y < 5) {
            term.down(1);
            y += 1
        };
    };
    if ( name === 'LEFT' ) { 
        if (x > 2) {
            term.left(2);
            x -= 2;
        };
    };
    if ( name === 'RIGHT' ) { 
        if (x < 12) {
            term.right(2);
            x += 2
        };
    };
} ) ;