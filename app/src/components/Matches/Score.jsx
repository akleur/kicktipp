import React, { Component, PropTypes } from 'react';

export default class Score extends Component {
    render() {
        const { score } = this.props;
        const theScore = score ? `${score.teamA} : ${score.teamB}` : '-';
        return (
            <div className="score">
                {theScore}
            </div>
        );
    }
}

Score.propTypes = {
    score: PropTypes.object
};
