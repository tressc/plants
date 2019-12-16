class Time {
    constructor(store) {
        this.store = store;
        this.weekDays = [
            'sun',
            'mon',
            'tue',
            'wed',
            'trs',
            'fri',
            'sat'
        ]
        this.day = 0;
        this.dayName = 'sun';
        this.time = 6;
        this.meridian = 'am'
        this.timeName = '06:00am';

        this.newDay = this.newDay.bind(this);
        this.newHour = this.newHour.bind(this);

        this.interval = null;

        this.newDay = this.newDay.bind(this);
        this.newHour = this.newHour.bind(this);
        this.start = this.start.bind(this);
        this.pause = this.pause.bind(this);

        this.store.addEvent('timePause', this.pause);
        this.store.addEvent('timeStart', this.start);
        this.store.addEvent('gameStart', this.start);
    }

    newDay() {
        this.day += 1;
        this.dayName = this.weekDays[this.day % 7];


        this.store.setState({
            time: {
                dayName: this.dayName
            }
        });
        this.store.fire('newDay');
    }

    newHour() {
        let newTime = (this.time + 1) % 12;
        this.time = newTime < 1 ? 12 : newTime;
        if (this.time === 12) {
            this.meridian = this.meridian === 'am' ? 'pm' : 'am';
        }
        let leadingZero = this.time < 10 ? '0' : '';
        this.timeName = leadingZero + this.time + ':00' + this.meridian;

        this.store.setState({
            time: {
                ...this.store.state.time,
                timeName: this.timeName,
                meridian: this.meridian
            }
        });
        this.store.fire('newHour');
        if (this.time === 12 && this.meridian === 'am') {
            // any reason why this should happen after/before 'newHour'?
            this.newDay();
        }
    }

    start() {
        this.interval = setInterval(this.newHour, 100);
    }

    pause() {
        // if the interval is big enough, pausing could easy break
        // the in-game clock...
        clearInterval(this.interval);
    }
}

module.exports = Time;