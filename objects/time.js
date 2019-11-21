class Time {
    constructor(store) {
        this.store = store;
        this.weekDays = [
            'SUN',
            'MON',
            'TUE',
            'WED',
            'TRS',
            'FRI',
            'SAT'
        ]
        this.day = 0;
        this.dayName = 'SUN';
        this.time = 6;
        this.meridian = "AM"
        this.timeName = '06:00AM';

        this.newDay = this.newDay.bind(this);
        this.newHour = this.newHour.bind(this);

        this.interval = null;
    }

    newDay() {
        this.day += 1;
        this.dayName = this.weekDays[this.day % 7];

        this.store.fire('newDay');
    }

    newHour() {
        let newTime = (this.time + 1) % 12;
        this.time = newTime < 1 ? 12 : newTime;
        if (this.time === 12) {
            this.meridian = this.meridian === 'AM' ? 'PM' : 'AM';
        }
        let leadingZero = this.time < 10 ? '0' : '';
        this.timeName = leadingZero + this.time + ':00' + this.meridian;

        this.store.fire('newHour');
        if (this.time === 12 && this.meridian === 'AM') {
            this.newDay();
        }
    }

    start() {
        this.interval = setInterval(this.newHour, 100);
    }

    pause() {
        clearInterval(this.interval);
    }
}

module.exports = Time;