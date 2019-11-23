const Store = require('./store/store.js');
const Time = require('./objects/time.js');
const Weather = require('./objects/weather.js');
const Dirt = require('./objects/dirt.js');
const Render = require('./ui/render.js');


const config = {
    frameX: 6,
    frameY: 6,
    menuItems: [
        "CHARACTER",
        "ITEMS",
        "MAP",
        "SAVE"
    ]
};

const store = new Store();
const time = new Time(store);
const weather = new Weather(store);
const renderer = new Render(store, config);
const tiles = [];

for (let i = 0; i < 25; i++) {
    tiles.push(new Dirt(store));
}

store.fire('gameStart');