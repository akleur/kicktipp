import React, { Component, PropTypes } from 'react';

export default class DateView extends Component {
    constructor(props) {
        super(props);

        const date = new Date(this.props.date);

        const dayValues = new Array(7);
        dayValues[0] = 'So';
        dayValues[1] = 'Mo';
        dayValues[2] = 'Di';
        dayValues[3] = 'Mi';
        dayValues[4] = 'Do';
        dayValues[5] = 'Fr';
        dayValues[6] = 'Sa';

        const day = date.getDate();
        const weekDay = dayValues[date.getDay()];
        const month = date.getMonth() + 1;
        const hours = date.getHours();
        const minutes = date.getMinutes();

        function addZero(j) {
            let i = j;
            if (i < 10) {
                i = `0${i}`;
            }
            return i;
        }

        this.dateFormated = `${weekDay} ${addZero(day)}. ${addZero(month)}.`;
        this.timeFormated = `${hours}:${addZero(minutes)}`;

        this.fulltime = `${this.dateFormated} ${this.timeFormated}`;
    }

    render() {
        return (
            <span className="date-view">
                <span className="match-date">{this.dateFormated}</span>
                <span className="match-time"> {this.timeFormated}</span>
            </span>
        );
    }
}

DateView.propTypes = {
    date: PropTypes.string.isRequired
};
