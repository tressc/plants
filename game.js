const Store = require('./store/store.js');
const Time = require('./objects/time.js');
const Weather = require('./objects/weather.js');
const Dirt = require('./objects/dirt.js');

const store = new Store();
const time = new Time(store);
const weather = new Weather(store);
const tiles = [];

for (let i = 0; i < 25; i++) {
    tiles.push(new Dirt(store));
}

function printTiles() {
    for (let i = 0; i < 5; i++) {
        console.log(
            tiles.slice(i * 5, i * 5 + 5)
            .map(tile => tile.status === "wet" ? "~" : "*")
            .join(' ')
        )
    }
    console.log();
}

time.newDay();
printTiles();
time.newDay();
printTiles();
time.newDay();
printTiles();
time.newDay();
printTiles();
time.newDay();
printTiles();
time.newDay();
printTiles();
time.newDay();
printTiles();