const Store = require('./store/store.js');
const Time = require('./objects/time.js');
const Weather = require('./objects/weather.js');
const Render = require('./ui/render.js');

const store = new Store();
const time = new Time(store);
const weather = new Weather(store);
const renderer = new Render(store);

store.fire('gameStart');