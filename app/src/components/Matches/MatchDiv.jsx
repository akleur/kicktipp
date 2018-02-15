import React, { Component, PropTypes } from 'react';
import DateView from '../utils/DateView.jsx';
import TeamViewInline from '../Teams/TeamViewInline.jsx';

export default class MatchDiv extends Component {
    render() {
        const { match, tip, joker } = this.props;
        const tipA = (tip.tipTeamA) ? tip.tipTeamA : '-';
        const tipB = (tip.tipTeamB) ? tip.tipTeamB : '-';

        return (
            <div className="row">
                <div className="small-2 column" data-sort-value={match.date}>
                    <DateView date={match.date}/>
                </div>
                <div className="small-3 column">
                    <TeamViewInline name={match.teamA.name} countryCode={match.teamA.countryCode}/>
                </div>
                <div className="small-3 column">
                    <TeamViewInline name={match.teamB.name} countryCode={match.teamB.countryCode}/>
                </div>
                <div className="small-2 column score-column">
                    {tipA}:{tipB}
                </div>
                <div className="small-2 medium-2 column no-padding">
                    {joker === true &&
                    <div className="show-joker-small"><img src='/imgs/joker.svg'/></div>
                    }
                </div>
            </div>
        );
    }
}

MatchDiv.propTypes = {
    match: PropTypes.object.isRequired,
    showTipsButton: PropTypes.string,
    tip: PropTypes.object,
    joker: PropTypes.bool.isRequired
};
