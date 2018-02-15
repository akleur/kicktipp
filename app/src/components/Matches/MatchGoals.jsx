import React, { Component, PropTypes } from 'react';
import MatchTipsReadOnly from './MatchTipsReadOnly.jsx';

export default class MatchGoals extends Component {
    render() {
        const { scoreA, scoreB } = this.props;
        const goalsA = (scoreA === '-1') ? '-' : scoreA;
        const goalsB = (scoreB === '-1') ? '-' : scoreB;

        return (
            <div className="no-padding">
                <div className="small-5 column">
                    <MatchTipsReadOnly tipField={goalsA}/>
                </div>
                <div className="small-2 column goal">:</div>
                <div className="small-5 column">
                    <MatchTipsReadOnly tipField={goalsB}/>
                </div>
            </div>
        );
    }
}

MatchGoals.propTypes = {
    scoreA: PropTypes.string.isRequired,
    scoreB: PropTypes.string.isRequired
};
