class UIComponent {
    constructor(store, term, config) {
        this.store = store;
        this.term = term;
        this.offset = {
            x: config.xOffset,
            y: config.yOffset
        };
        this.size = {
            width: config.width,
            height: config.height
        };
        this.name = config.name;
        
        const normalBorder = this.drawBorder();
        const focusBorder = this.drawBorder(this.term.magenta);

        this.normalBorder = normalBorder.bind(this);
        this.focusBorder = focusBorder.bind(this);
        this.draw = this.draw.bind(this);
        this.clear = this.clear.bind(this);
        this.clearBorder = this.clearBorder.bind(this);

        this.store.addEvent('changeFocus', componentName => {
            if (componentName === config.name) {
                this.focusBorder();
            } else {
                this.normalBorder();
            }
        })
    }

    drawBorder(color=this.term.green) {
        return () => {
            const {x, y} = this.offset;
            const {width, height} = this.size;
    
            color();
    
            for (let i = 0; i < height + 2; i++) {
                this.term.moveTo(x - 1, y - 1 + i);
                if (i === 0) {
                    this.term('\u250F');
    
                    for (let j = 0; j < width; j++) {
                        this.term('\u2501');    
                    }
                    this.term('\u2513');
                } else if (i === height + 1) {
                    this.term('\u2517');
    
                    for (let j = 0; j < width; j++) {
                        this.term('\u2501');    
                    }
                    this.term('\u251B');
                } else {
                    this.term('\u2503');
                    this.term.moveTo(x + width, y - 1 + i)('\u2503');
                }
            }
        };
    }

    clearBorder() {
        const {x, y} = this.offset;
        const {width, height} = this.size;

        this.term.green();

        for (let i = 0; i < height + 2; i++) {
            this.term.moveTo(x - 1, y - 1 + i);
            if (i === 0) {
                this.term(' ');

                for (let j = 0; j < width; j++) {
                    this.term(' ');    
                }
                this.term(' ');
            } else if (i === height + 1) {
                this.term(' ');

                for (let j = 0; j < width; j++) {
                    this.term(' ');    
                }
                this.term(' ');
            } else {
                this.term(' ');
                this.term.moveTo(x + width, y - 1 + i)(' ');
            }
        }
    }

    draw() {}
    clear() {}
}

module.exports = UIComponent;