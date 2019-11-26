class UIComponent {
    constructor(store, term, config) {
        this.store = store;
        this.term = term;
        this.offset = {
            x: config.xOffset,
            y: config.yOffset
        }

        this.draw = this.draw.bind(this);
        this.clear = this.clear.bind(this);
    }

    draw() {

    }
}

module.exports = UIComponent;