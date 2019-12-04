const Store = require('./store/store.js');
const initialState = require('./store/initial_state.js');
const Time = require('./objects/time.js');
const Weather = require('./objects/weather.js');
const Field = require('./objects/field.js');
const Render = require('./ui/render.js');

const store = new Store(initialState);
const time = new Time(store);
const field = new Field(store);
const weather = new Weather(store);
const renderer = new Render(store);

store.fire('gameStart');